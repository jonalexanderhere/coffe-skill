"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { User, UserRole, LoginCredentials, RegisterData } from "./types";
import { useRouter, usePathname } from "next/navigation";
import { useUserStore } from "./store";
import { supabase, isSupabaseConfigured } from "./supabase";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<boolean>;
  loginWithGoogle: () => Promise<void>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
  hasRole: (role: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const AUTH_KEY = "coffeeskill-auth";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const { users, addUser, updateUser: updateUserInStore } = useUserStore();

  // Load user from localStorage on mount
  useEffect(() => {
    const loadUser = async () => {
      const stored = localStorage.getItem(AUTH_KEY);
      if (stored) {
        try {
          const parsedUser = JSON.parse(stored);
          const existsInStore = users.some((u) => u.id === parsedUser.id);
          if (existsInStore) {
            setUser(parsedUser);
          } else {
            localStorage.removeItem(AUTH_KEY);
          }
        } catch {
          localStorage.removeItem(AUTH_KEY);
        }
      }
      
      // Try Supabase session if configured
      if (isSupabaseConfigured) {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          const supabaseUser = session.user;
          let existingUser = users.find(u => u.email === supabaseUser.email);
          
          if (!existingUser) {
            // Auto-register if not in store but in Supabase (OAuth case)
            const newUser: User = {
              id: supabaseUser.id,
              name: supabaseUser.user_metadata.full_name || supabaseUser.email?.split('@')[0] || "User",
              email: supabaseUser.email || "",
              role: 'student',
              status: 'active',
              joinedDate: new Date().toISOString().split('T')[0],
            };
            addUser(newUser);
            existingUser = newUser;
          }

          setUser(existingUser);
          localStorage.setItem(AUTH_KEY, JSON.stringify(existingUser));
        }
      }
      
      setIsLoading(false);
    };
    
    loadUser();
  }, [users, addUser]);

  // Listen for Supabase auth changes
  useEffect(() => {
    if (!isSupabaseConfigured) return;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const supabaseUser = session.user;
        let existingUser = users.find(u => u.email === supabaseUser.email);
        
        if (!existingUser) {
          const newUser: User = {
            id: supabaseUser.id,
            name: supabaseUser.user_metadata.full_name || supabaseUser.email?.split('@')[0] || "User",
            email: supabaseUser.email || "",
            role: 'student',
            status: 'active',
            joinedDate: new Date().toISOString().split('T')[0],
          };
          addUser(newUser);
          existingUser = newUser;
        }

        setUser(existingUser);
        localStorage.setItem(AUTH_KEY, JSON.stringify(existingUser));
      } else {
        const stored = localStorage.getItem(AUTH_KEY);
        if (!stored) {
          setUser(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [users, addUser]);

  // Route protection
  useEffect(() => {
    if (isLoading) return;

    const protectedRoutes: Record<UserRole, string[]> = {
      superadmin: ["/superadmin"],
      mentor: ["/mentor"],
      student: ["/dashboard"],
    };

    for (const [role, routes] of Object.entries(protectedRoutes)) {
      const isProtected = routes.some((route) => pathname.startsWith(route));
      if (isProtected && !user) {
        router.push("/login");
        return;
      }
      if (isProtected && user && user.role !== role) {
        if (user.role !== "superadmin") {
          router.push("/");
          return;
        }
      }
    }
  }, [user, isLoading, pathname, router]);

  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const foundUser = users.find(
      (u) => u.email === credentials.email && u.password === credentials.password
    );

    if (foundUser) {
      const { password, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));

      if (isSupabaseConfigured) {
        await supabase.auth.signInWithPassword({
          email: credentials.email,
          password: credentials.password,
        });
      }

      switch (userWithoutPassword.role) {
        case "superadmin":
          router.push("/superadmin");
          break;
        case "mentor":
          router.push("/mentor");
          break;
        default:
          router.push("/dashboard");
      }
      return true;
    }
    return false;
  };

  const loginWithGoogle = async () => {
    if (!isSupabaseConfigured) return;
    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500));

    const exists = users.some((u) => u.email === data.email);
    if (exists) return false;

    const newUser: User = {
      id: `${data.role}-${Date.now()}`,
      name: data.name,
      email: data.email,
      role: data.role,
      status: data.role === "mentor" ? "pending" : "active",
      joinedDate: new Date().toISOString().split("T")[0],
    };

    addUser(newUser);
    const { password, ...userWithoutPassword } = newUser;
    setUser(userWithoutPassword);
    localStorage.setItem(AUTH_KEY, JSON.stringify(userWithoutPassword));

    if (isSupabaseConfigured) {
      await supabase.auth.signUp({
        email: data.email,
        password: data.password,
      });
    }

    if (data.role === "mentor") {
      router.push("/mentor");
    } else {
      router.push("/dashboard");
    }
    return true;
  };

  const logout = async () => {
    setUser(null);
    localStorage.removeItem(AUTH_KEY);
    
    if (isSupabaseConfigured) {
      await supabase.auth.signOut();
    }
    
    router.push("/login");
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      updateUserInStore(user.id, updates);
      localStorage.setItem(AUTH_KEY, JSON.stringify(updatedUser));
    }
  };

  const hasRole = (role: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    if (Array.isArray(role)) {
      return role.includes(user.role);
    }
    return user.role === role;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        loginWithGoogle,
        register,
        logout,
        updateUser,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

// Route guard component
export function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: ReactNode;
  allowedRoles: UserRole[];
}) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    } else if (!isLoading && user && !allowedRoles.includes(user.role)) {
      // Superadmin can access everything
      if (user.role !== "superadmin") {
        router.push("/");
      }
    }
  }, [isLoading, user, allowedRoles, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-4 border-accent border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!user || (user.role !== "superadmin" && !allowedRoles.includes(user.role))) {
    return null;
  }

  return <>{children}</>;
}