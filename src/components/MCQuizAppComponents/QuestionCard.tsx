import { useState } from "react";
import type { Question } from "./quizType";
import { Card, CardTitle, CardHeader, CardContent } from "../ui/card";
import { CheckCircle, SkipForward, XCircle } from "lucide-react";
import { Label } from "../ui";
import { cn } from "@/lib/utils";

interface QuestionCardProps {
  question: Question;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: number;
  onAnswerSelect: (answer: number) => void;
  showResult?: boolean;
  isSkipped?: boolean;
}

const QuestionCard = ({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  showResult,
  isSkipped,
}: QuestionCardProps) => {
  const [hoveredOption, setHoveredOption] = useState<number | null>(null);

  const getOptionStyle = (optionIndex: number) => {
    if (showResult && isSkipped) {
      if (optionIndex === question.correctAnswer) {
        return "bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-400 dark:text-emerald-300";
      }
      return "bg-muted border-border text-muted-foreground opacity-60";
    }

    if (showResult) {
      if (optionIndex === question.correctAnswer) {
        return "bg-emerald-100 border-emerald-500 text-emerald-700 dark:bg-emerald-900/20 dark:border-emerald-400 dark:text-emerald-300";
      }
      if (
        selectedAnswer === optionIndex &&
        optionIndex !== question.correctAnswer
      ) {
        return "bg-red-100 border-red-500 text-red-700 dark:bg-red-900/20 dark:border-red-400 dark:text-red-300";
      }
      return "bg-muted border-border text-muted-foreground";
    }

    if (selectedAnswer === optionIndex) {
      return "bg-primary text-primary-foreground border-primary";
    }

    if (hoveredOption === optionIndex) {
      return "bg-accent/50 border-accent text-accent-foreground";
    }

    return "bg-card border-border text-card-foreground hover:bg-accent/30";
  };

  const getOptionIcon = (optionIndex: number) => {
    if (!showResult) return null;

    if (optionIndex === question.correctAnswer) {
      return (
        <CheckCircle className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
      );
    }

    if (
      selectedAnswer === optionIndex &&
      optionIndex !== question.correctAnswer
    ) {
      return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
    }

    return null;
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground text-medium">
            Question {questionNumber} of {totalQuestions}
          </span>
          {showResult && isSkipped && (
            <div className="flex items-center gap-1 text-sm text-orange-600 dark:text-orange-400">
              <SkipForward className="w-4 h-4" />
              <span>Skipped</span>
            </div>
          )}
        </div>
        <CardTitle>{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2">
          {question.options.map((option, index) => (
            <Label
              key={index}
              className={cn(
                "w-full p-4 border rounded-lg cursor-pointer transition-all duration-200 flex items-center gap-3",
                getOptionStyle(index),
                showResult && "cursor-default"
              )}
              onMouseEnter={() => !showResult && setHoveredOption(index)}
              onMouseLeave={() => !showResult && setHoveredOption(null)}
            >
              <input
                type="radio"
                name={`question-${questionNumber}`}
                value={index}
                checked={selectedAnswer === index}
                onChange={() => !showResult && onAnswerSelect(index)}
                disabled={showResult}
                className="w-4 h-4 text-primary focus:ring-primary focus:ring-2 border-border"
              />
              <div className="flex items-center justify-between w-full">
                <span className="leading-relaxed text-pretty">{option}</span>
                {getOptionIcon(index)}
              </div>
            </Label>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default QuestionCard;
