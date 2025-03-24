import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Language {
  code: string;
  name: string;
  nativeName: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface LanguageState {
  selectedLanguage: string | null;
  isLoading: boolean;
  error: string | null;
  setLanguage: (languageId: string) => void;
  clearLanguage: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

const availableLanguages: Language[] = [
  {
    code: 'es',
    name: 'Spanish',
    nativeName: 'Español',
    difficulty: 'beginner'
  },
  {
    code: 'fr',
    name: 'French',
    nativeName: 'Français',
    difficulty: 'beginner'
  },
  {
    code: 'de',
    name: 'German',
    nativeName: 'Deutsch',
    difficulty: 'intermediate'
  },
  {
    code: 'it',
    name: 'Italian',
    nativeName: 'Italiano',
    difficulty: 'beginner'
  },
  {
    code: 'pt',
    name: 'Portuguese',
    nativeName: 'Português',
    difficulty: 'beginner'
  },
  {
    code: 'ja',
    name: 'Japanese',
    nativeName: '日本語',
    difficulty: 'advanced'
  },
  {
    code: 'ko',
    name: 'Korean',
    nativeName: '한국어',
    difficulty: 'advanced'
  },
  {
    code: 'zh',
    name: 'Mandarin',
    nativeName: '普通话',
    difficulty: 'advanced'
  }
];

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      selectedLanguage: null,
      isLoading: false,
      error: null,
      setLanguage: (languageId) => {
        set({ selectedLanguage: languageId, error: null });
      },
      clearLanguage: () => {
        set({ selectedLanguage: null, error: null });
      },
      setLoading: (loading: boolean) => {
        set({ isLoading: loading });
      },
      setError: (error: string | null) => {
        set({ error });
      }
    }),
    {
      name: 'language-storage'
    }
  )
);

export { availableLanguages }; 