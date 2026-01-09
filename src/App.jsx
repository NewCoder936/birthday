import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Stars, Gift } from "lucide-react";
import "./App.css";

function App() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  };

  const handleSurprise = () => {
    setIsRevealed(true);
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#FF1B6B", "#45CAFF", "#FFB7FF", "#FFD89B"],
    });
  };

  return (
    <div className="container" onMouseMove={handleMouseMove}>
      {/* Siri-like Background Gradient Animation */}
      <div className="gradient-bg">
        <div className="g1"></div>
        <div className="g2"></div>
        <div className="g3"></div>
        <div className="g4"></div>
        <div className="g5"></div>
        <motion.div
          className="interactive"
          animate={{ x: mousePos.x, y: mousePos.y }}
          transition={{
            type: "spring",
            damping: 30,
            stiffness: 200,
            restDelta: 0.001,
          }}
        ></motion.div>
      </div>

      <main className="content">
        <AnimatePresence mode="wait">
          {!isRevealed ? (
            <motion.div
              key="start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              className="glass-card"
            >
              <Gift size={64} className="icon-glow" />
              <h1 className="title">A Special Surprise...</h1>
              <p className="subtitle">Waiting for someone special</p>
              <button className="surprise-btn" onClick={handleSurprise}>
                Open Surprise
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="birthday"
              initial={{ opacity: 0, scale: 0.5, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ type: "spring", damping: 15, stiffness: 100 }}
              className="glass-card revealed"
            >
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
                className="heart-container"
              >
                <Heart
                  fill="#FF1B6B"
                  color="#FF1B6B"
                  size={48}
                  className="beating-heart"
                />
              </motion.div>

              <h1 className="birthday-text">Happy Birthday!</h1>
              <p className="message-text">
                Wishing you a day as beautiful and radiant as you are. May your
                year be filled with magic and joy!
              </p>
              <p className="message-text">By Raymond</p>

              <div className="stars-container">
                <Stars color="#45CAFF" size={24} className="floating-star s1" />
                <Stars color="#FFB7FF" size={24} className="floating-star s2" />
                <Stars color="#FFD89B" size={24} className="floating-star s3" />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="signature">
        <p>From Raymond</p>
      </footer>
    </div>
  );
}

export default App;
