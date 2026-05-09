import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroSection from "@/components/home/HeroSection";
import TrustedSection from "@/components/home/TrustedSection";
import StatsSection from "@/components/home/StatsSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import CoursesSection from "@/components/home/CoursesSection";
import MentorSection from "@/components/home/MentorSection";
import EventSection from "@/components/home/EventSection";
import TestimonialSection from "@/components/home/TestimonialSection";
import FAQSection from "@/components/home/FAQSection";
import CTASection from "@/components/home/CTASection";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <TrustedSection />
        <StatsSection />
        <CategoriesSection />
        <CoursesSection />
        <MentorSection />
        <EventSection />
        <TestimonialSection />
        <FAQSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
