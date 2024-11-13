import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { BottomTabRoutes } from "./BottomTabNavigator";

export const Routes = () => {
  return (
    <NavigationContainer>
      <BottomTabRoutes />
    </NavigationContainer>
  );
};
