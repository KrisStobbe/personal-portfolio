'use client'

import { LazyMotion, domAnimation, m } from 'framer-motion'
import { useTheme } from 'next-themes'

/**
 * WelcomeAnimation: animated SVG background for the hero section.
 */
export function WelcomeAnimation() {
  const { theme, systemTheme } = useTheme()
  const colorMode = theme === 'system' ? systemTheme : theme
  const darkThemeColor = colorMode === 'dark'

  const baseStroke = darkThemeColor ? '#ffffff' : '#000000'
  const trailStroke = darkThemeColor ? '#60a5fa' : '#1d4ed8'

  const path0 =
    'M201.337 87.437C193.474 79.5738 180.725 79.5738 172.862 87.437L87.437 172.862C79.5739 180.725 79.5739 193.474 87.437 201.337L400.663 514.563C408.526 522.426 421.275 522.426 429.138 514.563L514.563 429.138C522.426 421.275 522.426 408.526 514.563 400.663L201.337 87.437ZM30.4869 115.912C-8.82897 155.228 -8.82897 218.972 30.4869 258.287L343.713 571.513C383.028 610.829 446.772 610.829 486.088 571.513L571.513 486.088C610.829 446.772 610.829 383.028 571.513 343.713L258.287 30.4869C218.972 -8.82896 155.228 -8.82896 115.912 30.4869L30.4869 115.912Z'
  const path1 =
    'M514.563 201.337C522.426 193.474 522.426 180.725 514.563 172.862L429.138 87.437C421.275 79.5738 408.526 79.5739 400.663 87.437L358.098 130.002L301.148 73.0516L343.713 30.4869C383.028 -8.82896 446.772 -8.82896 486.088 30.4869L571.513 115.912C610.829 155.228 610.829 218.972 571.513 258.287L357.802 471.999L300.852 415.049L514.563 201.337Z'
  const path2 =
    'M243.901 471.999L201.337 514.563C193.474 522.426 180.725 522.426 172.862 514.563L87.437 429.138C79.5739 421.275 79.5739 408.526 87.437 400.663L301.148 186.952L244.198 130.002L30.4869 343.713C-8.82897 383.028 -8.82897 446.772 30.4869 486.088L115.912 571.513C155.228 610.829 218.972 610.829 258.287 571.513L300.852 528.949L243.901 471.999Z'

  // Each trail: a small visible dash segment that travels around a normalized
  // path of length 1000. The offset animates from 0 to -1000 over `dur`, so
  // the segment flows continuously and seamlessly around the path.
  const Trail = ({
    d,
    dur,
    begin = '0s',
    segment = 80,
  }: {
    d: string
    dur: string
    begin?: string
    segment?: number
  }) => (
    <path
      d={d}
      fill="none"
      stroke={trailStroke}
      strokeWidth={1}
      strokeLinecap="round"
      pathLength={1000}
      strokeDasharray={`${segment} ${1000 - segment}`}
      style={{ filter: 'url(#trailGlow)' }}
    >
      <animate
        attributeName="stroke-dashoffset"
        from="0"
        to="-1000"
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        calcMode="linear"
      />
    </path>
  )

  return (
    <LazyMotion features={domAnimation}>
      <m.div
        initial={{ opacity: 0, x: 100 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{
          duration: 0.9,
          ease: [0.17, 0.55, 0.55, 1],
          delay: 1,
        }}
      >
        <svg
          className="BgAnimation__svg"
          viewBox="0 0 602 602"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="trailGlow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="2.2" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Static interlocking shapes */}
          <g opacity="0.15" stroke={baseStroke} fill="none">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d={path0}
              id="path_0"
            />
            <path d={path1} id="path_1" />
            <path d={path2} id="path_2" />
          </g>

          {/* Smooth flowing light trails */}
          <g opacity="0.62">
            <Trail d={path0} dur="16s" />
            <Trail d={path0} dur="16s" begin="-8s" segment={55} />
            <Trail d={path1} dur="14s" begin="-2.5s" />
            <Trail d={path1} dur="14s" begin="-9.5s" segment={55} />
            <Trail d={path2} dur="18s" begin="-5s" />
            <Trail d={path2} dur="18s" begin="-12s" segment={55} />
          </g>
        </svg>
      </m.div>
    </LazyMotion>
  )
}
