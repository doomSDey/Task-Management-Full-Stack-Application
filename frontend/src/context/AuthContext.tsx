import Cookies from 'js-cookie';
import { useRouter } from 'next/router';
import React, { createContext, ReactNode, useContext, useEffect, useState } from 'react';

import { AuthApiResponse, logIn, signUp } from '../service/auth';
import { updateUserAvatar } from '../service/user';

interface AuthContextType {
  authData: AuthApiResponse | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (username: string, email: string, password: string) => Promise<void>;
  signOut: () => void;
  updateAvatar: (avatarId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [authData, setAuthData] = useState<AuthApiResponse | null>(null);
  const router = useRouter();

  const signIn = async (email: string, password: string) => {
    const response = await logIn(email, password);
    Cookies.set('authToken', response.accessToken, { expires: 23 / 24, secure: true, sameSite: 'strict' });
    Cookies.set('user', JSON.stringify(response.user), { expires: 23 / 24, secure: true, sameSite: 'strict' });
    setAuthData(response);
    router.push('/');
  };

  const signUpUser = async (username: string, email: string, password: string) => {
    const response = await signUp(username, email, password);
    Cookies.set('authToken', response.accessToken, { expires: 23 / 24, secure: true, sameSite: 'strict' });
    Cookies.set('user', JSON.stringify(response.user), { expires: 23 / 24, secure: true, sameSite: 'strict' });
    setAuthData(response);
    router.push('/');
  };

  const signOut = () => {
    Cookies.remove('authToken');
    Cookies.remove('user');
    setAuthData(null);
    router.push('/signIn'); // Redirect to login
  };

  const updateAvatar = async (avatarId: string) => {
    if (authData?.accessToken && authData?.user) {
      await updateUserAvatar(avatarId);
      const updatedUser = { ...authData.user, avatarId };
      setAuthData({ ...authData, user: updatedUser });
      Cookies.set('user', JSON.stringify(updatedUser), { expires: 23 / 24, secure: true, sameSite: 'strict' });
    }
  };

  useEffect(() => {
    const verifyAuthentication = async () => {
      const storedJwt = Cookies.get('authToken');
      const storedUser = Cookies.get('user');

      if (!storedJwt) {
        signOut();
        return;
      }

      if (storedJwt && storedUser) {
        const user = JSON.parse(storedUser);
        setAuthData({ accessToken: storedJwt, user });
      }
    };
    verifyAuthentication();
  }, []);

  return (
    <AuthContext.Provider value={{ authData, signIn, signUp: signUpUser, signOut , updateAvatar}}>
      {children}
    </AuthContext.Provider>
  );
};
