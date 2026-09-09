import { AIAssistant } from "@/components/ai/AIAssistantModal";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Experience } from "@/components/sections/Experience";
import { Hero } from "@/components/sections/Hero";
import { Literature } from "@/components/sections/Literature";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { FloatingScrollToTop } from "@/components/ui/FloatingScrollToTop";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";
import { WHATSAPP_PHONE } from "@/lib/consts";

// Revalidate hourly (ISR) so CMS updates go live without a redeploy.
export const revalidate = 3600;

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Literature />
        <Contact />
      </main>
      <Footer />
      <FloatingScrollToTop />
      <FloatingWhatsApp
        phone={WHATSAPP_PHONE}
        message="Hi Joshtri! I'd like to get in touch."
      />
      <AIAssistant />
    </>
  );
}
