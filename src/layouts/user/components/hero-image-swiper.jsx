import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function HeroImageSwiper() {
  const images = [
    "https://images.unsplash.com/photo-1494790108377-be9c29b29330",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb",
    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d",
    "https://images.unsplash.com/photo-1554151228-14d9def656e4",
    "https://images.unsplash.com/photo-1517841905240-472988babdf9"
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right
  const [isAnimating, setIsAnimating] = useState(false);

  const getPrevIndex = (index) => (index === 0 ? images.length - 1 : index - 1);
  const getNextIndex = (index) => (index === images.length - 1 ? 0 : index + 1);

  // Auto-swipe timer
  useEffect(() => {
    if (isAnimating) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [currentIndex, isAnimating]);

  // Handle swipe gestures
  const handleDragEnd = (e, { offset, velocity }) => {
    const swipeThreshold = 30; // Mengurangi threshold dari 50 → 30
    if (isAnimating) return;
    
    if (offset.x < -swipeThreshold || velocity.x < -0.2) {
      handleNext();
    } else if (offset.x > swipeThreshold || velocity.x > 0.2) {
      handlePrev();
    }
  };

  const handlePrev = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(-1);
    setCurrentIndex((prev) => getPrevIndex(prev));
    setTimeout(() => setIsAnimating(false), 400);
  };

  const handleNext = () => {
    if (isAnimating) return;
    setIsAnimating(true);
    setDirection(1);
    setCurrentIndex((prev) => getNextIndex(prev));
    setTimeout(() => setIsAnimating(false), 400);
  };

  // Animation variants
  const slideVariants = {
    centerIncoming: (direction) => ({
      x: direction > 0 ? 200 : -200,
      scale: 0.85,
      opacity: 0.6,
      zIndex: 10,
    }),
    center: {
      x: 0,
      scale: 1,
      opacity: 1,
      zIndex: 20,
      transition: {
        type: "spring",
        stiffness: 250,
        damping: 35,
        mass: 0.5
      }
    },
    leftOutgoing: {
      x: -200,
      scale: 0.85,
      opacity: 0.6,
      zIndex: 10,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    },
    rightOutgoing: {
      x: 200,
      scale: 0.85,
      opacity: 0.6,
      zIndex: 10,
      transition: {
        duration: 0.4,
        ease: [0.4, 0, 0.2, 1]
      }
    }
  };
  

  return (
    <div className="w-full h-full flex items-center justify-center overflow-hidden">
      <div className="relative flex items-center justify-center h-5/6 w-full max-w-7xl px-8">
      <motion.div 
            className="flex items-center justify-center w-full relative"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.5} // Meningkatkan elastic drag
            onDragEnd={handleDragEnd}
>
          {/* Previous Image */}
          <motion.div
            className="absolute"
            initial={direction < 0 ? "center" : "leftOutgoing"}
            animate="leftOutgoing"
            variants={slideVariants}
            custom={direction}
          >
            <img
              src={images[getPrevIndex(currentIndex)]}
              alt="Previous slide"
              className="rounded-xl shadow-lg h-[90vh] w-96 object-cover"
              style={{
                maskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
                WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 30%)',
              }}
            />
          </motion.div>

          {/* Main Image */}
          <AnimatePresence initial={false}>
            <motion.div
              key={currentIndex}
              className="z-20"
              initial="centerIncoming"
              animate="center"
              variants={slideVariants}
              custom={direction}
            >
              <img
                src={images[currentIndex]}
                alt="Current slide"
                className="rounded-xl shadow-2xl h-[80vh] w-[50vh] object-cover"
                style={{ willChange: 'transform' }}
              />
            </motion.div>
          </AnimatePresence>

          {/* Next Image */}
          <motion.div
            className="absolute"
            initial={direction > 0 ? "center" : "rightOutgoing"}
            animate="rightOutgoing"
            variants={slideVariants}
            custom={direction}
          >
            <img
              src={images[getNextIndex(currentIndex)]}
              alt="Next slide"
              className="rounded-xl shadow-lg h-[90vh] w-96 object-cover"
              style={{
                maskImage: 'linear-gradient(to left, transparent 0%, black 30%)',
                WebkitMaskImage: 'linear-gradient(to left, transparent 0%, black 30%)',
              }}
            />
          </motion.div>
        </motion.div>

        {/* Tombol Prev */}
        <button
          onClick={handlePrev}
          className="absolute left-4 z-30 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        {/* Tombol Next */}
        <button
          onClick={handleNext}
          className="absolute right-4 z-30 bg-black/40 hover:bg-black/70 text-white p-2 rounded-full transition-all duration-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" fill="none">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        {/* Indikator slide (opsional) */}
        <div className="absolute bottom-4 flex space-x-2 z-30">
          {images.map((_, index) => (
            <div 
              key={index}
              className={`h-2 w-2 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-white w-4' : 'bg-white/50'}`}
              onClick={() => {
                setDirection(index > currentIndex ? 1 : -1);
                setCurrentIndex(index);
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}