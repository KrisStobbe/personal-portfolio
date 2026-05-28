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
import { FaAws, FaNodeJs, FaDocker, FaJenkins, FaRProject } from 'react-icons/fa'
import { BsBootstrap } from 'react-icons/bs'
import {
  TbBrandNextjs,
  TbBrandTailwind,
  TbBrandVite,
  TbBrandRedux,
} from 'react-icons/tb'
import {
  SiJira,
  SiVisualstudiocode,
  SiIntellijidea,
  SiMongodb,
  SiMicrosoftsqlserver,
  SiAmazondynamodb,
  SiOracle,
  SiD3Dotjs,
  SiTypescript,
  SiTerraform,
  SiOpenai,
  SiSnowflake,
  SiSelenium,
  SiAmazoneks,
} from 'react-icons/si'
import { FaChartColumn } from 'react-icons/fa6'
import { ClaudeIcon } from 'components/icons/ClaudeIcon'
import { CursorIcon } from 'components/icons/CursorIcon'

interface TechnologyItem {
  name: string
  icon: JSX.Element
}

interface TechnologyCategory {
  category: string
  items: TechnologyItem[]
}

/** Curated short list highlighted at the top of the section — the technologies Kris is strongest in. */
export const HEADLINE_TECH: TechnologyItem[] = [
  { name: 'TypeScript', icon: <SiTypescript size={36} /> },
  { name: 'React', icon: <DiReact size={36} /> },
  { name: 'Node.js', icon: <FaNodeJs size={36} /> },
  { name: 'Python', icon: <DiPython size={36} /> },
  { name: 'Java', icon: <DiJava size={36} /> },
  { name: 'AWS', icon: <FaAws size={36} /> },
  { name: 'Terraform', icon: <SiTerraform size={36} /> },
  { name: 'Claude', icon: <ClaudeIcon size={36} /> },
]

export const TECHNOLOGIES: TechnologyCategory[] = [
  {
    category: 'Languages',
    items: [
      { name: 'TypeScript', icon: <SiTypescript size={32} /> },
      { name: 'JavaScript', icon: <DiJavascript1 size={32} /> },
      { name: 'Python', icon: <DiPython size={32} /> },
      { name: 'Java', icon: <DiJava size={32} /> },
      { name: 'HTML', icon: <AiFillHtml5 size={32} /> },
      { name: 'CSS', icon: <DiCss3 size={32} /> },
      { name: 'R', icon: <FaRProject size={32} /> },
      { name: 'SAS', icon: <FaChartColumn size={32} /> },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'React', icon: <DiReact size={32} /> },
      { name: 'Next.js', icon: <TbBrandNextjs size={32} /> },
      { name: 'Vite', icon: <TbBrandVite size={32} /> },
      { name: 'Redux', icon: <TbBrandRedux size={32} /> },
      { name: 'Tailwind', icon: <TbBrandTailwind size={32} /> },
      { name: 'Bootstrap', icon: <BsBootstrap size={32} /> },
      { name: 'D3.js', icon: <SiD3Dotjs size={32} /> },
    ],
  },
  {
    category: 'Backend',
    items: [
      { name: 'Node.js', icon: <FaNodeJs size={32} /> },
      { name: 'Express', icon: <AiOutlineCloudServer size={32} /> },
      { name: 'Flask', icon: <DiPython size={32} /> },
      { name: 'Spring Boot', icon: <DiJava size={32} /> },
      { name: 'Selenium', icon: <SiSelenium size={32} /> },
    ],
  },
  {
    category: 'Data',
    items: [
      { name: 'DynamoDB', icon: <SiAmazondynamodb size={32} /> },
      { name: 'MongoDB', icon: <SiMongodb size={32} /> },
      { name: 'MS SQL Server', icon: <SiMicrosoftsqlserver size={32} /> },
      { name: 'OracleDB', icon: <SiOracle size={32} /> },
      { name: 'Snowflake', icon: <SiSnowflake size={32} /> },
      { name: 'Power BI', icon: <FaChartColumn size={32} /> },
    ],
  },
  {
    category: 'AI',
    items: [
      { name: 'Claude', icon: <ClaudeIcon size={32} /> },
      { name: 'OpenAI', icon: <SiOpenai size={32} /> },
      { name: 'Cursor', icon: <CursorIcon size={32} /> },
      { name: 'Amazon Bedrock', icon: <FaAws size={32} /> },
    ],
  },
  {
    category: 'Cloud & DevOps',
    items: [
      { name: 'AWS', icon: <FaAws size={32} /> },
      { name: 'AWS CDK', icon: <FaAws size={32} /> },
      { name: 'SageMaker', icon: <FaAws size={32} /> },
      { name: 'Amazon EKS', icon: <SiAmazoneks size={32} /> },
      { name: 'Terraform', icon: <SiTerraform size={32} /> },
      { name: 'Docker', icon: <FaDocker size={32} /> },
      { name: 'Jenkins', icon: <FaJenkins size={32} /> },
      { name: 'GitHub Actions', icon: <AiFillGithub size={32} /> },
    ],
  },
  {
    category: 'Versioning & Productivity',
    items: [
      { name: 'Git', icon: <AiFillGithub size={32} /> },
      { name: 'GitHub', icon: <AiFillGithub size={32} /> },
      { name: 'GitLab', icon: <AiFillGitlab size={32} /> },
      { name: 'Jira', icon: <SiJira size={32} /> },
      { name: 'VS Code', icon: <SiVisualstudiocode size={32} /> },
      { name: 'IntelliJ', icon: <SiIntellijidea size={32} /> },
    ],
  },
]
