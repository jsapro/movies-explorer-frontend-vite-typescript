import { Link } from 'react-router-dom';
import './Logo.css';
import logo from '../../../images/logo.svg';

const Logo = () => {
  return (
    <Link to='/' className='logo' href='/'>
      <img className='logo__img' src={logo} alt='лого' />
    </Link>
  );
};

export default Logo;
