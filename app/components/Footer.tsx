import { Link } from '@tanstack/react-router'

const footerLinks = [
  { label: 'Blog', to: '/blog' },
  { label: '@Tan_Stack Twitter', to: 'https://twitter.com/tan_stack' },
  {
    label: '@TannerLinsley Twitter',
    to: 'https://twitter.com/tannerlinsley',
  },
  { label: 'GitHub', to: 'https://github.com/tanstack' },
  {
    label: 'Youtube',
    to: 'https://www.youtube.com/user/tannerlinsley',
  },
  {
    label: 'Nozzle.io - Keyword Rank Tracker',
    to: 'https://nozzle.io',
  },
]

export function Footer() {
  return (
    <div
      className={`mx-auto flex max-w-(--breakpoint-lg) flex-col items-start justify-center gap-4 rounded-t-lg bg-white p-8 text-sm shadow-xl shadow-black/10 dark:bg-gray-800`}
    >
      <div className={`grid gap-1 sm:grid-cols-2 md:grid-cols-3`}>
        {footerLinks.map((item) => (
          <div key={item.to}>
            {item.to.startsWith('http') ? (
              <a href={item.to} target="_blank">
                {item.label}
              </a>
            ) : (
              <Link to={item.to}>{item.label}</Link>
            )}
          </div>
        ))}
      </div>
      <div className={`text-center opacity-20`}>
        &copy; {new Date().getFullYear()} TanStack LLC
      </div>
    </div>
  )
}
