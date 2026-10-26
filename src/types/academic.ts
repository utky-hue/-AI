export type ClassGrade =
  | 'Class 1-3 (Elementary)'
  | 'Class 4-5 (Upper Elementary)'
  | 'Class 6 (Middle)'
  | 'Class 7 (Middle)'
  | 'Class 8 (Middle)'
  | 'Class 9 (High School)'
  | 'Class 10 (High School / Board)'
  | 'Class 11 (Senior Secondary)'
  | 'Class 12 (Senior Secondary / Board)'
  | 'College / University / Olympiad';

export type AcademicSubject =
  | 'Mathematics'
  | 'Physics'
  | 'Chemistry'
  | 'Biology'
  | 'General Science'
  | 'History & Civics'
  | 'Geography & Environment'
  | 'English & Literature'
  | 'Computer Science & Coding'
  | 'Economics & Commerce'
  | 'Other / Any Subject';

export interface SolutionPhaseSubStage {
  stageNumber: string;
  title: string;
  derivationText: string;
  formulaHighlight?: string;
}

export interface SolutionPhase {
  phaseTitle: string; // e.g. "Phase 1: Constant Polynomials (Degree 0)"
  introText: string;
  equations?: string[];
  subStages?: SolutionPhaseSubStage[];
  bulletFindings?: string[];
}

export interface SolutionTableRow {
  caseName: string;
  foundSolutions: string;
}

export interface QuestionSolution {
  id: string;
  question: string;
  classGrade: string;
  subject: string;
  directAnswer: string;
  simpleIntuition: string; // 2-minute grasp
  phases: SolutionPhase[];
  solutionTable?: {
    headers: string[];
    rows: SolutionTableRow[];
  };
  finalConclusion: string;
  keyRulesOrConcepts?: string[];
  commonMistakes?: string[];
  practiceQuestion?: {
    question: string;
    hint: string;
    solution: string;
  };
  createdAt: string;
}

export interface ProjectMilestone {
  dayNumber: number;
  dayLabel: string;
  title: string;
  tasks: Array<{
    id: string;
    task: string;
    details: string;
    parentOrStudyTip: string;
    completed: boolean;
  }>;
  deliverable: string;
}

export interface ProjectSlide {
  slideNumber: number;
  title: string;
  headline: string;
  bulletPoints: string[];
  visualIdea: string;
  spokenNotes: string;
}

export interface ProjectPosterSection {
  panel: 'Left (Origins & Question)' | 'Center (Heart of Project)' | 'Right (Results & Impact)';
  heading: string;
  content: string;
  visualGraphic: string;
}

export interface ProjectMaterial {
  item: string;
  category: 'Everyday Household' | 'Craft & Stationer' | 'Hardware/Tech' | 'Digital';
  substitute: string;
  checked?: boolean;
}

export interface ProjectDesign {
  id: string;
  title: string;
  classGrade: string;
  subject: string;
  projectType: 'Working Model / Science Fair' | 'Presentation Slide Deck' | 'Research Report' | 'Poster / Diorama' | 'Interactive App/Demo';
  drivingQuestion: string;
  coreHypothesisOrThesis: string;
  overview: string;
  milestones: ProjectMilestone[];
  slides: ProjectSlide[];
  posterLayout: ProjectPosterSection[];
  materials: ProjectMaterial[];
  rubric: Array<{
    criterion: string;
    howToScoreFullMarks: string;
    avoidMistake: string;
  }>;
  speechFlashcards: Array<{
    question: string;
    idealAnswer: string;
  }>;
  citations: string[];
  createdAt: string;
}
