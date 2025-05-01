
import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ 
        opacity: mounted ? 1 : 0, 
        y: mounted ? 0 : 20 
      }}
      transition={{ duration: 0.5 }}
      className="quiz-card flex flex-col items-center justify-center text-quiz-text py-12"
    >
      <h1 className="text-4xl font-medium mb-6 text-center">Quiz</h1>
      <p className="text-quiz-lightText mb-8 text-center max-w-md">
        Test your knowledge with this interactive quiz. Answer all questions to see your final score!
      </p>
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          onClick={onStart}
          className="primary-button"
        >
          Start Quiz
        </Button>
      </motion.div>
    </motion.div>
  );
};

export default StartScreen;
