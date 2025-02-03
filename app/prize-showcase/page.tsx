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
  {
    id: 2,
    name: 'MacBook Pro',
    image: '/macbook.jpg',
    description: 'The latest MacBook Pro with M3 chip performance.',
  },
  // ... Add additional prizes as needed.
];

export default function PrizeShowcase() {
  const [selectedPrize, setSelectedPrize] = useState<typeof prizes[number] | null>(null);
  const [clickedId, setClickedId] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState(false);

  const handleGiftClick = (index: number) => {
    if (isLocked) return;
    setClickedId(index);
    setIsLocked(true);
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setSelectedPrize(randomPrize);
    }, 500);
  };

  const closeModal = () => {
    setSelectedPrize(null);
    setClickedId(null);
  };

  const bounceVariants = {
    initial: { y: 0 },
    animate: {
      y: [0, -20, 0],
      transition: { duration: 1.2, repeat: Infinity, ease: 'easeInOut' },
    },
    tap: { scale: 0.9 },
    clicked: { scale: 0.8, rotate: 360, transition: { duration: 0.5 } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 font-sans text-white flex flex-col items-center justify-center p-6">
      {/* Page Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl md:text-6xl font-bold drop-shadow-lg">🎉 Prize Showcase 🎉</h1>
        <p className="mt-4 text-lg md:text-xl text-gray-200 max-w-3xl mx-auto">
          Explore our exclusive collection of prizes and claim your reward today. Every gift is a chance to win big!
        </p>
      </header>
      <div className="grid grid-cols-3 gap-6 mb-10">
        {Array.from({ length: 9 }).map((_, index) => (
          <motion.div
            key={index}
            variants={bounceVariants}
            initial="initial"
            animate={clickedId === index ? 'clicked' : 'animate'}
            whileHover={!isLocked ? { scale: 1.1 } : {}}
            whileTap="tap"
            className={`cursor-pointer ${isLocked ? 'opacity-50 pointer-events-none' : ''}`}
            onClick={() => handleGiftClick(index)}
          >
            <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl shadow-lg">
              🎁
            </div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {selectedPrize && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={closeModal}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring', stiffness: 200 }}
              className="bg-white/10 p-6 rounded-xl shadow-2xl max-w-md w-full relative"
              onClick={(e) => e.stopPropagation()}
            >
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute top-2 right-2 text-white/70 hover:text-white text-2xl"
                onClick={closeModal}
              >
                ✕
              </motion.button>
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
                <h2 className="text-3xl font-bold mb-4 text-yellow-400 drop-shadow">
                  {selectedPrize.name}
                </h2>
                <motion.div
                  initial={{ scale: 0.95 }}
                  animate={{ scale: 1 }}
                  className="overflow-hidden rounded-lg mb-4"
                >
                  <Image
                    src={selectedPrize.image}
                    alt={selectedPrize.name}
                    width={500}
                    height={300}
                    className="w-full h-56 object-cover transform hover:scale-105 transition-transform duration-300"
                  />
                </motion.div>
                <p className="text-gray-200 mb-6">{selectedPrize.description}</p>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 rounded-lg shadow">
                    <a href="#" className="w-full block">
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
