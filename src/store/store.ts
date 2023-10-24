import { configureStore } from "@reduxjs/toolkit";
import { menuSlice } from "./menuSlice";

export const store = configureStore({
    reducer: {
      [menuSlice.name]: menuSlice.reducer,
    },
    // devTools: true,
  });
export type AppState = ReturnType<typeof store.getState>;
