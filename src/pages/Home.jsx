import Features from "../components/Features/Features";
import Hero from "../components/Hero/Hero";
import HowItWorks from "../components/HowItWorks/HowItWorks";
import WhyPlanner from "../components/WhyPlanner/WhyPlanner";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <WhyPlanner />
      <HowItWorks />
      <Features/>
    </div>
  );
}
