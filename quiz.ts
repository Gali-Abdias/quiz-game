// ============================================================
// IMPORTS
// 'readline' is a built-in Node.js module that lets us read
// input from the terminal (keyboard). We import everything
// from it using "import * as name from 'module'"
// ============================================================
import * as readline from "readline";


// ============================================================
// INTERFACES
// An interface defines the SHAPE of an object.
// It says: "any object of this type MUST have these fields"
// TypeScript will give you an error if you miss a field.
// ============================================================
interface Question {
  question: string;                          // the question text
  options: [string, string, string, string]; // exactly 4 choices (TUPLE - fixed length array)
  answer: 0 | 1 | 2 | 3;                    // index of correct option (UNION TYPE - only 0,1,2,3)
}

interface Result {
  question: string;   // the question that was asked
  correct: boolean;   // did the user get it right?
  chosen: string;     // the text of what the user picked
  expected: string;   // the text of the correct answer
}


// ============================================================
// ARRAYS & TYPED DATA
// Question[] means "an array of Question objects"
// Every item must match the Question interface above.
// ============================================================
const questions: Question[] = [
  // --- TypeScript Basics ---
  {
    question: "What does 'TS' stand for in TypeScript?",
    options: ["Type System", "TypeScript", "Typed Script", "Text Style"],
    answer: 1,
  },
  {
    question: "Which company developed TypeScript?",
    options: ["Google", "Meta", "Microsoft", "Apple"],
    answer: 2,
  },
  {
    question: "What is the file extension for TypeScript files?",
    options: [".js", ".tsx", ".ts", ".tp"],
    answer: 2,
  },
  {
    question: "Which keyword declares a constant in TypeScript?",
    options: ["var", "let", "const", "fixed"],
    answer: 2,
  },
  {
    question: "What does TypeScript compile to?",
    options: ["Python", "Java", "Binary", "JavaScript"],
    answer: 3,
  },

  // --- Types & Variables ---
  {
    question: "Which of these is NOT a primitive type in TypeScript?",
    options: ["string", "boolean", "array", "number"],
    answer: 2,
  },
  {
    question: "What type does TypeScript infer for: const x = 42?",
    options: ["any", "object", "number", "integer"],
    answer: 2,
  },
  {
    question: "What does the 'any' type do in TypeScript?",
    options: [
      "Throws an error",
      "Disables type checking for that value",
      "Makes the value null",
      "Converts to string",
    ],
    answer: 1,
  },
  {
    question: "What symbol is used to define a union type?",
    options: ["&", "|", "+", "~"],
    answer: 1,
  },
  {
    question: "What does 'unknown' mean in TypeScript?",
    options: [
      "Same as any",
      "The variable does not exist",
      "A type-safe version of any",
      "An error type",
    ],
    answer: 2,
  },

  // --- Functions ---
  {
    question: "How do you declare a return type on a function in TypeScript?",
    options: [
      "function greet() -> string",
      "function greet(): string",
      "function greet() => string",
      "function greet() as string",
    ],
    answer: 1,
  },
  {
    question: "What return type should a function use when it returns nothing?",
    options: ["null", "empty", "void", "undefined"],
    answer: 2,
  },
  {
    question: "What is a 'generic' in TypeScript?",
    options: [
      "A type that works with any value in a type-safe way",
      "A function with no parameters",
      "A built-in utility type",
      "A default export",
    ],
    answer: 0,
  },

  // --- Interfaces & Classes ---
  {
    question: "What keyword do you use to implement an interface in a class?",
    options: ["extends", "implements", "uses", "inherits"],
    answer: 1,
  },
  {
    question: "What does the 'readonly' keyword do?",
    options: [
      "Makes a property optional",
      "Prevents a property from being changed after assignment",
      "Hides a property from other classes",
      "Makes it available globally",
    ],
    answer: 1,
  },
  {
    question: "What does the '?' symbol mean on an interface property?",
    options: [
      "The property is private",
      "The property is optional",
      "The property is a boolean",
      "The property can be null only",
    ],
    answer: 1,
  },
  {
    question: "What is the difference between 'interface' and 'type' in TypeScript?",
    options: [
      "They are exactly the same",
      "type can use unions, interface can be extended/merged",
      "interface is faster",
      "type only works with primitives",
    ],
    answer: 1,
  },

  // --- Enums & Advanced ---
  {
    question: "What is an enum in TypeScript?",
    options: [
      "A function that enumerates arrays",
      "A list of named constants",
      "A loop construct",
      "A generic constraint",
    ],
    answer: 1,
  },
  {
    question: "What does 'strict: true' do in tsconfig.json?",
    options: [
      "Makes the compiler faster",
      "Enables all strict type-checking options",
      "Disables JavaScript interop",
      "Forces all types to be any",
    ],
    answer: 1,
  },
  {
    question: "What is 'type inference' in TypeScript?",
    options: [
      "Manually writing out all types",
      "TypeScript guessing types automatically from values",
      "Converting JS to TS",
      "A runtime type check",
    ],
    answer: 1,
  },
];


// ============================================================
// READLINE INTERFACE
// We create an interface to talk to the terminal.
// process.stdin  = keyboard input (standard input)
// process.stdout = terminal output (standard output)
// ============================================================
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});


