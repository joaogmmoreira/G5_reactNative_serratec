import React, { useState, useEffect, createContext, useMemo } from "react";
import {
  AuthContextType,
  IAuth,
  AuthProviderProps,
} from "../@types/AuthContextType";
import { setToken } from "../services/spotifyApi";
import { useNavigation } from "@react-navigation/native";
import { TabNavigation } from "../routes/BottomTabNavigator";
import { createSession } from "../services/backendApi";
import { createSpotifySession } from "../services/spotifyApi";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext<AuthContextType>({
  authenticated: false,
  user: null,
  loading: true,
  login: () => {},
  logout: () => {},
});

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  const navigate = useNavigation<TabNavigation>();

  interface ResponseData {
    data: [
      {
        email: string;
        token: string;
      }
    ];
  }

  const handleUserState = async (
    response: ResponseData,
    token: string
  ): Promise<void> => {
    const loggedUser = response.data[0].email;

    try {
      await AsyncStorage.setItem("user", JSON.stringify(loggedUser));
      await AsyncStorage.setItem("token", token);
    } catch (error) {
      console.log(error);
    }

    setToken(token);

    setUser(loggedUser);

    setAuthenticated(true);
  };

  interface LoginForm {
    email: string;
    password: string;
  }

  const login = async (form: LoginForm): Promise<void> => {
    const spotifyToken = await createSpotifySession();

    if (!spotifyToken) {
      return;
    }

    const response = await createSession(form);

    if (response.status !== 200) {
      return console.log("Credenciais inválidas");
    }

    handleUserState(response, spotifyToken);
  };

  const logout = async (): Promise<void> => {
    setToken(null);
    setUser(null);
    setAuthenticated(false);
    await AsyncStorage.removeItem("user");
    await AsyncStorage.removeItem("token");
    navigate.navigate("login");
  };

  const checkStoredToken = async () => {
    const storedUser = await AsyncStorage.getItem("user");
    const storedToken = await AsyncStorage.getItem("token");
    if (storedToken && storedUser) {
      setUser(storedToken);

      setToken(storedToken);

      setAuthenticated(true);
    }
    setLoading(false);
  };

  useEffect(() => {
    checkStoredToken();
  }, []);

  // useCallback
  const value = useMemo<IAuth>(
    () => ({
      authenticated,
      user,
      loading,
      login,
      logout,
    }),
    [authenticated, user, loading, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
