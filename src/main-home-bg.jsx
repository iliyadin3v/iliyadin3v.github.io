import { boot } from './boot.jsx';
import { Home } from './pages/Home.jsx';
import * as content from './content/bg.js';

boot(<Home />, { lang: 'bg', path: '/', content });
