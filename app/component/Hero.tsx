'use client';
import Image from 'next/image';
import { useState, useEffect, SetStateAction } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import { Button } from '@/components/ui/button'; // Assuming you're using shadcn's Button
import { Input } from '@/components/ui/input'; // Assuming you're using shadcn's Input

export default function Giveaway() {
  const giveawayName = 'Mega Star Giveaway 2025';
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds

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
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-700 to-green-900 font-sans text-white">
      {/* Header */}
      <header className="bg-green-800/50 py-4 px-6 flex justify-between items-center shadow-lg">
        <h1 className="text-xl md:text-2xl font-bold">{giveawayName}</h1>
        <p className="text-sm">Time Left: {formatTime(timeLeft)}</p>
      </header>

      {/* Hero Section */}
      <motion.main
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center text-center py-12 px-4"
      >
        <motion.h2
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="text-4xl md:text-5xl font-bold mb-4"
        >
          Congratulations! 🎉
        </motion.h2>
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
          <Image
            src="/gv.png" // Replace with your gift image
            alt="Gift"
            width={100}
            height={100}
            className="w-24 h-24"
          />
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
              onChange={(e: { target: { value: SetStateAction<string>; }; }) => setEmail(e.target.value)}
              className="bg-white/10 border-none text-white placeholder:text-white/70"
              required
            />
            <Button
              type="submit"
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-6 text-lg"
            >
              Enter Now
            </Button>
          </motion.form>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-2xl font-bold text-yellow-300"
          >
            🎉 Thank you for entering! Good luck! 🎉
          </motion.div>
        )}
      </motion.main>

      {/* Footer */}
      <footer className="bg-green-800/50 py-4 text-center text-sm">
        <p>&copy; 2025 Mega Gifting. All rights reserved.</p>
      </footer>
    </div>
  );
}