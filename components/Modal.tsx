import { useState } from 'react';
import { motion } from 'framer-motion';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: () => void;
}

const questions = [
  "What is your favorite color?",
  "How did you hear about this giveaway?",
  "What prize are you most excited about?",
  "How often do you participate in giveaways?",
  "What social media platform do you use the most?",
  "Would you recommend this giveaway to a friend?",
];

const Modal = ({ isOpen, onClose, onComplete }: ModalProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>(Array(questions.length).fill(''));

  const handleNext = () => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete(); // All questions answered
    }
  };

  const handleAnswerChange = (value: string) => {
    const newAnswers = [...answers];
    newAnswers[currentStep] = value;
    setAnswers(newAnswers);
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-lg p-6 w-full max-w-md text-green-900"
      >
        <h2 className="text-xl font-bold mb-4">Question {currentStep + 1}</h2>
        <p className="mb-4">{questions[currentStep]}</p>

        <input
          type="text"
          value={answers[currentStep]}
          onChange={(e) => handleAnswerChange(e.target.value)}
          className="w-full p-2 border border-green-300 rounded mb-4"
          placeholder="Your answer..."
        />

        <div className="flex justify-between">
          <button
            onClick={onClose}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Close
          </button>
          <button
            onClick={handleNext}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            {currentStep === questions.length - 1 ? 'Finish' : 'Next'}
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;