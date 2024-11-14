import React, { useState, useEffect, createContext, useMemo } from "react";
import {
  AuthContextType,
  IAuth,
  AuthProviderProps,
} from "../@types/AuthContextType";
import { setToken } from "../services/spotifyApi/api";

export const AuthContext = createContext<AuthContextType | null>(null);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [authenticated, setAuthenticated] = useState<boolean>(false);

  interface ResponseData {
    message: {
      email: string;
      token: string;
    };
  }

  const handleUserState = (response: { data: ResponseData }): void => {
    const loggedUser = response.data.message.email;
    const { token } = response.data.message;

    localStorage.setItem("user", JSON.stringify(loggedUser));
    localStorage.setItem("token", token);

    setToken(token);

    setUser(loggedUser);

    setAuthenticated(true);

    // navigate("/user");
  };

  //   interface LoginForm {
  //     email: string;
  //     password: string;
  //   }

  //   const login = async (form: LoginForm): Promise<void> => {
  //     const response = await createSession(form);

  //     handleState(response);
  //   };

  const logout = (): void => {
    setToken(null);
    setUser(null);
    setAuthenticated(false);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    // navigate("/");
  };

  useEffect(() => {
    const recoveredUser = localStorage.getItem("user");

    if (recoveredUser) {
      setUser(JSON.parse(recoveredUser));
      setAuthenticated(true);
    }

    setLoading(false);
  }, []);

  const value = useMemo<IAuth>(
    () => ({
      authenticated,
      user,
      loading,
      // login,
      logout,
    }),
    [authenticated, user, loading, logout]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
