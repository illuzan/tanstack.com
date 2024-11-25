import * as React from 'react'
import { Link, Outlet, createFileRoute } from '@tanstack/react-router'
import { Carbon } from '~/components/Carbon'
import { seo } from '~/utils/seo'
import { CgClose, CgMenuLeft } from 'react-icons/cg'

const logo = (
  <>
    <Link to="/" className="font-light">
      TanStack
    </Link>
    <Link to="." className={`font-bold`}>
      <span className="inline-block bg-linear-to-r from-rose-500 via-purple-500 to-yellow-500 bg-clip-text text-transparent">
        Blog
      </span>
    </Link>
  </>
)

const localMenu = [
  {
    label: 'Blog',
    children: [
      {
        label: 'Latest Posts',
        to: '.',
      },
    ],
  },
] as const

export const Route = createFileRoute('/blog')({
  head: () => ({
    meta: seo({
      title: 'Blog | TanStack',
      description: 'The latest news and blog posts from TanStack!',
    }),
  }),
  component: Blog,
})

export function PostNotFound() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-6 p-4">
      <h1 className="flex flex-col text-center font-black opacity-10">
        <div className="text-7xl leading-none">404</div>
        <div className="text-3xl leading-none">Not Found</div>
      </h1>
      <div className="text-lg">Post not found.</div>
      <Link
        to="/blog"
        className={`rounded-sm bg-gray-600 px-4 py-2 font-extrabold text-white uppercase dark:bg-gray-700`}
      >
        Blog Home
      </Link>
    </div>
  )
}

function Blog() {
  const detailsRef = React.useRef<HTMLDetailsElement>(null!)

  const menuItems = localMenu.map((group) => {
    return (
      <div key={group.label}>
        <div className="text-[.9em] font-black uppercase">{group.label}</div>
        <div className="h-2" />
        <div className="space-y-2 pl-2 text-[.9em]">
          {group.children?.map((child, i) => {
            return (
              <div key={i}>
                {child.to.startsWith('http') ? (
                  <a href={child.to}>{child.label}</a>
                ) : (
                  <Link
                    to={child.to}
                    activeProps={{
                      className: `font-bold text-transparent bg-clip-text bg-linear-to-r from-rose-500 to-violet-600`,
                    }}
                    onClick={() => {
                      detailsRef.current.removeAttribute('open')
                    }}
                    activeOptions={{
                      exact: true,
                    }}
                  >
                    {child.label}
                  </Link>
                )}
              </div>
            )
          })}
        </div>
      </div>
    )
  })

  const smallMenu = (
    <div className="sticky top-0 z-20 bg-white lg:hidden dark:bg-black">
      <details
        ref={detailsRef}
        id="docs-details"
        className="border-b border-gray-500/20"
      >
        <summary className="flex items-center justify-between gap-2 p-4">
          <div className="flex items-center gap-2 text-xl md:text-2xl">
            <CgMenuLeft className="icon-open mr-2 cursor-pointer" />
            <CgClose className="icon-close mr-2 cursor-pointer" />
            {logo}
          </div>
        </summary>
        <div className="flex h-[0vh] flex-col gap-4 overflow-y-auto border-t border-gray-500/20 bg-gray-100 p-4 text-lg whitespace-nowrap dark:bg-gray-900">
          {menuItems}
        </div>
      </details>
    </div>
  )

  const largeMenu = (
    <div className="sticky top-0 z-20 hidden h-screen w-[250px] flex-col gap-4 lg:flex">
      <div className="flex items-center gap-2 px-4 pt-4 text-2xl">{logo}</div>
      <div></div>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 text-base whitespace-nowrap">
        {menuItems}
      </div>
      <div className="carbon-small absolute bottom-0 w-full">
        <Carbon />
      </div>
    </div>
  )

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {smallMenu}
      {largeMenu}
      <div className="flex min-h-0 flex-1 flex-col xl:pr-56 xl:pl-44">
        <Outlet />
      </div>
    </div>
  )
}
