import { marked } from 'marked';

import about from '~/content/about.md?raw';
import contact from '~/content/contact.md?raw';
import disclaimer from '~/content/disclaimer.md?raw';
import help from '~/content/help.md?raw';

interface ContentMap {
  [key: string]: string;
}

const content: ContentMap = {
	about: marked(about),
	help: marked(help),
	disclaimer: marked(disclaimer),
	contact: marked(contact),
};

export default content;
