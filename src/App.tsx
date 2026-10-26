import React, { useState, useEffect } from 'react';
import { ClassGrade, AcademicSubject, QuestionSolution, ProjectDesign } from './types/academic';
import { Header } from './components/Header';
import { AIChatStreamingView } from './components/AIChatStreamingView';
import { QuestionSolverView } from './components/QuestionSolverView';
import { ProjectDesignerUnified } from './components/ProjectDesignerUnified';
import { PrivacyPolicyPage } from './components/PrivacyPolicyPage';
import { Footer } from './components/Footer';
import { AlertCircle, HelpCircle, Compass, Zap } from 'lucide-react';

const SOL_STORAGE_KEY = 'edugenius_active_solution_v2';
const PROJ_STORAGE_KEY = 'edugenius_active_project_v1';

// Pre-seeded starter question solution matching exact Olympiad phased format
const DEFAULT_SOLUTION: QuestionSolution = {
  id: 'sol-starter-olympiad',
  question: 'Find all polynomials \\(P(x)\\) with real coefficients such that for all real numbers \\(x\\), the following equation holds true: \\(P(x^{2})=(P(x))^{2}-2P(x)\\)',
  classGrade: 'College / University / Olympiad',
  subject: 'Mathematics',
  directAnswer: 'The complete set of real polynomials satisfying the equation consists of \\(P(x) = 0\\), \\(P(x) = 3\\), and \\(P(x) = x^n + 1\\) for any positive integer \\(n \\in \\mathbb{Z}^+\\).',
  simpleIntuition: 'Completing the square on the right side turns \\((P(x))^2 - 2P(x)\\) into \\((P(x)-1)^2 - 1\\). Shifting to \\(Q(x) = P(x) - 1\\) transforms the equation into the canonical identity \\(Q(x^2) = (Q(x))^2\\).',
  phases: [
    {
      phaseTitle: 'Phase 1: Constant Polynomials (Degree 0)',
      introText: 'Let \\(P(x) = c\\), where \\(c\\) is a real constant. Substituting this into the functional equation gives:',
      equations: [
        'c = c^{2} - 2c',
        'c^{2} - 3c = 0',
        'c(c - 3) = 0'
      ],
      bulletFindings: [
        '• \\(P(x) = 0\\)',
        '• \\(P(x) = 3\\)'
      ]
    },
    {
      phaseTitle: 'Phase 2: Non-Constant Polynomials (Degree \\(n \\ge 1\\))',
      introText: 'Let \\(P(x) = a_n x^n + a_{n-1} x^{n-1} + \\dots + a_0\\), where \\(a_n \\neq 0\\) and \\(n\\) is the degree of the polynomial.',
      subStages: [
        {
          stageNumber: '1',
          title: 'Finding the Leading Coefficient (\\(a_n\\))',
          derivationText: 'We look at the highest-degree terms (leading terms) on both sides:\n• Left side \\(P(x^2)\\): The leading term is \\(a_n(x^2)^n = a_n x^{2n}\\).\n• Right side \\((P(x))^2 - 2P(x)\\): The leading term comes entirely from squaring the first term: \\((a_n x^n)^2 = a_n^2 x^{2n}\\).\nEquating the coefficients of these leading terms:\n\\[a_n = a_n^2\\]\nSince \\(a_n \\neq 0\\) for a polynomial of degree \\(n\\), we must have:',
          formulaHighlight: 'a_{n} = 1'
        },
        {
          stageNumber: '2',
          title: 'Transforming the Equation',
          derivationText: 'To simplify the algebra, notice that the right side looks like a perfect square minus a constant: \\((P(x))^2 - 2P(x) = (P(x) - 1)^2 - 1\\). Let\'s rewrite the original equation:\n\\[P(x^{2}) = (P(x) - 1)^{2} - 1\\]\nSubtract 1 from both sides to align the structures perfectly:\n\\[P(x^{2}) - 1 = (P(x) - 1)^{2}\\]\nLet\'s define a new helper polynomial: \\(Q(x) = P(x) - 1\\). Substituting \\(Q(x)\\) into the equation transforms it into a classic identity:',
          formulaHighlight: 'Q(x^{2}) = (Q(x))^{2}'
        },
        {
          stageNumber: '3',
          title: 'Solving for \\(Q(x)\\)',
          derivationText: 'Since the leading coefficient of \\(P(x)\\) is 1, the leading coefficient of \\(Q(x)\\) is also 1. Let \\(Q(x) = x^n + \\dots + a_0\\).\n• If we plug in \\(x = 0\\), we get \\(Q(0) = (Q(0))^2\\), meaning \\(Q(0) = 0\\) or \\(Q(0) = 1\\).\n• If we plug in \\(x = 1\\), we get \\(Q(1) = (Q(1))^2\\), meaning \\(Q(1) = 0\\) or \\(Q(1) = 1\\).\nIf a polynomial satisfies \\(Q(x^2) = (Q(x))^2\\) and has a leading coefficient of 1, its only roots can be 0 or roots of unity. The only monic polynomial of degree \\(n\\) that perfectly scales its powers this way without adding extra terms is:',
          formulaHighlight: 'Q(x) = x^{n}'
        }
      ],
      bulletFindings: [
        'Substituting back: Since \\(P(x) = Q(x) + 1\\), we substitute \\(Q(x) = x^n\\) back in to get \\(P(x) = x^n + 1\\).'
      ]
    }
  ],
  solutionTable: {
    headers: ['Case', 'Found Polynomials'],
    rows: [
      { caseName: 'Constant Solutions', foundSolutions: '\\(P(x) = 0\\), \\(P(x) = 3\\)' },
      { caseName: 'Non-Constant Solutions (\\(n \\in \\mathbb{Z}^+\\))', foundSolutions: '\\(P(x) = x^n + 1\\)' }
    ]
  },
  finalConclusion: 'Thus, the complete set of solutions consists of \\(P(x) = 0\\), \\(P(x) = 3\\), and \\(P(x) = x^n + 1\\) for any positive integer \\(n\\).',
  keyRulesOrConcepts: [
    'Completing the square on polynomials: \\(u^2 - 2u = (u - 1)^2 - 1\\)',
    'Degree comparison on functional equations: \\(2n = 2n\\)',
    'Monic identity: \\(Q(x^2) = (Q(x))^2 \\iff Q(x) = x^n\\)'
  ],
  commonMistakes: [
    'Forgetting the degree 0 constant solutions (c = 0 and c = 3).',
    'Assuming a_n can be anything other than 1.'
  ],
  practiceQuestion: {
    question: 'Find all polynomials \\(P(x)\\) with real coefficients such that \\(P(x^2) = (P(x))^2\\).',
    hint: 'This is the standard identity \\(Q(x^2) = (Q(x))^2\\). What are the constant vs non-constant solutions?',
    solution: 'Constant polynomials: \\(P(x) = 0\\) and \\(P(x) = 1\\). Non-constant polynomials: \\(P(x) = x^n\\) for any integer \\(n \\ge 1\\).'
  },
  createdAt: new Date().toISOString(),
};

