import { PropsWithChildren, createContext, useMemo, useState } from 'react';

export const AuthContext = createContext({
  isLogin: false,
  setLogin: (status: boolean) => {},
});

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [isLogin, setLogin] = useState(false);

  const value = useMemo(
    () => ({
      isLogin,
      setLogin,
    }),
    [isLogin]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
