import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { scroller } from "react-scroll"; // React Scroll for smooth scrolling

import Hero from "../components/Hero";
import EdgeSection from "../components/EdgeSection";
import Features from "../components/Features";
import Pricing from "../components/Pricing";
import Footer from "../components/Footer";
import EOI from "../components/EOI"; 
import "../css/EOI.css"; 

function LandingPage() {
  const [showEOI, setShowEOI] = useState(false); // State to control the EOI popup visibility
  const location = useLocation();

  // Handle URL parameters for scrolling to sections
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get("section");

    if (section) {
      // Smooth scroll to the specified section
      scroller.scrollTo(section, {
        duration: 800,
        smooth: "easeInOutQuart",
      });
    }
  }, [location]);

  // Show the EOI popup after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowEOI(true);
    }, 5000);

    // Cleanup the timer when the component unmounts
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <div className={`landing-container ${showEOI ? "blur-background" : ""}`}>
        <Hero />
        <EdgeSection />
        <Features id="features" />
        <Pricing id="pricing" />
        <Footer />
      </div>
      {showEOI && <EOI setShowPopup={setShowEOI} />} {/* Render EOI popup separately */}
    </>
  );
}

export default LandingPage;
