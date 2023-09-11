import { Link } from 'react-router-dom';
import './Portfolio.css';

const Portfolio = () => {
  const linkList = [
    {
      name: 'Статичный сайт',
      url: 'https://github.com/jsapro/how-to-learn',
    },
    {
      name: 'Адаптивный сайт',
      url: 'https://jsapro.github.io/russian-travel',
    },
    {
      name: 'Одностраничное приложение',
      url: 'https://getlike-jsapro.nomoredomains.xyz',
    },
  ];

  return (
    <section className='portfolio'>
      <h2 className='portfolio__title'>Портфолио</h2>
      <ul className='portfolio__list'>
        {linkList.map((item, i) => {
          return (
            <li className='portfolio__item' key={`n_${i}_${item.name.split(' ').join('_')}`}>
              <Link className='portfolio__link' to={item.url} target='_blank'>
                <p className='portfolio__text'>{item.name}</p>
                <span className='portfolio__icon'>↗</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Portfolio;
