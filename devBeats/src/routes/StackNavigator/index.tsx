import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabRoutes } from "../BottomTabNavigator";
import { AuthContext } from "../../context/Auth";
import { Login } from "../../screens/Login";
import { Artist } from "../../screens/Artist";
import { Playlist } from "../../screens/Playlist";
import { Library } from "../../screens/Library";

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  const { authenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      {authenticated ? (
        <>
          <Stack.Screen
            name="BottomTabRoutes"
            component={BottomTabRoutes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Artista"
            component={Artist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Playlist"
            component={Playlist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Library"
            component={Library}
            options={{ headerShown: false }}
          />
        </>
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
