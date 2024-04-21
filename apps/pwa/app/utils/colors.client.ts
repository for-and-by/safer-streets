import twconfig from "../../tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const config = resolveConfig(twconfig);

const colors = config?.theme?.colors as { [key: string]: string };

export default colors;