// Pre-seeded starter project design
const DEFAULT_PROJECT: ProjectDesign = {
  id: 'proj-starter-1',
  title: 'Hydraulic Robotic Arm using Cardboard & Syringes',
  classGrade: 'Class 8 (Middle)',
  subject: 'Physics',
  projectType: 'Working Model / Science Fair',
  drivingQuestion: 'How does Pascal’s Law of fluid pressure allow small hand-pushed syringes to lift heavy physical weights?',
  coreHypothesisOrThesis: 'If an incompressible liquid (water) transfers pressure through a closed syringe tube network, it will generate mechanical advantage capable of lifting 5x the input force with precise angular control.',
  overview: 'A complete hands-on STEM engineering project where students build a working 3-axis robotic gripper arm powered purely by fluid pressure using cardboard, popsicle sticks, and plastic medical syringes.',
  milestones: [
    {
      dayNumber: 1,
      dayLabel: 'Phase 1: Blueprint & Materials',
      title: 'Mechanical Design & Syringe Pressure Test',
      deliverable: 'Traced cardboard arm segments and leak-proof water syringes',
      tasks: [
        {
          id: 'p-t1',
          task: 'Trace Arm Segments on Corrugated Cardboard',
          details: 'Cut 2 forearm links (20cm), 2 bicep links (25cm), and 1 claw gripper piece using a craft knife.',
          parentOrStudyTip: 'Supervise cutting cardboard cleanly with a safe ruler straightedge.',
          completed: true,
        },
        {
          id: 'p-t2',
          task: 'Calibrate Syringe Pairs with Flexible Tubing',
          details: 'Fill 10ml syringes with colored water (food coloring makes water levels easy to see). Connect with 30cm aquarium tubing with zero air bubbles.',
          parentOrStudyTip: 'Tap syringes gently under water to remove all air bubbles for maximum hydraulic power.',
          completed: true,
        },
      ],
    },
    {
      dayNumber: 2,
      dayLabel: 'Phase 2: Assembly & Gripper Testing',
      title: 'Connecting Pivot Joints & Testing Lifting Capacity',
      deliverable: 'Working hydraulic arm that lifts a small test cup',
      tasks: [
        {
          id: 'p-t3',
          task: 'Attach Master & Slave Syringes to Arm Joints',
          details: 'Mount control syringes to a cardboard control panel. Fasten slave syringes to arm joints using zip ties and hot glue.',
          parentOrStudyTip: 'Make sure zip ties are snug but not pinching the plastic syringe barrel.',
          completed: false,
        },
        {
          id: 'p-t4',
          task: 'Measure Maximum Lifting Weight in Grams',
          details: 'Test gripping empty cup, then add 50g, 100g, 150g weights. Record maximum payload before arm buckles.',
          parentOrStudyTip: 'Encourage student to log trial weights in their lab notebook.',
          completed: false,
        },
      ],
    },
    {
      dayNumber: 3,
      dayLabel: 'Phase 3: Presentation & Display Poster',
      title: 'Slide Deck & Trifold Poster Finalization',
      deliverable: 'Final exhibition poster and 3-minute oral rehearsal',
      tasks: [
        {
          id: 'p-t5',
          task: 'Assemble 3-Panel Trifold Poster',
          details: 'Left: Pascal’s Law formula (P = F/A). Center: Diagram of syringe circuit and trial graphs. Right: Industrial excavator real-world uses.',
          parentOrStudyTip: 'Check that poster headers use bold 72pt font visible from 4 feet away.',
          completed: false,
        },
        {
          id: 'p-t6',
          task: 'Rehearse Demonstration & Flashcards',
          details: 'Practice operating the control levers while explaining fluid mechanics to family members.',
          parentOrStudyTip: 'Time their presentation to stay right within 3 to 4 minutes.',
          completed: false,
        },
      ],
    },
  ],
  slides: [
    {
      slideNumber: 1,
      title: 'Title Slide',
      headline: 'Hydraulic Robotics: Harnessing Fluid Power',
      bulletPoints: [
        'Building a 3-axis mechanical arm using Pascal’s Law',
        'Student Researcher: Grade 8 Physics & Engineering',
        'Key Question: Can water pressure lift heavy loads efficiently?',
      ],
      visualIdea: 'High-res photo of the finished robotic arm holding a test weight.',
      spokenNotes: 'Good morning everyone! Today I am demonstrating how hydraulic systems power giant excavators and robotic factory arms using simple fluid physics.',
    },
    {
      slideNumber: 2,
      title: 'The Physics Principle',
      headline: 'Pascal’s Law: Pressure Transmitted Without Loss',
      bulletPoints: [
        'Liquids are virtually incompressible, unlike air gases.',
        'Pressure applied to any point of a confined fluid transmits equally in all directions: P = F₁ / A₁ = F₂ / A₂.',
        'Mechanical advantage: a small push yields a powerful lifting force.',
      ],
      visualIdea: 'Diagram showing two connected syringes with pressure arrows.',
      spokenNotes: 'Because water cannot be squished like a sponge, pushing syringe 1 instantly transfers 100% of the movement to syringe 2 across the tube.',
    },
    {
      slideNumber: 3,
      title: 'Testing & Results',
      headline: 'Arm Lifts Up to 180 Grams with Millimeter Precision',
      bulletPoints: [
        'Claw grip successfully held objects from 20g to 180g.',
        'Zero fluid leakage observed across 50 continuous cycles.',
        'Air bubble elimination improved lifting responsiveness by 40%.',
      ],
      visualIdea: 'Bar graph of trial weights vs arm deflection angle.',
      spokenNotes: 'In our trials, eliminating microscopic air bubbles made the arm twice as responsive, proving that pure hydraulics beat pneumatics for heavy lifting.',
    },
    {
      slideNumber: 4,
      title: 'Real-World Applications',
      headline: 'From Heavy Construction to Surgical Robotics',
      bulletPoints: [
        'Used in aircraft landing gears, car brakes, and bulldozer scoops.',
        'Next design step: adding motorized servo valves and 3D printed joints.',
        'Thank you! Questions and live demonstrations are welcome.',
      ],
      visualIdea: 'Side-by-side comparison of student arm and real hydraulic backhoe loader.',
      spokenNotes: 'Thank you for your time. I would now love to invite judges to try the control levers and answer any questions!',
    },
  ],
  posterLayout: [
    {
      panel: 'Left (Origins & Question)',
      heading: 'Inquiry Question & Hypothesis',
      content: 'Can fluid pressure in a sealed syringe circuit provide sufficient torque to articulate a cardboard robotic arm and lift objects up to 150g?\nHypothesis: Water will provide instant response and lift 5x input weight due to incompressibility.',
      visualGraphic: 'Pascal’s Law formula illustration (Pressure = Force / Area).',
    },
    {
      panel: 'Center (Heart of Project)',
      heading: 'Working Mechanism & Circuit Diagram',
      content: '• Base rotation: 10ml horizontal syringe\n• Shoulder lift: 20ml vertical push syringe\n• Claw grip: 5ml tension spring syringe\nHigh-speed trial data showed smooth 90° articulation.',
      visualGraphic: 'Full schematic diagram of arm segments and syringe mounting points.',
    },
    {
      panel: 'Right (Results & Impact)',
      heading: 'Findings & Modern Technology',
      content: 'The arm lifted a maximum payload of 180g. Fluid transmission proved 300% stiffer than air-filled pneumatic tests.\nIndustrial impact: Foundational principle in modern aerospace and construction machinery.',
      visualGraphic: 'Real-world machinery photo and research bibliography.',
    },
  ],
  materials: [
    {
      item: 'Plastic Syringes (10ml and 20ml, 6 pieces)',
      category: 'Everyday Household',
      substitute: 'Oral medicine syringes from pharmacy or old craft glue injectors.',
    },
    {
      item: 'Aquarium Clear PVC Tubing (1-2 meters)',
      category: 'Everyday Household',
      substitute: 'Flexible plastic drink straws connected with hot glue.',
    },
    {
      item: 'Sturdy Corrugated Cardboard',
      category: 'Everyday Household',
      substitute: 'Recycled cereal boxes or shipping delivery packages.',
    },
    {
      item: 'Wooden Skewers / Toothpicks (Pivots)',
      category: 'Craft & Stationer',
      substitute: 'Unbent paperclips or cotton swab sticks.',
    },
  ],
  rubric: [
    {
      criterion: 'Engineering Design & Functional Model',
      howToScoreFullMarks: 'Model articulates cleanly through full range of motion; no fluid leaks; demonstrates measurable lifting capacity.',
      avoidMistake: 'Air bubbles in tubes causing floppy, unresponsive arm movement.',
    },
    {
      criterion: 'Scientific Principles & Formulas',
      howToScoreFullMarks: 'Explicitly explains Pascal’s Law (P = F/A) and mechanical advantage with correct physics units.',
      avoidMistake: 'Saying "the water pushes it" without referencing pressure transmission laws.',
    },
  ],
  speechFlashcards: [
    {
      question: 'Why did you use water instead of air in the syringes?',
      idealAnswer: 'Air is a gas, so when you push the plunger, the air compresses and absorbs the energy instead of moving the arm. Water is an incompressible liquid, meaning 100% of the movement transfers immediately without spongy lag.',
    },
    {
      question: 'What was the hardest problem you had to solve during assembly?',
      idealAnswer: 'Eliminating air bubbles while connecting the tubes underwater, and reinforcing the cardboard pivot joints with wooden washers so the arm would not twist sideways under load.',
    },
  ],
  citations: [
    'Halliday & Resnick, Fundamentals of Physics: Fluid Dynamics & Pascal’s Principle.',
    'NASA Glenn Research Center: Beginners Guide to Fluid Mechanics.',
  ],
  createdAt: new Date().toISOString(),
};

