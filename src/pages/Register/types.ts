interface RegisterProps {
  onRegister: (name: string, email: string, password: string) => Promise<void>;
  isLocked: boolean;
}

export type {RegisterProps}
