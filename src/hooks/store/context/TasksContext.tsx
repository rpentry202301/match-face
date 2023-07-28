"use client";

import React from "react";

// 職種フィルター用context
const JobsFilterContext = React.createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>] | undefined
>(undefined);

export const JobsFilterProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [filterlist, setFilterList] = React.useState<string[]>([]);
  return (
    <JobsFilterContext.Provider value={[filterlist, setFilterList]}>
      {children}
    </JobsFilterContext.Provider>
  );
};

export const useJobsFilter = () => {
  const context = React.useContext(JobsFilterContext);
  if (context === undefined) {
    throw new Error("useRefine must be used within a Provider");
  }
  return context;
};
// ここまで
