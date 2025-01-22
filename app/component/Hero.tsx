'use client'
import Image from "next/image";
import { useState } from "react";

export default function Giveaway() {
  const giveawayName = "Mega Star Giveaway 2025";

  const questions = [
    {
      question: "What is your favorite color?",
      answers: ["Red", "Blue"],
      correct: "Blue",
    },
    {
      question: "What is your favorite month?",
      answers: ["January", "February"],
      correct: "January",
    },
    {
      question: "Which do you prefer?",
      answers: ["Cats", "Dogs"],
      correct: "Dogs",
    },
    {
      question: "Which is your dream destination?",
      answers: ["Paris", "Dubai"],
      correct: "Paris",
    },
    {
      question: "What is your favorite hobby?",
      answers: ["Reading", "Traveling"],
      correct: "Reading",
    },
  ];

  const comments = [
    {
      name: "Samuel Ade",
      comment:
        "I can't believe it! I won ₦400,000. Thanks, Mega Star Giveaway!",
      likes: 15,
      dislikes: 1,
      image: "/us.png",
    },
    {
      name: "Aisha Bello",
      comment: "Wow, this is legit! I just received my prize.",
      likes: 20,
      dislikes: 2,
      image: "/us.png",
    },
    {
      name: "Tunde Ojo",
      comment: "I told my friends, and they joined too. Great giveaway!",
      likes: 10,
      dislikes: 0,
      image: "/us.png",
    },
    {
      name: "Chioma Okafor",
      comment: "I'm so happy I participated. Thank you, Mega Star Giveaway!",
      likes: 12,
      dislikes: 1,
      image: "/us.png",
    },
    {
      name: "Ahmed Musa",
      comment: "Best experience ever! I'm thrilled with my prize.",
      likes: 18,
      dislikes: 3,
      image: "/us.png",
    },
  ];

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isResultVisible, setIsResultVisible] = useState(false);
  const [selectedCongrats, setSelectedCongrats] = useState("");

  // Handle answer click
  const handleAnswerClick = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Show result popup
      setSelectedCongrats(
        "Congratulations! You're one of our lucky winners. Thank you for participating!"
      );
      setIsResultVisible(true);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans">
      {/* Header Section */}
      <header className="bg-green-700 text-white py-2 px-4 flex justify-between items-center">
        <h1 className="text-lg md:text-xl font-bold">{giveawayName}</h1>
        <p className="text-sm">January 2025</p>
      </header>

      {/* Hero Section */}
      <main className="mt-6 mx-auto md:w-3/4 lg:w-2/3 ">
        <h2 className="text-2xl md:text-3xl font-bold text-green-700 text-center">
          Congratulations!
        </h2>
        <p className="text-gray-800 text-center mx-5 ">
          {giveawayName} - Start answering questions and win exclusive prizes
          worth <span className="font-bold text-green-700">₦400,000.00</span>.
        </p>

        {/* Full-Width Image */}
        <div className="mt-6">
          <Image
            src="/gv.png"
            alt="Mega Star Giveaway"
            width={1920}
            height={600}
            className="w-full h-80 object-cover  shadow-lg mx-4"
          />
        </div>
      </main>

      {/* Quiz Section */}
      <section className="mt-2 mx-auto p-4 rounded-lg shadow-lg md:w-3/4 lg:w-2/3">
        <h3 className="text-lg md:text-xl font-bold text-green-700 text-center">
          Question {currentQuestion + 1} of {questions.length}
        </h3>
        <p className="text-gray-800 text-center mt-4">
          {questions[currentQuestion].question}
        </p>
        <div className="mt-6 space-y-4">
          {questions[currentQuestion].answers.map((answer, index) => (
            <button
              key={index}
              onClick={handleAnswerClick}
              className="w-full bg-green-700 hover:bg-green-800 text-white py-2 px-4 rounded-lg text-center"
            >
              {answer}
            </button>
          ))}
        </div>
      </section>

      {/* Comments Section */}
      <section className="mt-8 mx-auto p-6 bg-white rounded-lg shadow-lg md:w-3/4 lg:w-2/3">
        <h3 className="text-lg md:text-xl font-bold text-green-700">
          Recent Comments
        </h3>
        <div className="mt-4 space-y-6">
          {comments.map((comment, index) => (
            <div
              key={index}
              className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg shadow-sm"
            >
              <Image
                src={comment.image}
                alt={comment.name}
                width={50}
                height={50}
                className="rounded-full"
              />
              <div>
                <p className="font-bold text-gray-800">{comment.name}</p>
                <p className="text-gray-600 text-sm">{comment.comment}</p>
                <div className="flex items-center space-x-2 text-gray-500 text-sm mt-2">
                  <button>👍 {comment.likes}</button>
                  <button>👎 {comment.dislikes}</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <footer className="bg-green-700 text-center text-white py-4 mt-6">
    <p className="text-sm">&copy; 2025 Mega Gifting. All rights reserved.</p>
  </footer>

      {/* Result Popup */}
      {isResultVisible && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-2/3 lg:w-1/3 relative">
            {/* Sticker Simulation */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-green-700 rounded-full flex items-center justify-center text-white text-lg font-bold shadow-lg">
              🎉
            </div>
            <h3 className="text-lg md:text-xl font-bold text-green-700 text-center mt-10">
              {selectedCongrats}
            </h3>
            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setIsResultVisible(false)}
                className="bg-gray-700 hover:bg-gray-800 text-white py-2 px-6 rounded-lg text-md font-semibold shadow-md"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
