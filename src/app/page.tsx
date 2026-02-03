import styles from "./page.module.scss";
import { HeroSection } from "@/components/sections/HeroSection/HeroSection";
import { BenefitsSection } from "@/components/sections/BenefitsSection/BenefitsSection";
import { WhySection } from "@/components/sections/WhySection/WhySection";
import { SignUpSection } from "@/components/sections/SignUpSection/SignUpSection";

export default function Home() {
  return (
    <main className={styles.main}>
      <HeroSection />
      <BenefitsSection />
      <WhySection />
      <SignUpSection />
    </main>
  );
}
