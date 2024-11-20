import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { BottomTabRoutes } from "../BottomTabNavigator";
import { AuthContext } from "../../context/Auth";
import { Login } from "../../screens/Login";
import { Artist } from "../../screens/Artist";
import { AlbumDetail } from "../../screens/Album";

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  const authContext = useContext(AuthContext);
  const authenticated = authContext ? authContext.authenticated : false;
  return (
    <Stack.Navigator>
      {authenticated ? (
        <>
          <Stack.Screen
            name="Home"
            component={BottomTabRoutes}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Artista"
            component={Artist}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="Album"
            component={AlbumDetail}
            options={{ headerShown: false }}
          /> */}
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
