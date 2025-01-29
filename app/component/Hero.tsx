/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Share2, Link, Twitter, Facebook,  } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Giveaway() {
  const router = useRouter();
  const giveawayName = 'Mega Star Giveaway 2025';
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isQuestionsComplete, setIsQuestionsComplete] = useState(false);
  const [shareCount, setShareCount] = useState(0);
  const [selectedGift, setSelectedGift] = useState<number | null>(null);
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  // Questions
  const questions = [
    { question: 'What is your favorite color?', answers: ['Red', 'Blue'] },
    { question: 'What is your favorite month?', answers: ['January', 'February'] },
    { question: 'Which do you prefer?', answers: ['Cats', 'Dogs'] },
    { question: 'Which is your dream destination?', answers: ['Paris', 'Dubai'] },
    { question: 'What is your favorite hobby?', answers: ['Reading', 'Traveling'] },
    { question: 'What is your favorite food?', answers: ['Pizza', 'Sushi'] },
  ];

  // Gift Icons
  const gifts = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    icon: '🎁', // Replace with your gift icon or image
  }));

  // Countdown timer
  useEffect(() => {
    if (timeLeft === 0) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  // Format time
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Email validation
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setIsSubmitted(true);
      setIsModalOpen(true); // Open modal after submission
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle question navigation
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      setIsQuestionsComplete(true);
    }
  };

  // Handle gift selection
  const handleGiftSelect = (id: number) => {
    setSelectedGift(id);
    setTimeout(() => {
      setIsGiftOpened(true);
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }, 1000); // Simulate gift opening delay
  };

  // Handle share button click
  const handleShare = () => {
    setShareCount((prev) => prev + 1);
    if (shareCount + 1 >= 5) {
      router.push('/prize-showcase'); // Redirect to prize showcase page
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 font-sans text-white">
      {/* Header */}
      <header className="bg-green-800/50 py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-xl md:text-2xl font-bold">{giveawayName}</h1>
        <p className="text-sm">Time Left: {formatTime(timeLeft)}</p>
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center py-12 px-4"
      >
        {/* Heading */}
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Congratulations! 🎉
        </motion.h2>

        {/* Description */}
        <p className="text-lg md:text-xl mb-8 max-w-2xl">
          Participate in the {giveawayName} and stand a chance to win exclusive
          prizes worth{' '}
          <span className="font-bold text-yellow-300">₦400,000.00</span>!
        </p>

        {/* Floating Gift Animation */}
        <motion.div
          animate={{ y: [0, -20, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="mb-8"
        >
          <div className="w-24 h-24 bg-yellow-400 rounded-full flex items-center justify-center text-4xl">
            🎁
          </div>
        </motion.div>

        {/* Entry Form */}
        {!isSubmitted ? (
          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="w-full max-w-md space-y-4"
          >
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-white/10 border-none text-white placeholder:text-white/70"
              required
            />

            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-6 text-lg"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
                </div>
              ) : (
                'Enter Now'
              )}
            </Button>
          </motion.form>
        ) : (
          /* Success Message */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-yellow-300"
          >
            🎉 Thank you for entering! 🎉
          </motion.div>
        )}

        {/* Error Message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-red-500 text-center mt-4"
          >
            {error}
          </motion.div>
        )}
      </motion.main>

      {/* Modal for Questions */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            {!isQuestionsComplete ? (
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-green-700">
                  Question {currentQuestion + 1} of {questions.length}
                </h3>
                <p className="text-gray-800">{questions[currentQuestion].question}</p>
                <div className="space-y-2">
                  {questions[currentQuestion].answers.map((answer, index) => (
                    <Button
                      key={index}
                      onClick={handleNextQuestion}
                      className="w-full bg-green-700 hover:bg-green-800 text-white"
                    >
                      {answer}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center">
                {!isGiftOpened ? (
                  <>
                    <h3 className="text-xl font-bold text-green-700 mb-4">
                      Select a Gift!
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                      {gifts.map((gift) => (
                        <motion.div
                          key={gift.id}
                          initial={{ scale: 1 }}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          className="cursor-pointer"
                          onClick={() => handleGiftSelect(gift.id)}
                        >
                          <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center text-4xl">
                            {gift.icon}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="text-2xl font-bold text-green-700 mb-4">
                      🎉 Congratulations! 🎉
                    </h3>
                    <p className="text-gray-800 mb-4">
                      Share the giveaway to unlock the prize showcase.
                    </p>

                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-4">
                      <div
                        className="bg-yellow-400 h-2.5 rounded-full"
                        style={{ width: `${(shareCount / 5) * 100}%` }}
                      ></div>
                    </div>

                    {/* Share Buttons */}
                    <div className="flex justify-center gap-4">
                      <Button
                        onClick={handleShare}
                        className="bg-blue-400 hover:bg-blue-500"
                      >
                        <Twitter size={18} className="mr-2" />
                        Twitter
                      </Button>
                      <Button
                        onClick={handleShare}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        <Facebook size={18} className="mr-2" />
                        Facebook
                      </Button>
                      {/* <Button
                        onClick={handleShare}
                        className="bg-green-500 hover:bg-green-600"
                      >
                        <WhatsApp size={18} className="mr-2" />
                        WhatsApp
                      </Button> */}
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-green-800/50 py-4 text-center text-sm">
        <p>&copy; 2025 Mega Gifting. All rights reserved.</p>
      </footer>
    </div>
  );
}