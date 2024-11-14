import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabRoutes } from "./BottomTabNavigator";
import { AuthContext } from "../context/Auth";

export const Routes = () => {
  return (
    <NavigationContainer>
      <AuthContext.Provider value={null}>
        <BottomTabRoutes />
      </AuthContext.Provider>
    </NavigationContainer>
  );
};
