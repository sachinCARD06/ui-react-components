import { useState } from "react";
import { questionsList } from "@/components/MCQuizAppComponents/questionsList";
import { Button } from "@/components/ui/button";
import QuestionCard from "@/components/MCQuizAppComponents/QuestionCard";
import type { QuizState } from "@/components/MCQuizAppComponents/quizType";

const MCQuizApp = () => {
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestion: 0,
    selectedAnswers: {},
    skippedQuestions: {},
    isCompleted: false,
    startTime: Date.now(),
    result: undefined,
  });
  const [isReviewMode, setIsReviewMode] = useState(false);

  const currentQuestion = questionsList[quizState.currentQuestion];
  const isLastQuestion = quizState.currentQuestion === questionsList.length - 1;
  const hasSelectedAnswer =
    quizState.selectedAnswers[currentQuestion?.id] !== undefined;
  const isCurrentQuestionSkipped =
    quizState.skippedQuestions[currentQuestion?.id] === true;

  const handleAnswerSelect = (answer: number) => {
    console.log(answer);
    // setQuizState({
    //   ...quizState,
    //   selectedAnswers: { ...quizState.selectedAnswers, [currentQuestion.id]: answer },
    // })
  };

  return (
    <div className="h-full p-4 border border-gray-200 rounded-md bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-balance">
            General Knowledge Quiz
          </h1>
          {isReviewMode ? (
            <div className="flex items-center justify-center gap-4">
              <p className="text-muted-foreground">
                Review Mode - See correct answers
              </p>
              <Button variant="outline" size="sm" onClick={() => {}}>
                Exit Review
              </Button>
            </div>
          ) : (
            <p className="text-muted-foreground">
              Answer all questions to complete the quiz
            </p>
          )}
        </div>

        {/* Question Card */}
        <div className="mb-8">
          <QuestionCard
            question={currentQuestion}
            questionNumber={quizState.currentQuestion + 1}
            totalQuestions={questionsList.length}
            selectedAnswer={quizState.selectedAnswers[currentQuestion.id]}
            onAnswerSelect={handleAnswerSelect}
            showResult={isReviewMode}
            isSkipped={isCurrentQuestionSkipped}
          />
        </div>
      </div>
    </div>
  );
};

export default MCQuizApp;
