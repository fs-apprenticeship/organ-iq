"use client";

import QuestionCard from "@/features/game/components/question-card";
import ScoreBoard from "@/features/game/components/score-board";
import TurnBar from "@/features/game/components/turn-bar";
import AITutor from "@/features/game/components/ai-tutor";
import { useQuestions } from "../../features/game/hooks/use-questions";

export default function GamePage() {
  const {
    currentQuestion,
    isCorrect,
    nextQuestion,
    score,
    selectAnswer,
    selectedFormula,
    currentIndex,
    totalQuestions,
  } = useQuestions();

  const isGameComplete = currentIndex >= totalQuestions && totalQuestions > 0;

  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col items-center">
      {/* Turn Bar */}
      <div className="w-full">
        <TurnBar />
      </div>

      {/* Score Board */}
      <div className="w-full max-w-xs mt-8 px-4">
        <ScoreBoard score={score} />
      </div>

      {/* Question Card + AI Tutor */}
      <div className="w-full mt-12 px-8 flex gap-6 justify-center">
        {/* Question Card (Left Side) */}
        <div className="w-full max-w-xl flex flex-col gap-2 rounded-xl border border-gray-700 bg-[#111827]">
          {isGameComplete ? (
            <div className="flex flex-col items-center justify-center p-12 gap-4">
              <h2 className="text-2xl font-bold tracking-widest uppercase text-green-400">
                Great Job!
              </h2>
              <p className="text-gray-400 text-sm">
                You scored {score} out of {totalQuestions}
              </p>
            </div>
          ) : currentQuestion === null ? (
            <p className="text-gray-500 text-sm p-6">Loading...</p>
          ) : (
            <QuestionCard
              question={currentQuestion}
              selectedFormula={selectedFormula}
              isCorrect={isCorrect}
              onSelect={selectAnswer}
            />
          )}

          {selectedFormula !== null && !isGameComplete && (
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
                onClick={nextQuestion}
                className={`px-4 py-3 rounded-lg border mt-2 text-sm ${
                  isCorrect
                    ? "border-green-700 bg-green-950 text-green-400"
                    : "border-red-700 bg-red-950 text-red-400"
                }`}
              >
                Ready for Next Question
              </button>
            </>
          )}
        </div>

        {/* AI TUTOR */}
        <AITutor
          systemPrompt="You are an expert AI Tutor for Organ IQ. Help users understand biology, anatomy, and medical concepts clearly. Be concise and encouraging."
          height="620px"
        />
      </div>
    </div>
  );
}