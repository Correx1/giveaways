'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

// Prize Data
const prizes = [
  {
    id: 1,
    name: 'iPhone 15 Pro',
    image: '/iphone.jpg',
    description: 'The latest iPhone with cutting-edge features.',
  },
  // ... (keep other prize objects the same)
];

export default function PrizeShowcase() {
  const [selectedPrize, setSelectedPrize] = useState<typeof prizes[number] | null>(null);
  const [clickedId, setClickedId] = useState<number | null>(null);

  // Handle gift icon click
  const handleGiftClick = (index: number) => {
    setClickedId(index);
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setSelectedPrize(randomPrize);
    }, 500);
  };

  // Close modal
  const closeModal = () => {
    setSelectedPrize(null);
    setClickedId(null);
  };

  // Bounce animation variants
  const bounceVariants = {
    initial: { y: 0 },
    animate: { 
      y: [0, -20, 0],
      transition: { 
        duration: 1.2,
        repeat: Infinity,
        ease: "easeInOut"
      }
    },
    tap: { scale: 0.9 },
    clicked: { 
      scale: 0.8,
      rotate: 360,
      transition: { duration: 0.5 } 
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 font-sans text-white flex flex-col items-center justify-center text-center p-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-8">🎉 Prize Showcase 🎉</h1>
      
      {/* Gift Icons Grid */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {Array.from({ length: 9 }).map((_, index) => (
          <motion.div
            key={index}
            variants={bounceVariants}
            initial="initial"
            animate={clickedId === index ? "clicked" : "animate"}
            whileHover={{ scale: 1.1 }}
            whileTap="tap"
            className="cursor-pointer"
            onClick={() => handleGiftClick(index)}
          >
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl">
              🎁
            </div>
          </motion.div>
        ))}
      </div>

      {/* Prize Display Modal */}
      <AnimatePresence>
        {selectedPrize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="bg-white/10 p-6 rounded-xl shadow-2xl max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 text-white/60 hover:text-white"
                onClick={closeModal}
              >
                ✕
              </motion.button>

              {/* Prize Content */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <h2 className="text-3xl font-bold mb-4 text-yellow-400">
                  {selectedPrize.name}
                </h2>
                <motion.div
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  className="overflow-hidden rounded-lg mb-4"
                >
                  <Image
                    src={selectedPrize.image}
                    alt={selectedPrize.name}
                    width={100}
                    height={100}
                    className="w-full h-48 object-cover transform hover:scale-105 transition-transform"
                  />
                </motion.div>
                <p className="text-gray-300 mb-6">{selectedPrize.description}</p>
                
                {/* Claim Button */}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                 <Button>
                 <a
                    href="#"
                    className="inline-block w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 px-6 rounded-lg transition-colors"
                  >
                    🎁 Claim This Item
                  </a>
                 </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}