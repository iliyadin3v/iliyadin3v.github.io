import { boot } from './boot.jsx';
import { Home } from './pages/Home.jsx';
import * as content from './content/en.js';

boot(<Home />, { lang: 'en', path: '/', content });
