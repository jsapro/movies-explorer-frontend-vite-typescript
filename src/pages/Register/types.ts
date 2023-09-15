import { CurrentUserContextType } from '../../contexts/CurrentUserContext';

interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => Promise<CurrentUserContextType>;
  isLocked: boolean;
}

export type {RegisterProps}
