"use client";

import React, { useContext } from "react";

type Refine = {
  word: string[];
  department: number[];
};

const SelectContext = React.createContext<[Refine, React.Dispatch<React.SetStateAction<Refine>>] | undefined>(undefined);

export function SelectProvider({ children }: { children: React.ReactNode }) {
  const [select, setSelect] = React.useState<Refine>({
    word: [],
    department: [],
  });

  return (
    <SelectContext.Provider value={[select, setSelect]}>
      {children}
    </SelectContext.Provider>
  );
}

export function useRefine() {
  const context = useContext(SelectContext);
  if (context === undefined) {
    throw new Error("useRefine must be used within a SelectProvider");
  }
  return context;
}