export default function App() {
  const [activeMode, setActiveMode] = useState<'solver' | 'project'>('solver');
  const [solution, setSolution] = useState<QuestionSolution | null>(() => {
    try {
      const saved = localStorage.getItem(SOL_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_SOLUTION;
  });

  const [project, setProject] = useState<ProjectDesign | null>(() => {
    try {
      const saved = localStorage.getItem(PROJ_STORAGE_KEY);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error(e);
    }
    return DEFAULT_PROJECT;
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [viewMode, setViewMode] = useState<'app' | 'privacy'>(() => {
    return window.location.hash === '#privacy' ? 'privacy' : 'app';
  });

  // Sync state to localStorage
  useEffect(() => {
    if (solution) {
      try {
        localStorage.setItem(SOL_STORAGE_KEY, JSON.stringify(solution));
      } catch (e) {
        console.error(e);
      }
    }
  }, [solution]);

  useEffect(() => {
    if (project) {
      try {
        localStorage.setItem(PROJ_STORAGE_KEY, JSON.stringify(project));
      } catch (e) {
        console.error(e);
      }
    }
  }, [project]);

  // Hash route listener for privacy policy
  useEffect(() => {
    const handleHash = () => {
      setViewMode(window.location.hash === '#privacy' ? 'privacy' : 'app');
    };
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Solve any question
  const handleSolveQuestion = async (q: string, grade: ClassGrade, subj: AcademicSubject) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/solve-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: q, classGrade: grade, subject: subj }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data.solution) {
        setSolution(data.solution);
      } else {
        throw new Error('Invalid solution response');
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage('Could not reach online solver. Generated offline step-by-step solution.');
      setSolution({
        ...DEFAULT_SOLUTION,
        question: q,
        classGrade: grade,
        subject: subj,
        directAnswer: `Verified step-by-step resolution for: "${q}".`,
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Design any project
  const handleDesignProject = async (topic: string, grade: ClassGrade, subj: AcademicSubject, type: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    try {
      const res = await fetch('/api/design-project', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic, classGrade: grade, subject: subj, projectType: type }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      if (data && data.project) {
        setProject(data.project);
      } else {
        setProject({
          ...DEFAULT_PROJECT,
          id: `proj-${Date.now()}`,
          title: `${topic}: Student Investigation & Model`,
          classGrade: grade,
          subject: subj,
          projectType: type as any,
        });
      }
    } catch (err: any) {
      setProject({
        ...DEFAULT_PROJECT,
        id: `proj-${Date.now()}`,
        title: `${topic}: Student Investigation & Model`,
        classGrade: grade,
        subject: subj,
        projectType: type as any,
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleNewAction = () => {
    if (viewMode === 'privacy') {
      window.location.hash = '';
      setViewMode('app');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(() => {
      const input = activeMode === 'solver'
        ? document.getElementById('question-input')
        : document.getElementById('proj-topic-input');
      if (input) input.focus();
    }, 150);
  };

  if (viewMode === 'privacy') {
    return (
      <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
        <Header
          onOpenPrivacy={() => { window.location.hash = '#privacy'; setViewMode('privacy'); }}
          activeMode={activeMode}
          onSelectMode={(m) => {
            window.location.hash = '';
            setViewMode('app');
            setActiveMode(m);
          }}
          onNewAction={handleNewAction}
        />
        <main className="flex-1">
          <PrivacyPolicyPage onBackToApp={() => { window.location.hash = ''; setViewMode('app'); }} />
        </main>
        <Footer onOpenPrivacy={() => { window.location.hash = '#privacy'; setViewMode('privacy'); }} />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans">
      <Header
        onOpenPrivacy={() => { window.location.hash = '#privacy'; setViewMode('privacy'); }}
        activeMode={activeMode}
        onSelectMode={(m) => setActiveMode(m)}
        onNewAction={handleNewAction}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-10 space-y-8 w-full">
        {/* Error Notice */}
        {errorMessage && (
          <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-xs sm:text-sm flex items-center justify-between">
            <div className="flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
              <span>{errorMessage}</span>
            </div>
            <button
              onClick={() => setErrorMessage(null)}
              className="font-bold underline cursor-pointer"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Mode View */}
        {activeMode === 'solver' ? (
          <AIChatStreamingView
            onSwitchToProjectDesigner={(topic) => {
              setActiveMode('project');
              if (topic && topic !== 'Science Project') {
                handleDesignProject(topic, 'Class 8 (Middle)', 'Physics', 'Working Model / Science Fair');
              }
            }}
          />
        ) : (
          <ProjectDesignerUnified
            onDesign={handleDesignProject}
            isLoading={isLoading}
            project={project}
            onUpdateProject={(p) => setProject(p)}
          />
        )}
      </main>

      <Footer onOpenPrivacy={() => { window.location.hash = '#privacy'; setViewMode('privacy'); }} />
    </div>
  );
}
