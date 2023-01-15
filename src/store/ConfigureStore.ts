import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import reducer from "./reducer";
import { Api } from "./Api";

export function initStore() {
  return configureStore({
    reducer,
    //@ts-ignore
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(Api.middleware),
  });
}
