import { PrismLight } from "react-syntax-highlighter";
import bash from "react-syntax-highlighter/dist/esm/languages/prism/bash";
import python from "react-syntax-highlighter/dist/esm/languages/prism/python";
import toml from "react-syntax-highlighter/dist/esm/languages/prism/toml";

/**
 * Prism with only the languages this site actually renders.
 *
 * The default `Prism` export registers all 272 language definitions, which rsdoctor
 * measured at 859 kB in one chunk — for three languages. `PrismLight` ships the core
 * and takes registrations, so add a line here when a snippet needs a new language.
 */
PrismLight.registerLanguage("bash", bash);
PrismLight.registerLanguage("python", python);
PrismLight.registerLanguage("toml", toml);

export { PrismLight as SyntaxHighlighter };
