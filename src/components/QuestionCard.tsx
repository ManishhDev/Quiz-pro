
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, X } from 'lucide-react';
import { Question } from '@/data/quizQuestions';

interface QuestionCardProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  onSkip: () => void;
}

const QuestionCard: React.FC<QuestionCardProps> = ({ 
  question, 
  onAnswer,
  onSkip
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showFeedback, setShowFeedback] = useState(false);
  
  // Reset state when question changes
  useEffect(() => {
    setSelectedOption(null);
    setShowFeedback(false);
  }, [question]);

  const handleOptionClick = (index: number) => {
    if (selectedOption !== null) return; // Prevent selecting another option
    
    setSelectedOption(index);
    setShowFeedback(true);
    
    // Check if answer is correct
    const isCorrect = index === question.correctAnswer;
    
    // Wait for animation and then move to next question
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 1500); // 1.5 second delay as specified
  };
  
  const isCorrect = selectedOption === question.correctAnswer;

  return (
    <motion.div 
      className="quiz-card"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl font-medium mb-6 text-quiz-text">
        {question.question}
      </h2>
      
      <div className="space-y-3">
        {question.options.map((option, index) => (
          <button
            key={index}
            onClick={() => handleOptionClick(index)}
            disabled={selectedOption !== null}
            className={`option-button ${
              showFeedback && selectedOption !== null
                ? index === question.correctAnswer
                  ? 'correct'
                  : selectedOption === index && selectedOption !== question.correctAnswer
                    ? 'incorrect'
                    : ''
                : ''
            } ${selectedOption === index ? 'selected' : ''}`}
          >
            {option}
            
            {showFeedback && (
              <motion.span 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`absolute right-4 top-1/2 transform -translate-y-1/2 ${
                  index === question.correctAnswer || (selectedOption === index && isCorrect)
                    ? 'block'
                    : selectedOption === index
                    ? 'block'
                    : 'hidden'
                }`}
              >
                {index === question.correctAnswer ? (
                  <Check className="h-6 w-6 text-quiz-success" />
                ) : (
                  <X className="h-6 w-6 text-quiz-error" />
                )}
              </motion.span>
            )}
          </button>
        ))}
      </div>
      
      <div className="flex justify-between mt-8">
        <button 
          onClick={onSkip} 
          disabled={selectedOption !== null}
          className="secondary-button"
        >
          Skip
        </button>
      </div>
    </motion.div>
  );
};

export default QuestionCard;
