import './Main.css';
import Header from '../../components/ui/Header/Header';
import Promo from '../../components/ui/Promo/Promo';
import AboutProject from '../../components/ui/AboutProject/AboutProject';
import Techs from '../../components/ui/Techs/Techs';
import AboutMe from '../../components/ui/AboutMe/AboutMe';
import Portfolio from '../../components/ui/Portfolio/Portfolio';
import Footer from '../../components/ui/Footer/Footer';
import MainProps from './types';

const Main = ({ isLoggedIn }: MainProps) => {
  return (
    <>
      <Header isLoggedIn={isLoggedIn} />
      <main>
        <Promo />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
};

export default Main;
