import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Buscar } from "../../screens/Buscar/Buscar";
import { Library } from "../../screens/Library";
import { StackNavigator } from "../StackNavigator";
import { Login } from "../../screens/Login";
import { AuthContext } from "../../context/Auth";
import { Playlist } from "../../screens/Playlist";
import { Artist } from "../../screens/Artist";
import { Player } from "../../screens/Player";
import { Account } from "../../screens/Account";
import { Register } from "../../screens/Register";

const Tab = createBottomTabNavigator<RootTabParamList>();

export type ScreenNames = ["Home", "Auth", "Login"];
export type TabNavigation = NavigationProp<RootTabParamList>;

export type RootTabParamList = {
  home: undefined;
  search: undefined;
  login: undefined;
  artist: undefined;
  library: undefined;
  stackNav: undefined;
  playlist: undefined;
  player: undefined;
  account: undefined;
  register: undefined;
  space1: undefined;
  space2: undefined;
};

export function BottomTabRoutes() {
  const { authenticated } = useContext(AuthContext);
  return (
    <Tab.Navigator
      // initialRouteName="stackNav"
      screenOptions={{
        headerShown: false,
        tabBarInactiveTintColor: "#aaa",
        tabBarActiveTintColor: "#fff",
        tabBarStyle: {
          justifyContent: "space-evenly",
          alignItems: "center",
          paddingVertical: 5,
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          backgroundColor: "#000",
          position: "absolute",
          height: 60,
        },
      }}
    >
      {authenticated ? (
        <>
          <Tab.Screen
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={30} />
              ),
              tabBarItemStyle: { marginHorizontal: 40, marginVertical: 10 },
            }}
            name="stackNav"
            component={StackNavigator}
          />
          <Tab.Screen
            options={{
              tabBarShowLabel: false,
              tabBarButton: () => null,
            }}
            name="playlist"
            component={Playlist}
          />
          <Tab.Screen
            options={{
              tabBarShowLabel: false,
              tabBarButton: () => null,
            }}
            name="artist"
            component={Artist}
          />
          <Tab.Screen
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color }) => (
                <Icon name="search" color={color} size={30} />
              ),
              tabBarItemStyle: { marginHorizontal: 40, marginVertical: 10 },
            }}
            name="search"
            component={Buscar}
          />
          <Tab.Screen
            options={{
              tabBarShowLabel: false,
              tabBarButton: () => null,
            }}
            name="account"
            component={Account}
          />
          <Tab.Screen
            options={{
              tabBarShowLabel: false,
              tabBarButton: () => null,
            }}
            name="player"
            component={Player}
          />
          <Tab.Screen
            options={{
              tabBarShowLabel: false,
              tabBarIcon: ({ color }) => (
                <Icon2 name="my-library-music" color={color} size={30} />
              ),
              tabBarItemStyle: { marginHorizontal: 40, marginVertical: 10 },
            }}
            name="library"
            component={Library}
          />
          <Tab.Screen
            options={{
              tabBarShowLabel: false,
              tabBarButton: () => null,
            }}
            name="space1"
            component={() => null}
          />
        </>
      ) : (
        <>
          <Tab.Screen
            options={{
              tabBarButton: () => null,
            }}
            name="login"
            component={Login}
          />
          <Tab.Screen
            options={{
              tabBarButton: () => null,
            }}
            name="register"
            component={Register}
          />
        </>
      )}
    </Tab.Navigator>
  );
}
