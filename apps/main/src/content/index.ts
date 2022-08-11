import { marked } from "marked";

import about from "~/content/about.md?raw";
import contact from "~/content/contact.md?raw";
import help from "~/content/help.md?raw";

interface ContentMap {
  [key: string]: string;
}

const content: ContentMap = {
  about: marked(about),
  contact: marked(contact),
  help: marked(help),
};

export default content;
