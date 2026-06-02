import { useEffect, useState } from "react";
import { Question } from "../types";

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFormula, setSelectedFormula] = useState<null | string>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [wrongCount, setWrongCount] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [hasAnswered, setHasAnswered] = useState(false);

  useEffect(() => {
    fetchQuestions()
      .then(setQuestions)
      .catch(() => console.error("failed to load questions"));
  }, []);

  function selectAnswer(formula: string) {
    if (selectedFormula !== null) return;
    const question = questions.at(currentIndex);
    if (!question) return;

    const choice = question.choices.find((c) => c.formula === formula);
    const correct = choice?.correct === true;

    setSelectedFormula(formula);
    setIsCorrect(correct);
    if (correct) {
      setScore((s) => s + 1);
      setStreak((s) => s + 1);
    } else {
      setStreak(0);
      setWrongCount((w) => w + 1);
    }
    setHasAnswered(true);
  }

  function nextQuestion() {
    setCurrentIndex((i) => i + 1);
    setSelectedFormula(null);
    setIsCorrect(null);
  }

  return {
    currentIndex,
    currentQuestion: questions.at(currentIndex) ?? null,
    isCorrect,
    nextQuestion,
    selectAnswer,
    selectedFormula,
    totalQuestions: questions.length,
    score,
    streak,
    wrongCount,
    hasAnswered,
  };
}

async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch("https://organiqapi.shujaatazim.com/reactions");
  const json = await res.json();
  return json.data;
}
