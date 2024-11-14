export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface IAuth {
  authenticated: boolean;
  user: string | null;
  loading: boolean;
  logout: () => void;
}

export type AuthContextType = {
  authenticated: boolean;
  user: string | null;
  loading: boolean;
  logout: () => void;
};
