import { boot } from './boot.jsx';
import { CaseStudy } from './pages/CaseStudy.jsx';
import * as content from './content/bg.js';

boot(<CaseStudy slug="plater" />, { lang: 'bg', path: '/work/plater/', content });
