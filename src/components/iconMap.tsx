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
  SiNodedotjs,
  SiExpress,
  SiVuedotjs,
  SiAngular,
  SiBootstrap,
  SiSass,
  SiPostgresql,
  SiRedis,
  SiAmazon,
  SiVercel,
  SiHeroku,
  SiPostman,
  SiFigma,
} from 'react-icons/si';

import { FaJava, FaCode } from 'react-icons/fa';
import { ReactElement } from 'react';

const iconMap: Record<string, ReactElement> = {
  // Frontend
  html: <SiHtml5 />,
  css: <SiCss3 />,
  javascript: <SiJavascript />,
  typescript: <SiTypescript />,
  react: <SiReact />,
  nextjs: <SiNextdotjs />,
  vue: <SiVuedotjs />,
  angular: <SiAngular />,
  tailwind: <SiTailwindcss />,
  bootstrap: <SiBootstrap />,
  sass: <SiSass />,
  
  // Backend
  nodejs: <SiNodedotjs />,
  express: <SiExpress />,
  python: <SiPython />,
  java: <FaJava />,
  cplusplus: <SiCplusplus />,
  firebase: <SiFirebase />,
  
  // Mobile
  flutter: <SiFlutter />,
  dart: <SiDart />,
  
  // AI/ML
  numpy: <SiNumpy />,
  pandas: <SiPandas />,
  scikitlearn: <SiScikitlearn />,
  tensorflow: <SiTensorflow />,
  
  // Databases
  mysql: <SiMysql />,
  mongodb: <SiMongodb />,
  postgresql: <SiPostgresql />,
  redis: <SiRedis />,
  
  // Tools & Services
  git: <SiGit />,
  docker: <SiDocker />,
  linux: <SiLinux />,
  vscode: <FaCode />,
  postman: <SiPostman />,
  figma: <SiFigma />,
  
  // Cloud & Deployment
  aws: <SiAmazon />,
  vercel: <SiVercel />,
  netlify: <SiNetlify />,
  heroku: <SiHeroku />,
};

export default iconMap;
