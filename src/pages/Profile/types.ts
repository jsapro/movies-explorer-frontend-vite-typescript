interface ProfileProps {
  handleSignOut: () => void;
  isLoggedIn: boolean;
  onUpdateUser: (name: string, email: string) => Promise<void>;
  isLocked: boolean;
}

export default ProfileProps;
