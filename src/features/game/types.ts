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
