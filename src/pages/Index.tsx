import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowToUse from "@/components/HowToUse";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LeadGuide from "@/components/LeadGuide";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <Hero />
      <Benefits />
      <HowToUse />
      <Testimonials />
      <CTA />
      <Footer />
      <LeadGuide />
    </main>
  );
};

export default Index;
