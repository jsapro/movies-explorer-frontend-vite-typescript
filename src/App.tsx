import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
// import Main from './pages/Main/Main';
// import Login from './pages/Login/Login';
// import Movies from './pages/Movies/Movies';
import Profile from './pages/Profile/Profile';
import Register from './pages/Register/Register';
import Page404 from './pages/Page404/Page404';
import AppApp from './components/App/AppApp';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
    
      {/* <Main></Main> */}
      {/* <Login></Login> */}
      {/* <Movies></Movies> */}
      <Profile></Profile>
      <Register></Register>
      <Page404></Page404>
      <AppApp></AppApp>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
