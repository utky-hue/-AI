export type GradeLevel =
  | '3rd Grade'
  | '4th Grade'
  | '5th Grade'
  | '6th Grade'
  | '7th Grade'
  | '8th Grade'
  | '9th Grade'
  | '10th Grade'
  | '11th Grade'
  | '12th Grade'
  | 'College / AP';

export type ProjectSubject =
  | 'Science & STEM'
  | 'Social Studies & History'
  | 'English & Literature'
  | 'Math & Data'
  | 'Art & Design'
  | 'General / Interdisciplinary';

export type ProjectTimelineOption = '3-Day Rapid Sprint' | '5-Day Standard Week' | '2-Week Deep Dive';

export type OutputFocus = 'all' | 'blueprint' | 'slides' | 'trifold' | 'flashcards';

export interface TaskItem {
  id: string;
  task: string;
  details: string;
  parentTip: string;
  completed: boolean;
}

export interface DayMilestone {
  dayNumber: number;
  dayLabel: string;
  title: string;
  focus: string;
  estimatedMinutes: number;
  tasks: TaskItem[];
  checkpointQuestion: string;
}

export interface SlideItem {
  slideNumber: number;
  title: string;
  headline: string;
  keyBullets: string[];
  visualSuggestion: string;
  speakerNotes: string;
}

export interface TrifoldSection {
  heading: string;
  content: string;
  visualType: string;
}

export interface TrifoldPoster {
  leftPanel: {
    title: string;
    sections: TrifoldSection[];
  };
  centerPanel: {
    title: string;
    headline: string;
    sections: TrifoldSection[];
  };
  rightPanel: {
    title: string;
    sections: TrifoldSection[];
  };
}

export interface MaterialItem {
  item: string;
  category: 'Household' | 'Craft / Hardware' | 'Digital / Printable' | 'Reference';
  isEssential: boolean;
  freeAlternative: string;
  checked?: boolean;
}

export interface RubricCriterion {
  criterion: string;
  weight: string;
  exemplaryGuide: string;
  commonPitfalls: string;
}

export interface PracticeFlashcard {
  id: string;
  question: string;
  modelAnswer: string;
  difficulty: 'Warm-up' | 'Deep Dive' | 'Tough Question';
}

export interface StarterSource {
  title: string;
  authorOrOrg: string;
  mlaCitation: string;
  type: string;
  annotation: string;
}

export interface ParentCoachingGuide {
  howToSupport: string[];
  whatToAvoid: string[];
  encouragementPrompt: string;
}

export interface ProjectBlueprint {
  id: string;
  title: string;
  tagline: string;
  gradeLevel: string;
  subject: ProjectSubject;
  timelineType: ProjectTimelineOption;
  drivingQuestion: string;
  hypothesisOrThesis: string;
  summary: string;
  learningGoals: string[];
  milestones: DayMilestone[];
  presentationDeck: SlideItem[];
  trifoldPoster: TrifoldPoster;
  materials: MaterialItem[];
  rubric: RubricCriterion[];
  practiceFlashcards: PracticeFlashcard[];
  starterSources: StarterSource[];
  parentGuide: ParentCoachingGuide;
  createdAt: string;
}
