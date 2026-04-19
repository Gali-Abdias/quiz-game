import * as readline from "readline";

// --- Types ---
interface Question {
  question: string;
  options: [string, string, string, string];
  answer: 0 | 1 | 2 | 3;
}

interface Result {
  question: string;
  correct: boolean;
  chosen: string;
  expected: string;
}