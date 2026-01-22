import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowToUse from "@/components/HowToUse";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Benefits />
      <HowToUse />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
};

export default Index;
