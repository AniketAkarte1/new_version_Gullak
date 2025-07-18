import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  upiId?: string;
  totalSavings: number;
  rewardPoints: number;
  goals: Goal[];
  achievements: Achievement[];
}

interface Goal {
  id: string;
  title: string;
  targetAmount: number;
  currentAmount: number;
  deadline: string;
  isCompleted: boolean;
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  unlockedAt: string;
}

interface AuthContextType {
  user: User | null;
  login: (userData: Partial<User>) => void;
  register: (userData: Omit<User, 'id' | 'totalSavings' | 'rewardPoints' | 'goals' | 'achievements'>) => void;
  logout: () => void;
  updateSavings: (amount: number) => void;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('gullak-user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const login = (userData: Partial<User>) => {
    const newUser: User = {
      id: userData.id || Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      upiId: userData.upiId,
      totalSavings: userData.totalSavings || 0,
      rewardPoints: userData.rewardPoints || 0,
      goals: userData.goals || [],
      achievements: userData.achievements || [],
    };
    setUser(newUser);
    localStorage.setItem('gullak-user', JSON.stringify(newUser));
  };

  const register = (userData: Omit<User, 'id' | 'totalSavings' | 'rewardPoints' | 'goals' | 'achievements'>) => {
    const newUser: User = {
      ...userData,
      id: Date.now().toString(),
      totalSavings: 0,
      rewardPoints: 50, // Welcome bonus
      goals: [],
      achievements: [
        {
          id: '1',
          title: 'Welcome to Gullak!',
          description: 'You\'ve successfully created your account',
          icon: '🎉',
          unlockedAt: new Date().toISOString(),
        },
      ],
    };
    setUser(newUser);
    localStorage.setItem('gullak-user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('gullak-user');
  };

  const updateSavings = (amount: number) => {
    if (user) {
      const updatedUser = {
        ...user,
        totalSavings: user.totalSavings + amount,
        rewardPoints: user.rewardPoints + Math.floor(amount / 10), // 1 point per 10 units
      };
      setUser(updatedUser);
      localStorage.setItem('gullak-user', JSON.stringify(updatedUser));
    }
  };

  const addGoal = (goalData: Omit<Goal, 'id'>) => {
    if (user) {
      const newGoal: Goal = {
        ...goalData,
        id: Date.now().toString(),
      };
      const updatedUser = {
        ...user,
        goals: [...user.goals, newGoal],
      };
      setUser(updatedUser);
      localStorage.setItem('gullak-user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateSavings,
        addGoal,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};