import HeroSection from "./HeroSection";
import TestimonialSection from "./TestimonialSection";

const MediaHomePage = () => {
  return (
    <div className="relative w-full h-full bg-background-ice mt-10">
      <div className="max-w-7xl mx-auto p-6">
        <h1 className="text-3xl font-bold text-center my-4">Media Home Page</h1>

        {/* Hero Section Component */}
        <HeroSection />

        {/* Testimonial Section Component */}
        <TestimonialSection />
      </div>
    </div>
  );
};

export default MediaHomePage;
