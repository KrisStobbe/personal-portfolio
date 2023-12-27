import { BsFillEnvelopeOpenFill, BsGithub, BsLinkedin } from 'react-icons/bs'

export const SOCIAL_MEDIA = [
  {
    id: 'linkedin',
    icon: <BsLinkedin />,
    title: 'Visit LinkedIn profile',
    url: 'https://www.linkedin.com/in/krisstobbe',
  },
  {
    id: 'github',
    icon: <BsGithub />,
    title: 'Visit Github profile',
    url: 'https://github.com/krisstobbe',
  },
  {
    id: 'mail',
    icon: <BsFillEnvelopeOpenFill />,
    title: 'Send me an email',
    url: 'mailto://krisstobbe10@gmail.com',
  },
]
