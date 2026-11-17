import { boot } from './boot.jsx';
import { CaseStudy } from './pages/CaseStudy.jsx';
import { vault } from './content/vault.js';

boot(<CaseStudy study={vault} />);
