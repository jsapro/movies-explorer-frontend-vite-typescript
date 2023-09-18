import './Header.css';
import Logo from '../Logo/Logo';
import Navigation from '../../Navigation/Navigation';
import { type HeaderProps } from './types';

const Header = ({ isLoggedIn }: HeaderProps) => {
  return (
    <header className='header'>
      <div className='header__container'>
        <Logo />
        <Navigation isLoggedIn={isLoggedIn} />
      </div>
    </header>
  );
};

export default Header;
