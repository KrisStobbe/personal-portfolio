import { BsFillEnvelopeOpenFill, BsGithub, BsLinkedin } from 'react-icons/bs'

/**
 * Social media / contact links rendered by the {@link ConnectMedia} component.
 *
 * Each entry has:
 * - `id`: unique identifier used as a React key
 * - `icon`: ReactNode rendered as the link's visual
 * - `title`: accessible tooltip / aria label
 * - `url`: destination URL (can be `mailto:` or `https:`)
 */
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
