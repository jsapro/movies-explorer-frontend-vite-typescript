import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className='footer'>
      <h2 className='footer__title'>Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className='footer__outer-container'>
        <nav className='footer__inner-container'>
          <ul className='footer__list'>
            <li className='footer__item'>
              <Link className='footer__link' to='https://practicum.yandex.ru' target='_blank'>
                Яндекс.Практикум
              </Link>
            </li>
            <li className='footer__item'>
              <Link className='footer__link' to='https://github.com/jsapro' target='_blank'>
                Github
              </Link>
            </li>
          </ul>
        </nav>
        <p className='footer__copyright'>©{new Date().getFullYear()}</p>
      </div>
    </footer>
  );
};

export default Footer;
