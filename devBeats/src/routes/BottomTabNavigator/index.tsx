import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Home } from "../../screens/Home";
import Icon from "react-native-vector-icons/FontAwesome";
import { Buscar } from "../../screens/Buscar/Buscar";

const Tab = createBottomTabNavigator<RootTabParamList>();

export type RootTabParamList = {
  Home: {};
  Search: {};
};

export function BottomTabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: "#000", paddingBottom: 2 },
        tabBarInactiveTintColor: "#aaa",
        tabBarActiveTintColor: "#fff",
      }}
    >
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
        name="Search" // Nome para a rota da aba
        component={Buscar} // Associando à tela Buscar
      />
    </Tab.Navigator>
  );
}
