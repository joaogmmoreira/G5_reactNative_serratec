import React from "react";
import { LinearGradient } from "expo-linear-gradient";

interface GradientProps {
  children: React.ReactNode;
}

export const Gradient: React.FC<GradientProps> = ({ children }) => {
  return (
    <LinearGradient colors={["#065055", "#000000"]} style={{ flex: 1 }}>
      {children}
    </LinearGradient>
  );
};
