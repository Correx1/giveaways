'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';
import { FaFacebook, FaWhatsapp } from 'react-icons/fa';
import { FaXTwitter } from "react-icons/fa6";
import Image from 'next/image';

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
];

export default function QuestionsPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuestionsComplete, setIsQuestionsComplete] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [showGiftModal, setShowGiftModal] = useState(false);
  const [selectedPrize, setSelectedPrize] = useState<typeof prizes[number] | null>(null);
  const [clickedGift, setClickedGift] = useState<number | null>(null);

  const questions = [
    { question: 'What is your favorite color?', answers: ['Red', 'Blue'] },
    { question: 'What is your favorite month?', answers: ['January', 'February'] },
    { question: 'Which do you prefer?', answers: ['Cats', 'Dogs'] },
    { question: 'Which is your dream destination?', answers: ['Paris', 'Dubai'] },
    { question: 'What is your favorite hobby?', answers: ['Reading', 'Traveling'] },
    { question: 'What is your favorite food?', answers: ['Pizza', 'Sushi'] },
  ];

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
    } else {
      setIsQuestionsComplete(true);
      confetti({ particleCount: 120, spread: 80, origin: { y: 0.6 } });
    }
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = "I'm participating in this amazing giveaway! Join now!";
    let shareUrl = '';

    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`;
    } else if (platform === 'facebook') {
      shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`;
    } else if (platform === 'whatsapp') {
      shareUrl = `https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`;
    }

    window.open(shareUrl, '_blank');
    setShareCount(prev => {
      const newCount = prev + 1;
      if (newCount >= 3) setShowGiftModal(true);
      return newCount;
    });
  };

  const handleGiftClick = (index: number) => {
    setClickedGift(index);
    setTimeout(() => {
      const randomPrize = prizes[Math.floor(Math.random() * prizes.length)];
      setSelectedPrize(randomPrize);
      confetti({ particleCount: 150, spread: 100, origin: { y: 0.5 } });
    }, 1000);
  };

  const closeModal = () => {
    setShowGiftModal(false);
    setSelectedPrize(null);
    setClickedGift(null);
  };

  const giftVariants = {
    initial: { scale: 1, rotate: 0 },
    animate: { 
      scale: [1, 1.1, 1],
      rotate: [0, 15, -15, 0],
      transition: { duration: 1.5, repeat: Infinity }
    },
    clicked: { 
      scale: 0,
      rotate: 720,
      transition: { duration: 1, ease: "easeInOut" }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-800 to-green-900 text-white flex flex-col">
      <header className="bg-green-900/80 py-4 px-6 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-extrabold">Mega Star Giveaway 2025</h1>
      </header>

      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center flex-1 px-6 py-12"
      >
       {!isQuestionsComplete ? (
  <div className="w-full max-w-3xl bg-white/10 p-6 rounded-xl shadow-lg">
    <h2 className="text-lg sm:text-xl md:text-2xl text-center font-bold text-yellow-300 mb-5">Get Ready for Your Chance to Win Big! </h2>
    <h3 className="text-xl font-bold text-yellow-300">Question {currentQuestion + 1} of {questions.length}</h3>
    <p className="text-lg mt-2">{questions[currentQuestion].question}</p>
    <div className="space-y-3 mt-6">
      {questions[currentQuestion].answers.map((answer, index) => (
        <Button
          key={index}
          onClick={handleNextQuestion}
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-3 rounded-lg shadow"
        >
          {answer}
        </Button>
      ))}
    </div>
  </div>
    ) : !showGiftModal ? (
          <div className="text-center">
            <motion.h3 className="text-3xl font-bold text-yellow-300">Congratulations! 🎉</motion.h3>
            <p className="text-lg mt-2">Share this giveaway to unlock your prize.</p>
            <div className="w-full bg-gray-300 rounded-full h-3 my-4">
              <div className="bg-yellow-400 h-3 rounded-full" style={{ width: `${(shareCount / 3) * 100}%` }}></div>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => handleShare('twitter')}
                className="bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2"
              >
                <FaXTwitter size={20} /> 
              </Button>
              <Button
                onClick={() => handleShare('facebook')}
                className="bg-blue-700 hover:bg-blue-800 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2"
              >
                <FaFacebook size={20} /> 
              </Button>
              <Button
                onClick={() => handleShare('whatsapp')}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-5 rounded-lg flex items-center gap-2"
              >
                <FaWhatsapp size={20} /> 
              </Button>
            </div>
          </div>
        ) : null}

        <AnimatePresence>
          {showGiftModal && (
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
                className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-2xl p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                {!selectedPrize ? (
                  <>
                    <h2 className="text-3xl font-bold text-center text-yellow-400 mb-8">
                      🎁 Pick Your Gift! 🎁
                    </h2>
                    <div className="grid grid-cols-3 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {Array.from({ length: 9 }).map((_, index) => (
                        <motion.div
                          key={index}
                          variants={giftVariants}
                          initial="initial"
                          animate={clickedGift === index ? 'clicked' : 'animate'}
                          className="cursor-pointer"
                          onClick={() => handleGiftClick(index)}
                        >
                          <div className="w-full aspect-square bg-yellow-400/80 rounded-xl flex items-center justify-center text-4xl shadow-lg hover:shadow-2xl transition-shadow">
                            🎁
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <h3 className="text-4xl font-bold text-yellow-400 mb-6">
                      Congratulations! 🎉
                    </h3>
                    <motion.div
                      initial={{ scale: 0.9 }}
                      animate={{ scale: 1 }}
                      className="relative overflow-hidden rounded-xl mb-6"
                    >
                      <Image
                        src={selectedPrize.image}
                        alt={selectedPrize.name}
                        width={600}
                        height={400}
                        className="w-full h-64 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <h4 className="absolute bottom-4 left-4 text-3xl font-bold text-white">
                        {selectedPrize.name}
                      </h4>
                    </motion.div>
                    <p className="text-lg text-gray-200 mb-8">
                      {selectedPrize.description}
                    </p>
                    <Button
                      onClick={closeModal}
                      className="bg-yellow-400 hover:bg-yellow-500 text-green-900 text-lg py-6 px-12 rounded-full shadow-lg transform transition-all hover:scale-105"
                    >
                      Claim Your Prize Now
                    </Button>
                  </motion.div>
                )}
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.main>

      <footer className="bg-green-900/80 py-4 text-center text-sm">
        <p>&copy; 2025 Mega Gifting. All rights reserved.</p>
      </footer>
    </div>
  );
}
