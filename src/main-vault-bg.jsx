import { boot } from './boot.jsx';
import { CaseStudy } from './pages/CaseStudy.jsx';
import * as content from './content/bg.js';

boot(<CaseStudy slug="vault" />, { lang: 'bg', path: '/work/vault/', content });
