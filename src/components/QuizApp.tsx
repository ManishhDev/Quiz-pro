
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { quizQuestions } from '@/data/quizQuestions';
import StartScreen from './StartScreen';
import QuestionCard from './QuestionCard';
import ScoreScreen from './ScoreScreen';
import ProgressBar from './ProgressBar';

enum QuizStatus {
  START,
  IN_PROGRESS,
  COMPLETED
}

const QuizApp: React.FC = () => {
  const [quizStatus, setQuizStatus] = useState<QuizStatus>(QuizStatus.START);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  
  const startQuiz = () => {
    setQuizStatus(QuizStatus.IN_PROGRESS);
    setCurrentQuestionIndex(0);
    setScore(0);
  };
  
  const handleAnswer = (isCorrect: boolean) => {
    if (isCorrect) {
      setScore((prev) => prev + 1);
    }
    
    // Move to next question or end quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizStatus(QuizStatus.COMPLETED);
    }
  };
  
  const handleSkip = () => {
    // Move to next question or end quiz
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      setQuizStatus(QuizStatus.COMPLETED);
    }
  };
  
  const restartQuiz = () => {
    setQuizStatus(QuizStatus.START);
  };
  
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <motion.div 
        className="w-full max-w-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {quizStatus === QuizStatus.START && (
            <StartScreen key="start-screen" onStart={startQuiz} />
          )}
          
          {quizStatus === QuizStatus.IN_PROGRESS && (
            <motion.div 
              key="question-section"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-6">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="text-white font-medium">
                    Question {currentQuestionIndex + 1} of {quizQuestions.length}
                  </h3>
                </div>
                <ProgressBar 
                  current={currentQuestionIndex + 1} 
                  total={quizQuestions.length} 
                />
              </div>
              
              <AnimatePresence mode="wait">
                <QuestionCard 
                  key={currentQuestionIndex}
                  question={quizQuestions[currentQuestionIndex]}
                  onAnswer={handleAnswer}
                  onSkip={handleSkip}
                />
              </AnimatePresence>
            </motion.div>
          )}
          
          {quizStatus === QuizStatus.COMPLETED && (
            <ScoreScreen 
              key="score-screen"
              score={score} 
              total={quizQuestions.length} 
              onRestart={restartQuiz} 
            />
          )}
        </AnimatePresence>
      </motion.div>
      
      {/* Footer with bottom border */}
      <div className="w-full flex justify-center mt-auto pt-6">
        <div className="w-32 h-0.5 bg-[oklch(0.928_0.006_264.531)]"></div>
      </div>
    </div>
  );
};

export default QuizApp;
