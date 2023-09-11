import { Link } from 'react-router-dom';
import './AboutMe.css';
import photo from '../../../images/foto.webp';

const AboutMe = () => {
  return (
    <section className='about-me' id='about-me'>
      <h2 className='about-me__title'>Студент</h2>
      <article className='about-me__article'>
        <img className='about-me__photo' src={photo} alt='фото разработчика' />
        <div className='about-me__inner-container'>
          <h3 className='about-me__subtitle'>Алексей</h3>
          <p className='about-me__profession'>Фронтенд-разработчик, 41 год</p>
          <p className='about-me__description'>
            Я родился и живу в Санкт-Петербурге, закончил СПбГТИ(ТУ) "Санкт-Петербургский
            государственный технологический институт (технический университет)". Я люблю плавать в
            бассейне, кататься на велосипеде, быть на природе. Люблю программировать и решать
            поставленные задачи. Активно изучаю веб-разработку и всё что с ней связано.
            Веб-разработка мне нравится своей многогранностью и пользой, которую она приносит людям.
          </p>
          <Link className='about-me__link' to='https://github.com/jsapro' target='_blank'>
            Github
          </Link>
        </div>
      </article>
    </section>
  );
};

export default AboutMe;
