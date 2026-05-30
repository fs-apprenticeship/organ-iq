import { useEffect, useState } from "react";
import { Question } from "../types";

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFormula, setSelectedFormula] = useState<null | string>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuestions()
      .then(setQuestions)
      .catch(() => console.error("failed to load questions"));
  }, []);

  function selectAnswer(formula: string) {
    if (selectedFormula !== null) return;
    // eslint-disable-next-line security/detect-object-injection
    const question = questions[currentIndex];
    if (!question) return;

    const choice = question.choices.find((c) => c.formula === formula);
    const correct = choice?.correct === true;
    setSelectedFormula(formula);
    setIsCorrect(choice?.correct === true);
    if (correct) setScore((s) => s + 1);
  }

  function nextQuestion() {
    setCurrentIndex((i) => i + 1);
    setSelectedFormula(null);
    setIsCorrect(null);
  }
  return {
    currentIndex,
    // eslint-disable-next-line security/detect-object-injection
    currentQuestion: questions[currentIndex] ?? null,
    isCorrect,
    nextQuestion,
    selectAnswer,
    selectedFormula,
    totalQuestions: questions.length,
    score,
  };
}

async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch("/api/questions");
  const json = await res.json();
  return json;
}
