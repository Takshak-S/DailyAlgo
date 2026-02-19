import Hero from "../../components/Hero/Hero";
import HowItWorks from "../../components/HowItWorks/HowItWorks";
import WhyPlanner from "../../components/WhyPlanner/WhyPlanner";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-page">
      <Hero />
      <WhyPlanner />
      <HowItWorks />
    </div>
  );
}
