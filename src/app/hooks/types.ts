export type Question = {
  choices: Choice[];
  classification: string;
  created_at: string;
  difficulty: "easy" | "hard" | "medium";
  formula: string;
  id: number;
  updated_at: string;
};

type Choice = {
  correct: boolean;
  formula: string;
};

//  type GameStatus =
//   | "answered"
//   | "complete"
//   | "error"
//   | "loading"
//   | "playing";

// type PlayAnswer = {
//   answer_at: number;
//   correct: boolean;
//   question_id: number;
//   selected_formula: string;
// };
