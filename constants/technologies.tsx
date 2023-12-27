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
import { FaAws, FaDatabase } from 'react-icons/fa'
import { BsBootstrap } from 'react-icons/bs'
import { TbBrandNextjs, TbBrandTailwind } from 'react-icons/tb'
import {
  SiSwift,
  SiAndroid,
  SiJira,
  SiVisualstudiocode,
  SiIntellijidea,
} from 'react-icons/si'

export const TECHNOLOGIES = [
  {
    category: 'Front-end',
    items: [
      { name: 'HTML', icon: <AiFillHtml5 size={32} /> },
      { name: 'CSS', icon: <DiCss3 size={32} /> },
      { name: 'JS', icon: <DiJavascript1 size={32} /> },
      { name: 'React', icon: <DiReact size={32} /> },
      { name: 'Next', icon: <TbBrandNextjs size={32} /> },
      { name: 'Tailwind CSS', icon: <TbBrandTailwind size={32} /> },
      { name: 'Bootstrap', icon: <BsBootstrap size={32} /> },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Express.js', icon: <AiOutlineCloudServer size={32} /> },
      { name: 'Flask.py', icon: <DiPython size={32} /> },
      { name: 'Spring', icon: <DiJava size={32} /> },
      { name: 'MongoDB', icon: <FaDatabase size={32} /> },
      { name: 'DynamoDB', icon: <FaDatabase size={32} /> },
    ],
  },
  {
    category: 'Mobile',
    items: [
      { name: 'React-Native', icon: <DiReact size={32} /> },
      { name: 'iOS (Swift)', icon: <SiSwift size={32} /> },
      { name: 'Android', icon: <SiAndroid size={32} /> },
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
  {
    category: 'Analytics',
    items: [
      { name: 'NumPy', icon: <DiPython size={32} /> },
      { name: 'Pandas', icon: <DiPython size={32} /> },
      { name: 'Matplotlib', icon: <DiPython size={32} /> },
      { name: 'Chart.js', icon: <DiJavascript1 size={32} /> },
      { name: 'D3.js', icon: <DiJavascript1 size={32} /> },
    ],
  },
  {
    category: 'DevOps',
    items: [{ name: 'AWS', icon: <FaAws size={32} /> }],
  },
]
