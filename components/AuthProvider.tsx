import React, { createContext, useContext, useMemo, useState } from "react";

export type UserRole = "admin" | "user";

export type RegisteredUser = {
  name: string;
  email: string;
  password: string;
  role: UserRole;
};

type AuthContextValue = {
  user: RegisteredUser | null;
  register: (newUser: RegisteredUser) => void;
  login: (email: string, password: string) => { success: boolean; role?: UserRole };
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<RegisteredUser | null>(null);

  const register = (newUser: RegisteredUser) => {
    setUser(newUser);
  };

  const login = (email: string, password: string) => {
    if (!user) {
      return { success: false };
    }

    const normalizedEmail = email.trim().toLowerCase();
    const isMatch =
      user.email.trim().toLowerCase() === normalizedEmail &&
      user.password === password;

    if (!isMatch) {
      return { success: false };
    }

    return { success: true, role: user.role };
  };

  const value = useMemo(
    () => ({
      user,
      register,
      login,
    }),
    [user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};
