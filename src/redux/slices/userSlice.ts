import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

interface User {
   email: string;
   jwt: string;
}

interface UserState {
   user: User | null;
}

const storedUser = localStorage.getItem('user');

const initialState: UserState = {
   user: storedUser ? JSON.parse(storedUser) : null,
};

const userSlice = createSlice({
   name: 'user',
   initialState,
   reducers: {
      setUser(state, action: PayloadAction<User>) {
         state.user = action.payload;
         localStorage.setItem('user', JSON.stringify(action.payload));
      },
      logoutUser(state) {
        state.user = null;
        localStorage.removeItem('user');
      }
   },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
