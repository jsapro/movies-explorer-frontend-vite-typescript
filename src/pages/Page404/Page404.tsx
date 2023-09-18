import { useNavigate } from 'react-router-dom';
import './Page404.css';

const Page404 = () => {
  const navigate = useNavigate();
  const getBack = () => {
    navigate(-1);
  };

  return (
    <main className='page404'>
      <h1 className='page404__title'>404</h1>
      <p className='page404__description'>Страница не найдена</p>
      <button className='page404__button' type='button' onClick={getBack}>
        Назад
      </button>
    </main>
  );
};

export default Page404;
