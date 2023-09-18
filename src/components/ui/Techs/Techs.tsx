import './Techs.css';

const Techs = () => {
  const techList = ['HTML', 'CSS', 'JS', 'React', 'Git', 'Express.js', 'mongoDB'];

  return (
    <section className='techs' id='techs'>
      <h2 className='techs__title'>Технологии</h2>
      <div className='techs__container'>
        <h3 className='techs__subtitle'>7 технологий</h3>
        <p className='techs__description'>
          На курсе веб-разработки мы освоили технологии, которые применили в дипломном проекте.
        </p>
        <ul className='techs__list'>
          {techList.map((tech, i) => {
            return (
              <li className='techs__item' key={`n_${i}_${tech}`}>
                {tech}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Techs;
