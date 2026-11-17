import { boot } from './boot.jsx';
import { NotFound } from './pages/NotFound.jsx';
import * as content from './content/en.js';

boot(<NotFound />, { lang: 'en', path: '/', content });
