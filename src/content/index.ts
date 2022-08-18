import { marked } from "marked";

import about from "~/content/about.md";
import contact from "~/content/contact.md";
import help from "~/content/help.md";

interface ContentMap {
  [key: string]: string;
}

const content: ContentMap = {
  about: marked(about),
  contact: marked(contact),
  help: marked(help),
};

export default content;
