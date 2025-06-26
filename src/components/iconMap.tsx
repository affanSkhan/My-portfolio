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
  SiMongodb,
  SiGit,
  SiDocker,
  SiNetlify,
  SiLinux,
  SiFlutter,
  SiDart,
  SiNumpy,
  SiPandas,
  SiScikitlearn,
  SiTensorflow,
} from 'react-icons/si';

import { FaJava, FaCode } from 'react-icons/fa';
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
  mongodb: <SiMongodb />,
  git: <SiGit />,
  docker: <SiDocker />,
  netlify: <SiNetlify />,
  linux: <SiLinux />,
  vscode: <FaCode />,
  flutter: <SiFlutter />,
  dart: <SiDart />,
  numpy: <SiNumpy />,
  pandas: <SiPandas />,
  scikitlearn: <SiScikitlearn />,
  tensorflow: <SiTensorflow />,
  java: <FaJava />,
};

export default iconMap;
