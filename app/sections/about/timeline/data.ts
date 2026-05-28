export interface TimeLineItem {
  year: number
  /** Short calendar label shown under the title, e.g. "Mar 2020". */
  displayDate: string
  /** Role, degree, or milestone name. */
  title: string
  /** Company, school, or institution. */
  org: string
  /** One sentence framing the milestone, not a resume bullet. */
  summary: string
}

export const TimeLineData: TimeLineItem[] = [
  {
    year: 2018,
    displayDate: 'May 2018',
    title: 'B.S. Electrical & Computer Engineering',
    org: 'Baylor University',
    summary: 'Graduated from Baylor with a Minor in Mathematics.',
  },
  {
    year: 2018,
    displayDate: 'Jul 2018',
    title: 'Technical Support Engineer',
    org: 'SAS Institute',
    summary:
      'First role out of school, supporting analysts and engineers across data analytics and machine learning.',
  },
  {
    year: 2020,
    displayDate: 'Mar 2020',
    title: 'Data Analyst & Engineer',
    org: 'SunPower',
    summary:
      'Automated data operations and built pipelines feeding the solar business.',
  },
  {
    year: 2021,
    displayDate: 'Jan 2021',
    title: 'Software Engineer',
    org: 'SunPower',
    summary:
      'Promoted into the Software Engineering team to build full-stack tools and reporting platforms.',
  },
  {
    year: 2022,
    displayDate: 'Jan 2022',
    title: 'Sr. Software Engineer',
    org: 'SunPower',
    summary:
      'Stepped into technical leadership and launched a React financial app powering $2M+ in annual solar loans.',
  },
  {
    year: 2023,
    displayDate: '2023',
    title: 'M.S. Data Analytics',
    org: 'Georgia Tech',
    summary:
      'Completed graduate work focused on analytics, machine learning, and statistics.',
  },
  {
    year: 2024,
    displayDate: 'Aug 2024',
    title: 'Software Engineer II',
    org: 'FloQast',
    summary:
      'Earned an Operational Excellence Award for an AI-driven GL-mapping tool.',
  },
  {
    year: 2025,
    displayDate: 'Oct 2025',
    title: 'Software Engineer III',
    org: 'FloQast',
    summary:
      "Leading design of an event-driven reconciliation engine for FloQast's largest enterprise customers.",
  },
]
