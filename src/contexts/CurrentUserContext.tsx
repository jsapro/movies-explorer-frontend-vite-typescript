import { createContext } from 'react';

interface CurrentUserContextType {
  email: string;
  name: string;
  __v?: number;
  _id: string;
}

export const CurrentUserContext = createContext<CurrentUserContextType | null>(
  null
);
