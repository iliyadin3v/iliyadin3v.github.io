import { boot } from './boot.jsx';
import { CaseStudy } from './pages/CaseStudy.jsx';
import * as content from './content/en.js';

boot(<CaseStudy slug="aura" />, { lang: 'en', path: '/work/aura/', content });
