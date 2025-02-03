import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

interface Comment {
  id: number;
  name: string;
  avatar: string;
  comment: string;
  timestamp: string;
  likes: number;
  dislikes: number;
}

const dummyComments: Comment[] = [
  {
    id: 1,
    name: 'Alice',
    avatar: '/user.jpg',
    comment: "I'm so excited for this giveaway! I've been waiting for something like this all year.",
    timestamp: '2 hours ago',
    likes: 12,
    dislikes: 1,
  },
  {
    id: 2,
    name: 'Bob',
    avatar: '/user.jpg',
    comment: "Can't wait to see the prizes. Fingers crossed for me!",
    timestamp: '1 day ago',
    likes: 8,
    dislikes: 0,
  },
  {
    id: 3,
    name: 'Charlie',
    avatar: '/user.jpg',
    comment: "This is the best giveaway ever! The prizes look amazing.",
    timestamp: '3 days ago',
    likes: 15,
    dislikes: 2,
  },
  {
    id: 4,
    name: 'Dana',
    avatar: '/user.jpg',
    comment: "I shared it with all my friends already. Let's win big!",
    timestamp: '5 days ago',
    likes: 20,
    dislikes: 3,
  },
];

export default function GiveawayComments() {
  return (
    <div className="w-full p-4 sm:p-6">
    <motion.h2
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
      className="text-xl sm:text-2xl font-bold text-gray-800 mb-4 sm:mb-6"
    >
      Comments
    </motion.h2>
  
    <div className="space-y-4">
      {dummyComments.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: item.id * 0.2 }}
          className="flex bg-white/60 backdrop-blur-sm rounded-lg p-3 sm:p-4 shadow-sm w-full"
        >
          <div className="flex-shrink-0">
            <Image
              src={item.avatar}
              alt={item.name}
              width={40}
              height={40}
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full"
            />
          </div>
          <div className="ml-3 sm:ml-4 flex-1">
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-semibold text-gray-900">
                {item.name}
              </h3>
              <span className="text-xs sm:text-sm text-gray-600">
                {item.timestamp}
              </span>
            </div>
            <p className="text-sm sm:text-base text-gray-800 mt-2">{item.comment}</p>
            <div className="flex items-center mt-3 space-x-4">
              <div className="flex items-center space-x-1">
                <button className="text-gray-600 hover:text-green-600 transition-colors">
                  <ThumbsUp size={14} />
                </button>
                <span className="text-xs sm:text-sm text-gray-700">{item.likes}</span>
              </div>
              <div className="flex items-center space-x-1">
                <button className="text-gray-600 hover:text-red-600 transition-colors">
                  <ThumbsDown size={14} />
                </button>
                <span className="text-xs sm:text-sm text-gray-700">{item.dislikes}</span>
              </div>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
  
  
  );
}
