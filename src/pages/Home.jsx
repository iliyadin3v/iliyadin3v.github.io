import { Header } from '../components/Header.jsx';
import { useEffect, useRef, useState } from 'react';
import { NameBuilt } from '../components/NameBuilt.jsx';
import { Pillars } from '../components/Pillars.jsx';
import { Work } from '../components/Work.jsx';
import { About, Contact } from '../components/Sections.jsx';
import { Icon } from '../components/Icon.jsx';
import { hero, about, pillars, person } from '../content/site.js';
import { selected, archive, orderScene } from '../content/projects.js';
import './Home.css';

// The opening: the name as a built object, extruded on a drafting grid with interface parts on its
// letters, over a foot row with the thesis, the role and the two actions. The build pauses when the
// opening leaves the screen.
function Hero() {
  const ref = useRef(null);
  const [still, setStill] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el || !('IntersectionObserver' in window)) return;
    const io = new IntersectionObserver(([e]) => setStill(!e.isIntersecting));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <section className="hero" ref={ref} data-ground="night" data-still={still || undefined} aria-labelledby="hero-h">
      <h1 className="visually-hidden" id="hero-h">
        {person.name}
      </h1>
      <div className="hero__stage">
        <NameBuilt name={person.name} />
      </div>
      <div className="page hero__foot">
        <div className="hero__words">
          <p className="hero__lede">{hero.headline}</p>
          <p className="hero__intro">{hero.intro}</p>
        </div>
        <div className="hero__actions">
          <a className="btn btn--accent" href="#work">
            See the work <Icon name="arrow-down" />
          </a>
          <a className="hero__email" href="#contact">
            Email me
          </a>
        </div>
      </div>
    </section>
  );
}

export function Home() {
  return (
    <>
      <Header page="home" />
      <main id="main">
        <Hero />
        <Pillars items={pillars} />
        <Work projects={selected} archive={archive} scene={orderScene} />
        <About data={about} />
      </main>
      <Contact />
    </>
  );
}
