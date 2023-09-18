import { Link } from 'react-router-dom';
import './NavTab.css';

const NavTab = () => {
  return (
    <nav className='nav'>
      <ul className='nav__list'>
        <li className='nav__item'>
          <Link className='nav__link' to='#about-project' reloadDocument>
            О проекте
          </Link>
        </li>
        <li className='nav__item'>
          <Link className='nav__link' to='#techs' reloadDocument>
            Технологии
          </Link>
        </li>
        <li className='nav__item'>
          <Link className='nav__link' to='#about-me' reloadDocument>
            Студент
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavTab;
