import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowToUse from "@/components/HowToUse";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LeadGuide from "@/components/LeadGuide";
import MobileStickyCTA from "@/components/MobileStickyCTA";

const Index = () => {
  return (
    <main className="overflow-hidden pb-16 md:pb-0">
      <Hero />
      <Benefits />
      <HowToUse />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <LeadGuide />
      <MobileStickyCTA />
    </main>
  );
};

export default Index;
