import { useEffect, useState } from "react";
import { Question } from "./types";

export function useQuestions() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedFormula, setSelectedFormula] = useState<null | string>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  useEffect(() => {
    fetchQuestions().then(setQuestions);
  }, []);

  function selectAnswer(formula: string) {
    if (selectedFormula !== null) return;
    // eslint-disable-next-line security/detect-object-injection
    const choice = questions[currentIndex].choices.find(
      (c) => c.formula === formula,
    );
    setSelectedFormula(formula);
    setIsCorrect(choice?.correct === true);
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
  };
}

async function fetchQuestions(): Promise<Question[]> {
  const res = await fetch("/api/questions");
  const json = await res.json();
  return json.data;
  console.log(json.data);
}
