import {
  AiFillHtml5,
  AiOutlineAntDesign,
  AiFillGithub,
  AiFillGitlab,
} from 'react-icons/ai'
import { DiCss3, DiVisualstudio } from 'react-icons/di'
import { IoLogoJavascript } from 'react-icons/io'
import { FaReact, FaWordpressSimple, FaFigma, FaTrello } from 'react-icons/fa'
import { BsBootstrap } from 'react-icons/bs'
import { TbBrandNextjs, TbBrandTailwind } from 'react-icons/tb'
import { RiFlutterFill } from 'react-icons/ri'
import AdobeXDSVG from 'public/assets/svg/adobexd.svg'
import ZeplinSVG from 'public/assets/svg/zeplin.svg'
import WebstormSVG from 'public/assets/svg/webstorm.svg'
import JiraSVG from 'public/assets/svg/jira.svg'
import HeadlessUiSVG from 'public/assets/svg/headlessui.svg'
import MuiSVG from 'public/assets/svg/mui.svg'
import ChakraSVG from 'public/assets/svg/chakraui.svg'
import StyledSVG from 'public/assets/svg/styledcomponents.svg'

export const TECHNOLOGIES = [
  {
    category: 'Mobile',
    items: [{ name: 'Flutter', icon: <RiFlutterFill size={32} /> }],
  },
  {
    category: 'Front-end',
    items: [
      { name: 'HTML', icon: <AiFillHtml5 size={32} /> },
      { name: 'CSS', icon: <DiCss3 size={32} /> },
      { name: 'JS', icon: <IoLogoJavascript size={32} /> },
      { name: 'React', icon: <FaReact size={32} /> },
      { name: 'Next', icon: <TbBrandNextjs size={32} /> },
      { name: 'Tailwind CSS', icon: <TbBrandTailwind size={32} /> },
      { name: 'MUI', icon: <img src={MuiSVG} alt="MUI" width={32} /> },
      { name: 'AntD', icon: <AiOutlineAntDesign size={32} /> },
      { name: 'Bootstrap', icon: <BsBootstrap size={32} /> },
      {
        name: 'Chakra',
        icon: <img src={ChakraSVG} alt="Chakra UI" width={32} />,
      },
      {
        name: 'styled components',
        icon: <img src={StyledSVG} alt="Styled Components" width={32} />,
      },
      {
        name: 'HeadlessUI',
        icon: <img src={HeadlessUiSVG} alt="Headless UI" width={32} />,
      },
    ],
  },
  {
    category: 'UI tools',
    items: [
      { name: 'Figma', icon: <FaFigma size={32} /> },
      { name: 'Zeplin', icon: <img src={ZeplinSVG} alt="Zeplin" width={36} /> },
      { name: 'XD', icon: <img src={AdobeXDSVG} alt="Adobe XD" width={32} /> },
    ],
  },
  {
    category: 'Other tools',
    items: [
      { name: 'WordPress CMS', icon: <FaWordpressSimple size={32} /> },
      { name: 'Jira', icon: <img src={JiraSVG} alt="Jira" width={32} /> },
      { name: 'Trello', icon: <FaTrello size={32} /> },
      { name: 'Github', icon: <AiFillGithub size={32} /> },
      { name: 'Gitlab', icon: <AiFillGitlab size={32} /> },
      { name: 'VsCode', icon: <DiVisualstudio size={32} /> },
      {
        name: 'WebStorm',
        icon: <img src={WebstormSVG} alt="WebStorm" width={32} />,
      },
    ],
  },
]
