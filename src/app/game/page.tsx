// app/game/page.tsx
"use client";
import { useState } from "react";

import QuestionCard from "@/app/components/question-card";
import { DUMMY_QUESTIONS } from "@/app/hooks/dummy-data";

export default function GamePage() {
  const [selectedFormula, setSelectedFormuala] = useState<null | string>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  function handleSelect(formula: string) {
    if (selectedFormula != null) return;

    const question = DUMMY_QUESTIONS[0];
    const choice = question.choices.find((c) => c.formula === formula);
    const correct = choice?.correct === true;

    setSelectedFormuala(formula);
    setIsCorrect(correct);
    console.log("Player selected:", formula, "| Correct:", correct); // just log it for now
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-8">
      <div className="w-full max-w-xl">
        <QuestionCard
          isCorrect={isCorrect}
          onSelect={handleSelect}
          question={DUMMY_QUESTIONS[0]}
          selectedFormula={selectedFormula}
        />
        {selectedFormula !== null && (
          <div
            className={`px-4 py-3 rounded-lg border text-sm ${isCorrect ? "border-green-700 bg-green-950 text-green-400" : "border-red-700 bg-red-950 text-red-400"}`}
            style={{ fontFamily: "'Courier New', Courier, monospace" }}
          >
            {isCorrect ? "Correct" : "Wrong"}
          </div>
        )}
      </div>
    </div>
  );
}
