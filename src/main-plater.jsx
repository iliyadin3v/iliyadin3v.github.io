import { boot } from './boot.jsx';
import { CaseStudy } from './pages/CaseStudy.jsx';
import * as content from './content/en.js';

boot(<CaseStudy slug="plater" />, { lang: 'en', path: '/work/plater/', content });
