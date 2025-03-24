import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  component: string;
}

interface TutorialState {
  currentStep: number;
  totalSteps: number;
  completedSteps: string[];
  steps: TutorialStep[];
  isCompleted: boolean;
  isLoading: boolean;
  nextStep: () => void;
  setCurrentStep: (step: number) => void;
  completeStep: (stepId: string) => void;
  resetTutorial: () => void;
  isStepCompleted: (stepId: string) => boolean;
  completeTutorial: () => void;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 'welcome',
    title: 'Welcome to FableTongue',
    description: 'Learn how to use FableTongue to master a new language through interactive stories.',
    completed: false,
    component: 'WelcomeStep'
  },
  {
    id: 'language-selection',
    title: 'Choose Your Language',
    description: 'Select the language you want to learn and set your learning preferences.',
    completed: false,
    component: 'LanguageSelectionStep'
  },
  {
    id: 'story-intro',
    title: 'How Stories Work',
    description: 'Learn how interactive stories help you learn a new language naturally.',
    completed: false,
    component: 'StoryIntroStep'
  },
  {
    id: 'interactive-elements',
    title: 'Interactive Elements',
    description: 'Discover how to interact with the story and practice your language skills.',
    completed: false,
    component: 'InteractiveElementsStep'
  },
  {
    id: 'practice',
    title: 'Practice Exercises',
    description: 'Try out some practice exercises to get familiar with the learning process.',
    completed: false,
    component: 'PracticeStep'
  }
];

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set, get) => ({
      currentStep: 0,
      totalSteps: 5,
      completedSteps: [],
      steps: tutorialSteps,
      isCompleted: false,
      isLoading: false,
      nextStep: () => set((state) => ({ currentStep: state.currentStep + 1 })),
      setCurrentStep: (step) => set({ currentStep: step }),
      completeStep: (stepId) =>
        set((state) => ({
          completedSteps: [...state.completedSteps, stepId],
          isCompleted: state.completedSteps.length + 1 === state.totalSteps,
        })),
      resetTutorial: () =>
        set({
          currentStep: 0,
          completedSteps: [],
          isCompleted: false,
        }),
      isStepCompleted: (stepId) => {
        const state = get();
        const step = state.steps.find((s) => s.id === stepId);
        return step?.completed || false;
      },
      completeTutorial: () => {
        set({ isCompleted: true });
      },
    }),
    {
      name: 'tutorial-storage',
    }
  )
); 