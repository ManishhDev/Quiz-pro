
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';

interface ScoreScreenProps {
  score: number;
  total: number;
  onRestart: () => void;
}

const ScoreScreen: React.FC<ScoreScreenProps> = ({ score, total, onRestart }) => {
  const percentage = Math.round((score / total) * 100);
  const isPerfectScore = score === total;
  
  // Feedback based on score
  const getFeedback = () => {
    if (percentage >= 80) return "Excellent!";
    if (percentage >= 60) return "Good job!";
    if (percentage >= 40) return "Not bad!";
    return "Keep practicing!";
  };

  // Confetti animation elements for perfect score
  const celebrationVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { 
      scale: [0, 1, 0.8, 1], 
      opacity: [0, 1, 0.8, 1],
      y: [0, -20, 0],
      transition: {
        duration: 0.8,
        ease: "easeInOut",
        times: [0, 0.4, 0.7, 1],
        repeat: 3,
        repeatType: "reverse" as const
      }
    }
  };
  
  return (
    <motion.div 
      className="quiz-card"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-medium mb-6 text-center text-quiz-text">Quiz Completed!</h1>
      
      <div className="flex flex-col items-center justify-center mb-8">
        <motion.div 
          className="text-5xl font-bold mb-2 text-quiz-primary"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.3, type: "spring" }}
        >
          {score}/{total}
        </motion.div>
        
        <p className="text-xl text-quiz-lightText">{getFeedback()}</p>
        
        {isPerfectScore && (
          <div className="flex justify-center mt-4 space-x-2">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                variants={celebrationVariants}
                initial="hidden"
                animate="visible"
                transition={{
                  delay: i * 0.2,
                }}
              >
                <Check className="w-8 h-8 text-quiz-primary" />
              </motion.div>
            ))}
          </div>
        )}
        
        <motion.div 
          className="w-full bg-gray-200 rounded-full h-4 mt-6"
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div 
            className="bg-quiz-primary h-4 rounded-full" 
            style={{ width: `${percentage}%` }}
          />
        </motion.div>
        <div className="text-sm text-quiz-lightText mt-2">{percentage}%</div>
      </div>
      
      <div className="flex justify-center">
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={onRestart} 
            className="primary-button"
          >
            Restart Quiz
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ScoreScreen;
