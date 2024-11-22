import React, { useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { AuthContext } from "../../context/Auth";
import { Artist } from "../../screens/Artist";
import { Playlist } from "../../screens/Playlist";
import { Library } from "../../screens/Library";
import { Home } from "../../screens/Home";
import { Player } from "../../screens/Player/Index";

const Stack = createNativeStackNavigator();

export function StackNavigator() {
  const { authenticated } = useContext(AuthContext);

  return (
    <Stack.Navigator>
      <>
        {/* <Stack.Screen
            name="BottomTabRoutes"
            component={BottomTabRoutes}
            options={{ headerShown: false }}
          /> */}
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="artist"
          component={Artist}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="playlist"
          component={Playlist}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="library"
          component={Library}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="player"
          component={Player}
          options={{ headerShown: false }}
        />
      </>
    </Stack.Navigator>
  );
}
