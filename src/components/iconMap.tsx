// components/iconMap.ts
import {
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiFirebase,
  SiPython,
  SiCplusplus,
  SiMysql,
  SiGit,
} from 'react-icons/si';

import { ReactElement } from 'react';

const iconMap: Record<string, ReactElement> = {
  html: <SiHtml5 />,
  css: <SiCss3 />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  react: <SiReact />,
  nextjs: <SiNextdotjs />,
  tailwind: <SiTailwindcss />,
  firebase: <SiFirebase />,
  python: <SiPython />,
  cplusplus: <SiCplusplus />,
  mysql: <SiMysql />,
  git: <SiGit />,
};

export default iconMap;
