import {
  AiFillHtml5,
  AiFillGithub,
  AiFillGitlab,
  AiOutlineCloudServer,
} from 'react-icons/ai'
import {
  DiCss3,
  DiJavascript1,
  DiReact,
  DiJava,
  DiPython,
} from 'react-icons/di'
import { FaAws, FaNodeJs } from 'react-icons/fa'
import { BsBootstrap } from 'react-icons/bs'
import { TbBrandNextjs, TbBrandTailwind } from 'react-icons/tb'
import {
  SiJira,
  SiVisualstudiocode,
  SiIntellijidea,
  SiMongodb,
  SiPostgresql,
  SiAmazondynamodb,
  SiOracle,
  SiNumpy,
  SiPandas,
  SiD3Dotjs,
  SiTypescript,
} from 'react-icons/si'
import { FaChartColumn } from 'react-icons/fa6'

export const TECHNOLOGIES = [
  {
    category: 'Frontend',
    items: [
      { name: 'JavaScript', icon: <DiJavascript1 size={32} /> },
      { name: 'TypeScript', icon: <SiTypescript size={32} /> },
      { name: 'React', icon: <DiReact size={32} /> },
      { name: 'Next', icon: <TbBrandNextjs size={32} /> },
      { name: 'HTML', icon: <AiFillHtml5 size={32} /> },
      { name: 'CSS', icon: <DiCss3 size={32} /> },
      { name: 'Tailwind', icon: <TbBrandTailwind size={32} /> },
      { name: 'Bootstrap', icon: <BsBootstrap size={32} /> },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: <FaNodeJs size={32} /> },
      { name: 'Express.js', icon: <AiOutlineCloudServer size={32} /> },
      { name: 'Flask.py', icon: <DiPython size={32} /> },
      { name: 'Java Spring Boot', icon: <DiJava size={32} /> },
    ],
  },
  {
    category: 'Databases',
    items: [
      { name: 'PostgreSQL', icon: <SiPostgresql size={32} /> },
      { name: 'MongoDB', icon: <SiMongodb size={32} /> },
      { name: 'DynamoDB', icon: <SiAmazondynamodb size={32} /> },
      { name: 'OracleDB', icon: <SiOracle size={32} /> },
    ],
  },
  {
    category: 'DevOps',
    items: [
      { name: 'AWS', icon: <FaAws size={32} /> },
      { name: 'Github Actions', icon: <AiFillGithub size={32} /> },
    ],
  },
  {
    category: 'Analytics',
    items: [
      { name: 'NumPy', icon: <SiNumpy size={32} /> },
      { name: 'Pandas', icon: <SiPandas size={32} /> },
      { name: 'Matplotlib', icon: <DiPython size={32} /> },
      { name: 'Chart.js', icon: <FaChartColumn size={32} /> },
      { name: 'D3.js', icon: <SiD3Dotjs size={32} /> },
    ],
  },
  {
    category: 'Versioning & Productivity',
    items: [
      { name: 'Github', icon: <AiFillGithub size={32} /> },
      { name: 'Gitlab', icon: <AiFillGitlab size={32} /> },
      { name: 'Jira', icon: <SiJira size={32} /> },
      { name: 'VS Code', icon: <SiVisualstudiocode size={32} /> },
      { name: 'IntelliJ', icon: <SiIntellijidea size={32} /> },
    ],
  },
]
