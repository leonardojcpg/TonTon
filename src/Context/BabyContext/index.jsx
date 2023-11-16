import React, { createContext, useContext, useState } from "react";

const BabyContext = createContext();

export const useBabyContext = () => {
  return useContext(BabyContext);
};

export const BabyProvider = ({ children }) => {
  const [babyData, setBabyData] = useState({});

  const setDataInfo = (data) => {
    setBabyData(data);
  };

  return (
    <BabyContext.Provider value={{ babyData, setDataInfo }}>
      {children}
    </BabyContext.Provider>
  );
};
