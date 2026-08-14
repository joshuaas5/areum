import Hero from "@/components/Hero";
import Benefits from "@/components/Benefits";
import HowToUse from "@/components/HowToUse";
import Testimonials from "@/components/Testimonials";
import UGCVideoSection from "@/components/UGCVideoSection";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import LeadGuide from "@/components/LeadGuide";
import MobileStickyCTA from "@/components/MobileStickyCTA";
import WhatsAppButton from "@/components/WhatsAppButton";
import AnnouncementBar from "@/components/AnnouncementBar";

const Index = () => {
  return (
    <main className="overflow-hidden pb-16 md:pb-0">
      <AnnouncementBar />
      <Hero />
      <Benefits />
      <HowToUse />
      <UGCVideoSection />
      <Testimonials />
      <FAQ />
      <CTA />
      <Footer />
      <LeadGuide />
      <MobileStickyCTA />
      <WhatsAppButton />
    </main>
  );
};

export default Index;
