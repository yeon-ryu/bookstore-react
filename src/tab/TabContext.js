'use client'

import { createContext, useContext } from "react";

export const TabContext = createContext(null);
export const useTabParams = () => useContext(TabContext);