import AnimatedBackground from "../components/AnimatedBackground";

import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Features from "../components/Features";
import Categories from "../components/Categories";
import Testimonials from "../components/Testimonials";
import Footer from "../components/Footer";

function Home() {
  return (
    <>
      <AnimatedBackground />

      <Navbar />

      <Hero />

      <Features />

      <Categories />

      <Testimonials />

      <Footer />
    </>
  );
}

export default Home;