// ============================================================
// PROMISE
// A Promise<T> represents a value that will arrive in the future.
// ask() sends a question to the terminal and WAITS for
// the user to type something and press Enter.
// resolve(answer) = "here is the value, we are done waiting"
// ============================================================
function ask(prompt: string): Promise<string> {
  return new Promise((resolve) => rl.question(prompt, resolve));
}


// ============================================================
// SLEEP UTILITY
// Returns a Promise that resolves after 'ms' milliseconds.
// We use 'await sleep(500)' to pause between questions.
// ============================================================
function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}


// ============================================================
// MAIN GAME FUNCTION
// 'async' means this function can use 'await' inside it.
// 'await' pauses execution until the Promise resolves.
// This lets us write async code that LOOKS like normal code.
// ============================================================
async function runQuiz(): Promise<void> {

  console.log("\n🧠 Welcome to the TypeScript Quiz!");
  console.log(`📋 ${questions.length} questions. Type 1, 2, 3 or 4 to answer.\n`);
  await sleep(800);

  // --------------------------------------------------------
  // TYPED ARRAY
  // Result[] = array of Result objects (our interface above)
  // We start empty and push() into it as we go.
  // --------------------------------------------------------
  const results: Result[] = [];

  // --------------------------------------------------------
  // FOR LOOP with index
  // i goes from 0 to questions.length - 1
  // questions[i] accesses the item at position i
  // --------------------------------------------------------
  for (let i = 0; i < questions.length; i++) {

    const q: Question = questions[i];

    console.log(`\nQ${i + 1} of ${questions.length}: ${q.question}`);

    // -------------------------------------------------------
    // FOREACH with ARROW FUNCTION
    // forEach gives us each item + its index.
    // (opt, idx) => { } is an arrow function.
    // Arrow functions are a short way to write functions.
    // -------------------------------------------------------
    q.options.forEach((opt: string, idx: number) => {
      console.log(`  ${idx + 1}. ${opt}`);
    });

    // -------------------------------------------------------
    // INPUT VALIDATION LOOP
    // We keep asking until the user types a valid number (1-4).
    // parseInt() converts a string like "2" into the number 2.
    // trim() removes any leading/trailing spaces the user typed.
    // -------------------------------------------------------
    let input: string;
    let choice: number;

    while (true) {
      input = await ask("\nYour answer (1-4): ");
      choice = parseInt(input.trim());
      if (choice >= 1 && choice <= 4) break;
      console.log("⚠️  Please enter a number between 1 and 4.");
    }

    // -------------------------------------------------------
    // TYPE ASSERTION  (the 'as' keyword)
    // We KNOW choice-1 will be 0,1,2 or 3 because we validated
    // it above. We use 'as 0|1|2|3' to tell TypeScript that.
    // Without this, TypeScript would say the types don't match.
    // -------------------------------------------------------
    const chosenIndex = (choice - 1) as 0 | 1 | 2 | 3;
    const correct: boolean = chosenIndex === q.answer;

    if (correct) {
      console.log("✅ Correct!");
    } else {
      console.log(`❌ Wrong! The answer was: ${q.options[q.answer]}`);
    }

    // -------------------------------------------------------
    // OBJECT LITERAL + SHORTHAND PROPERTY
    // When the key name matches the variable name you can
    // write just 'correct' instead of 'correct: correct'
    // -------------------------------------------------------
    results.push({
      question: q.question,
      correct,                          // shorthand for correct: correct
      chosen: q.options[chosenIndex],
      expected: q.options[q.answer],
    });

    await sleep(400);
  }

  // ============================================================
  // SUMMARY
  // filter() returns a NEW array keeping only items where the
  // condition is true. (r) => r.correct is an arrow function.
  // .length then counts how many passed the filter.
  // ============================================================
  const score: number = results.filter((r: Result) => r.correct).length;
  const total: number = questions.length;
  const percent: number = Math.round((score / total) * 100);

  console.log("\n=============================");
  console.log(`🏁 Quiz done! Score: ${score}/${total} (${percent}%)`);

  // if / else if / else chain
  if (percent === 100) {
    console.log("🏆 Perfect! You are a TypeScript master!");
  } else if (percent >= 80) {
    console.log("🎉 Excellent work! Almost perfect!");
  } else if (percent >= 60) {
    console.log("👍 Good job! Keep practicing!");
  } else {
    console.log("📚 Keep learning, you will get there!");
  }

  // --------------------------------------------------------
  // SHOW WRONG ANSWERS
  // '!' before a boolean means NOT — so !r.correct = wrong answer
  // Template literal uses backticks ` ` and ${} for variables
  // --------------------------------------------------------
  const wrong = results.filter((r: Result) => !r.correct);
  if (wrong.length > 0) {
    console.log("\n📝 Questions you missed:");
    wrong.forEach((r: Result, i: number) => {
      console.log(`  ${i + 1}. ${r.question}`);
      console.log(`     You answered:  ${r.chosen}`);
      console.log(`     Correct answer: ${r.expected}`);
    });
  }

  console.log("=============================\n");

  // Close readline so the program exits cleanly
  rl.close();
}


// ============================================================
// ENTRY POINT
// This line actually RUNS the quiz.
// Everything above just defines things - nothing runs
// until we call runQuiz() here at the bottom.
// ============================================================
runQuiz();