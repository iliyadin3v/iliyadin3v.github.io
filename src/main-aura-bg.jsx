import { boot } from './boot.jsx';
import { CaseStudy } from './pages/CaseStudy.jsx';
import * as content from './content/bg.js';

boot(<CaseStudy slug="aura" />, { lang: 'bg', path: '/work/aura/', content });
