'use server';

import { supabase } from "@/tools/SupaBase/supabase";
import { resend } from "@/tools/Resend/resend";

const RATE_LIMIT_COUNT = 20;
const RATE_LIMIT_WINDOW_MS = 60 * 1000; // 1 minute

export async function signupUser(email: string) {
    try {
        // 1. Validate Email (Server-side)
        if (!email || !/\S+@\S+\.\S+/.test(email)) {
            return { success: false, message: 'Invalid email address.' };
        }

        // 2. Rate Limiting (Global or Per-User? Assuming Global for API protection + simple spam prevention)
        const oneMinuteAgo = new Date(Date.now() - RATE_LIMIT_WINDOW_MS).toISOString();

        const { count, error: countError } = await supabase
            .from('email_logs')
            .select('*', { count: 'exact', head: true })
            .gte('sent_at', oneMinuteAgo);

        if (countError) {
            console.error('Rate limit check error:', countError);
            return { success: false, message: 'System busy, please try again later.' };
        }

        if (count !== null && count >= RATE_LIMIT_COUNT) {
            return { success: false, message: 'Too many requests. Please try again in a minute.' };
        }

        // 3. User Logic
        let userId: string;
        let couponCode: string;

        // Check if user exists
        const { data: existingUser, error: userError } = await supabase
            .from('users')
            .select('id')
            .eq('email', email)
            .single();

        if (existingUser) {
            userId = existingUser.id;
            // Get existing coupon
            const { data: existingCoupon, error: couponError } = await supabase
                .from('coupons')
                .select('code')
                .eq('user_id', userId)
                .single();

            if (couponError || !existingCoupon) {
                // Self-healing: Create coupon if missing
                couponCode = `WELCOME-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
                await supabase.from('coupons').insert([{ user_id: userId, code: couponCode }]);
            } else {
                couponCode = existingCoupon.code;
            }

        } else {
            // Create User
            const { data: newUser, error: createUserError } = await supabase
                .from('users')
                .insert([{ email }])
                .select('id')
                .single();

            if (createUserError || !newUser) {
                console.error('Create user error:', createUserError);
                // If error is unique constraint violation (should be caught by existingUser check, but race conditions exist), try to fetch again?
                // For now, return error.
                return { success: false, message: 'Failed to create user.' };
            }
            userId = newUser.id;

            // Create Coupon
            couponCode = `WELCOME-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
            const { error: createCouponError } = await supabase
                .from('coupons')
                .insert([{ user_id: userId, code: couponCode }]);

            if (createCouponError) {
                console.error('Create coupon error:', createCouponError);
            }
        }

        // 4. Send Email
        const { error: emailError } = await resend.emails.send({
            from: 'TaskMan <onboarding@resend.dev>',
            to: 'mansooriaftab8514@gmail.com', // Hardcoded as requested
            subject: 'Welcome to TaskMan!',
            html: `<p>Welcome! Your coupon code is <strong>${couponCode}</strong></p>`
        });

        if (emailError) {
            console.error('Resend error:', emailError);
            return { success: false, message: 'Failed to send email.' };
        }

        // 5. Log Email for Rate Limiting
        await supabase.from('email_logs').insert([{ email }]);

        return { success: true, message: 'Check your email for the coupon!' };

    } catch (e) {
        console.error('Signup action error:', e);
        return { success: false, message: 'An unexpected error occurred.' };
    }
}
