interface AuthSubmitProps {
  type: string;
  serverResponseError: string;
  isValid: boolean;
  isLocked: boolean;
  onRegister?: (name: string, email: string, password: string) => Promise<void>;
}

export default AuthSubmitProps;
