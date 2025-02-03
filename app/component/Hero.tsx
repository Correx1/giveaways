/* eslint-disable @typescript-eslint/no-unused-vars */
// app/page.tsx
'use client';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import GiveawayComments from './Comment';

export default function Home() {
  const router = useRouter();
  const giveawayName = 'Mega Star 2025';
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError('Please enter a valid email address.');
      setIsLoading(false);
      return;
    }

    try {
      // Simulate an API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      router.push('/questions');
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
    <div className =" min-h-[50vh] bg-gradient-to-br from-green-900 via-emerald-800 to-teal-900

 font-sans text-white flex flex-col ">
      {/* Header */}
      <header className="py-6 px-8 flex justify-between shadow-2xl">
        <div className="flex items-center gap-4">
          <Image
            src="/logo.png"
            alt="Logo"
            width={48}
            height={48}
            className="rounded-full"
          />
          <h1 className="text-lg sm:text-xl md:text-2xl font-extrabold tracking-wide">{giveawayName}</h1>
        </div>
        <div className="flex items-center gap-4">
          <Image
            src="/logo.jpg"
            alt="Logo"
            width={64}
            height={48}
            className="rounded-full"
          />
        </div>
      </header>

      {/* Main Content */}
      <motion.main
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center justify-center flex-1  px-4 py-7 text-center"
      >
        <motion.h2
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-3xl  sm:text-5xl md:text-6xl font-bold mb-6 drop-shadow-lg"
        >
          Congratulations! 🎉
        </motion.h2>
        <p className="text-lg md:text-xl mb-6 max-w-3xl">
          Participate in the <span className="font-bold text-yellow-300">{giveawayName}</span> and stand a chance to win exclusive prizes worth{' '}
          <span className="font-bold text-yellow-300">₦400,000.00</span>!
        </p>

        {/* Hero Visual */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mb-8"
        >
          <Image
            src="/OIP.jpg"
            alt="Giveaway Visual"
            width={400}
            height={100}
            className="rounded-xl shadow-2xl max-h-48 sm:max-h-64"
          />
        </motion.div>

        {/* Email Entry Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="w-full max-w-md space-y-4"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className=" bg-transparent border border-white/30 text-white placeholder-white py-4 px-6 rounded-full shadow-lg focus:shadow-xl transition-all"
            required
          />
          <Button
            type="submit"
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-green-900 font-bold py-4 rounded-full transition-colors shadow-lg"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <div className="animate-spin rounded-full h-6 w-6 border-4 border-white border-t-transparent"></div>
              </div>
            ) : (
              'Enter Now'
            )}
          </Button>
        </motion.form>

        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="text-red-400 mt-4 font-medium"
          >
            {error}
          </motion.div>
        )}
      </motion.main>
       </div>
<div>
{/*    comment */}
<GiveawayComments/>
</div>



      {/* Footer */}
      <footer className="py-4 text-center text-sm">
        <p>&copy; 2025 Mega Gifting. All rights reserved.</p>
      </footer>
    </div>
   
  );
}
