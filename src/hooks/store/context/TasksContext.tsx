"use client";

import React from "react";

type FilterType = {
  search: string[];
  departments: string[];
};

const FilterContext = React.createContext<
  [FilterType, React.Dispatch<React.SetStateAction<FilterType>>] | undefined
>(undefined);

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [filterlist, setFilterList] = React.useState<FilterType>({
    search: [],
    departments: [],
  });
  return (
    <FilterContext.Provider value={[filterlist, setFilterList]}>
      {children}
    </FilterContext.Provider>
  );
};

export const useJobsFilter = () => {
  const context = React.useContext(FilterContext);
  if (context === undefined) {
    throw new Error("useRefine must be used within a Provider");
  }
  return context;
};
