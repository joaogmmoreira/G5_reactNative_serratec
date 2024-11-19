import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabRoutes } from "../BottomTabNavigator";
import { AuthContext } from "../../context/Auth";
import { Login } from "../../screens/Login";

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  const authContext = useContext(AuthContext);
  const authenticated = authContext ? authContext.authenticated : false;
  return (
    <Stack.Navigator>
      {authenticated ? (
        <Stack.Screen
          name="Home"
          component={BottomTabRoutes}
          options={{ headerShown: false }}
        />
      ) : (
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ headerShown: false }}
        />
      )}
    </Stack.Navigator>
  );
}
