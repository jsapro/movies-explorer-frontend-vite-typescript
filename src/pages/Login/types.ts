interface LoginProps {
  handleUserLogin (email: string, password: string): Promise<void>;
  isLocked: boolean;
}

export type { LoginProps };
