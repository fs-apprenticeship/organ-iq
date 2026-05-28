"use client";

import { useState } from "react";

import QuestionCard from "@/app/components/question-card";
import { DUMMY_QUESTIONS } from "@/app/hooks/dummy-data";
import ScoreBoard from "@/features/game/components/score-board";
import TurnBar from "@/features/game/components/turn-bar";

export default function GamePage() {
  const [selectedFormula, setSelectedFormula] = useState<null | string>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

  function handleSelect(formula: string) {
    if (selectedFormula != null) return;
    const question = DUMMY_QUESTIONS[0];
    const choice = question.choices.find((c) => c.formula === formula);
    const correct = choice?.correct === true;
    setSelectedFormula(formula);
    setIsCorrect(correct);
  }

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center">
      <div className="w-full">
        <TurnBar />
      </div>

      <div className="w-full max-w-xs mt-8 px-4">
        <ScoreBoard />
      </div>

      <div className="w-full mt-12 px-8 flex gap-6 justify-center">
        <div className="w-full max-w-xl flex flex-col gap-2 rounded-xl border border-gray-700 bg-[#111827]">
          <QuestionCard
            isCorrect={isCorrect}
            onSelect={handleSelect}
            question={DUMMY_QUESTIONS[0]}
            selectedFormula={selectedFormula}
          />

          {selectedFormula !== null && (
            <>
              <div
                className={`px-4 py-3 rounded-lg border text-sm ${
                  isCorrect
                    ? "border-green-700 bg-green-950 text-green-400"
                    : "border-red-700 bg-red-950 text-red-400"
                }`}
                style={{ fontFamily: "'Courier New', Courier, monospace" }}
              >
                {isCorrect ? "Correct" : "Wrong"}
              </div>

              <button
                className={`px-4 py-3 rounded-lg border mt-2 text-sm ${
                  isCorrect
                    ? "border-green-700 bg-green-950 text-green-400"
                    : "border-red-700 bg-red-950 text-red-400"
                }`}
              >
                You got the last question {isCorrect ? "Correct" : "Wrong"}!
                Ready for Next Question
              </button>
            </>
          )}
        </div>

        {/* AI Chatbot placeholder */}
        <div
          className="w-full max-w-sm flex flex-col rounded-xl border border-gray-700 bg-[#111827]"
          style={{ fontFamily: "'Courier New', Courier, monospace" }}
        >
          <div className="px-4 py-3 border-b border-gray-700">
            <span className="text-[10px] uppercase tracking-widest text-green-400">
              AI Tutor
            </span>
          </div>

          <div className="flex-1 px-4 py-6 flex items-center justify-center">
            <p className="text-gray-500 text-sm text-center">
              I am the AI chat bot
            </p>
          </div>

          {/* Can be removed if not needed but included it just incase we allow input */}
          <div className="px-4 py-3 border-t border-gray-700">
            <div className="w-full rounded-lg border border-gray-700 bg-[#0d1117] px-3 py-2 text-sm text-gray-600">
              Ask a question...
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
