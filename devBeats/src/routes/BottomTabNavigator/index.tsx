import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationProp } from "@react-navigation/native";

import Icon from "react-native-vector-icons/FontAwesome";
import { Buscar } from "../../screens/Buscar/Buscar";

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { Home } from "../../screens/Home";
import  PlaylistsPage   from "../../screens/Playlist";
import PlaylistDetailsPage from "../../screens/PlaylistDetail";


type RootStackParamList = {
  Home: undefined;
  PlaylistDetails: { playlistId: string };
};

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator();

function BottomTabRoutes() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: { backgroundColor: '#000', paddingBottom: 2 },
        tabBarInactiveTintColor: '#aaa',
        tabBarActiveTintColor: '#fff',
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
        name="Search"
        component={Buscar}
      />

      <Tab.Screen
        options={{
          tabBarIcon: ({ color }) => (
            <Icon name="music" color={color} size={24} />
          ),
        }}
        name="Playlists"
        component={PlaylistsPage}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={BottomTabRoutes} />
        <Stack.Screen name="PlaylistDetails" component={PlaylistDetailsPage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
