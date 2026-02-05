export interface Exercise {
  id: string;
  type: 'qcm' | 'drag-drop' | 'fill-blank' | 'matching' | 'ordering' | 'true-false' | 'code-complete';
  question: string;
  options?: string[];
  correctAnswer: string | string[] | number | number[];
  explanation: string;
  pairs?: { left: string; right: string }[];
  items?: string[];
  blanks?: { text: string; answer: string }[];
  difficulty: 'easy' | 'medium' | 'hard';
}

export interface Section {
  id: string;
  title: string;
  content: string;
  keyPoints?: string[];
  exercises: Exercise[];
  tip?: string;
  example?: {
    title: string;
    content: string;
  };
}

export interface Chapter {
  id: string;
  title: string;
  description: string;
  sections: Section[];
  icon: string;
  color: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  chapters: Chapter[];
  createdAt: string;
  thumbnail?: string;
}

export interface UserProgress {
  id: string;
  user_id: string;
  course_id: string;
  chapter_id: string;
  section_id: string;
  completed: boolean;
  completed_at: string | null;
}

export interface ExerciseResult {
  id: string;
  user_id: string;
  course_id: string;
  chapter_id: string;
  section_id: string;
  exercise_id: string;
  score: number;
  max_score: number;
  attempts: number;
  last_attempt: string;
}

export interface Profile {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
}
