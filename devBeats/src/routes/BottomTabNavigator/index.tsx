import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";
import { Home } from "../../screens/Home";
import Icon from "react-native-vector-icons/FontAwesome";
import Icon2 from "react-native-vector-icons/MaterialIcons";
import { Buscar } from "../../screens/Buscar/Buscar";
import { Library } from "../../screens/Library";
// import { Artist } from "../../screens/Artist";
import { StackNavigator } from "../StackNavigator";
import { Login } from "../../screens/Login";
import { AuthContext } from "../../context/Auth";

const Tab = createBottomTabNavigator<RootTabParamList>();

export type ScreenNames = ["Home", "Auth", "Login"];
export type TabNavigation = NavigationProp<RootTabParamList>;

export type RootTabParamList = {
  Home: undefined;
  Search: undefined;
  Login: undefined;
  Artist: undefined;
  Library: undefined;
  StackNav: undefined;
};

export function BottomTabRoutes() {
  const { authenticated } = useContext(AuthContext);
  return (
    <Tab.Navigator
      // initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000", paddingBottom: 2 },
        tabBarInactiveTintColor: "#aaa",
        tabBarActiveTintColor: "#fff",
      }}
    >
      {authenticated ? (
        <>
          <Tab.Screen
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={24} />
              ),
            }}
            name="StackNav"
            component={StackNavigator}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="home" color={color} size={24} />
              ),
            }}
            name="Home"
            component={Home}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ color }) => (
                <Icon name="search" color={color} size={24} />
              ),
            }}
            name="Search"
            component={Buscar}
          />
          <Tab.Screen
            options={{
              tabBarIcon: ({ color }) => (
                <Icon2 name="my-library-music" color={color} size={24} />
              ),
            }}
            name="Library"
            component={Library}
          />
        </>
      ) : (
        <Tab.Screen
          options={{
            tabBarIcon: ({ color }) => (
              <Icon name="home" color={color} size={24} />
            ),
          }}
          name="Login"
          component={Login}
        />
      )}
    </Tab.Navigator>
  );
}
