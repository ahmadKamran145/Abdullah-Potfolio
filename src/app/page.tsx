import Navbar from '@/components/navbar';
import Hero from '@/components/hero';
import { Model } from '@/components/model';
import { Services } from '@/components/services-section';
import { ShowcaseSlider } from '@/components/showcase-slider';
import { FAQSection } from '@/components/faqs-section';
import { ContactSection } from '@/components/contact-section';

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <Model />
      <Services />
      <ShowcaseSlider />
      <FAQSection />
      <ContactSection />
    </main>
  );
}

