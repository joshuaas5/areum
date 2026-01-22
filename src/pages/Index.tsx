import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowToUse from "@/components/HowToUse";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LuckyWheel from "@/components/LuckyWheel";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Benefits />
      <HowToUse />
      <Testimonials />
      <CTA />
      <Footer />
      <LuckyWheel />
    </main>
  );
};

export default Index;
