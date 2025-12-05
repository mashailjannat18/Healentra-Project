"use client";

import { FC, PropsWithChildren } from "react";
import { Provider } from "react-redux";

import { store } from "../store";

const StateProvider: FC<PropsWithChildren> = ({ children }) => (
  <Provider store={store}>
      {children}
  </Provider>
);

export default StateProvider;