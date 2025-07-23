import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type Theme = 'light' | 'dark';

interface ThemeState {
   mode: Theme;
}

const getInitialTheme = (): Theme => {
   const storedTheme = localStorage.getItem('theme') as Theme;
   if (storedTheme) {
      return storedTheme;
   }
   if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
   }
   return 'light';
};

const initialState: ThemeState = {
   mode: getInitialTheme(),
};

const themeSlice = createSlice({
   name: 'theme',
   initialState,
   reducers: {
      toggleTheme(state) {
         const newMode = state.mode === 'light' ? 'dark' : 'light';
         state.mode = newMode;
         localStorage.setItem('theme', newMode);
      },
      setTheme(state, action: PayloadAction<Theme>) {
         state.mode = action.payload;
         localStorage.setItem('theme', action.payload);
      }
   },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer; 