export interface Quiz {
  response_code: number;
  results: Question[];
}

export interface Question {
  category: string;
  type: string;
  difficulty: string;
  question: string;
  correct_answer: string;
  incorrect_answers: string[];
}

export interface QuestionToShow extends Question {
  answers?: string[];
  user_anser?: string;
  point?: number;
}
