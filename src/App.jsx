import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import ParticlesBackground from "./components/ParticlesBackground.jsx";
import CustomCursor from "./components/CustomCursor.jsx";
import IntroAnimation from "./components/IntroAnimation.jsx";
import Navbar from "./components/Navbar.jsx";
import Hero from "./components/Hero.jsx";
import Skills from "./components/Skills.jsx";
import Projects from "./components/Projects.jsx";
import Experience from "./components/Experience.jsx";
import HireMe from "./components/HireMe.jsx";
import HireModal from "./components/HireModal.jsx";
import Contact from "./components/Contact.jsx";
import Footer from "./components/Footer.jsx";
import Education from "./components/Education.jsx";

import Coding from "./components/Coding.jsx";

export default function App() {
  const [introDone, setIntroDone] = useState(false);
  const [hireOpen, setHireOpen] = useState(false);
  const openHire = () => setHireOpen(true);

  return (
    <>
      <AnimatePresence>
        {!introDone && <IntroAnimation onDone={() => setIntroDone(true)} />}
      </AnimatePresence>
      <CustomCursor />
      <ParticlesBackground />
      <Navbar onHire={openHire} />
      <HireModal open={hireOpen} onClose={() => setHireOpen(false)} />
      <main>
        <Hero />
        <Skills />
        <Projects />
        <Coding/>
        
        <Education/>
        <Experience />
        <Contact />
      </main>
      <Footer />
    </>
  );
}