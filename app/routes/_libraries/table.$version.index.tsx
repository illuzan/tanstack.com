import * as React from 'react'
import { CgCornerUpLeft, CgSpinner } from 'react-icons/cg'
import {
  FaBolt,
  FaBook,
  FaCheckCircle,
  FaCogs,
  FaDiscord,
  FaGithub,
  FaTshirt,
} from 'react-icons/fa'
import { Link, createFileRoute, getRouteApi } from '@tanstack/react-router'
import { tableProject } from '~/libraries/table'
import { Carbon } from '~/components/Carbon'
import { Footer } from '~/components/Footer'
import { IoIosBody } from 'react-icons/io'
import SponsorPack from '~/components/SponsorPack'
import { VscPreview } from 'react-icons/vsc'
import agGridImage from '~/images/ag-grid.png'
import { Await } from '@tanstack/react-router'
import { Framework, getBranch } from '~/libraries'
import { seo } from '~/utils/seo'
import { getInitialSandboxFileName } from '~/utils/sandbox'
import { partners } from '~/utils/partners'
import { TbHeartHandshake } from 'react-icons/tb'

const menu = [
  {
    label: (
      <div className="flex items-center gap-2">
        <CgCornerUpLeft className="text-lg" /> TanStack
      </div>
    ),
    to: '/',
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <VscPreview className="text-lg" /> Examples
      </div>
    ),
    to: './docs/framework/react/examples/basic',
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <FaBook className="text-lg" /> Docs
      </div>
    ),
    to: './docs/introduction',
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <FaGithub className="text-lg" /> GitHub
      </div>
    ),
    to: `https://github.com/${tableProject.repo}`,
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <FaDiscord className="text-lg" /> Discord
      </div>
    ),
    to: 'https://tlinz.com/discord',
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <FaTshirt className="text-lg" /> Merch
      </div>
    ),
    to: `https://cottonbureau.com/people/tanstack`,
  },
]

export const Route = createFileRoute('/_libraries/table/$version/')({
  component: TableVersionIndex,
  head: () => ({
    meta: seo({
      title: tableProject.name,
      description: tableProject.description,
    }),
  }),
})

const librariesRouteApi = getRouteApi('/_libraries')

export default function TableVersionIndex() {
  const { sponsorsPromise } = librariesRouteApi.useLoaderData()
  const { version } = Route.useParams()
  const branch = getBranch(tableProject, version)
  const [framework, setFramework] = React.useState<Framework>('react')
  const [isDark, setIsDark] = React.useState(true)

  const sandboxFirstFileName = getInitialSandboxFileName(framework)

  React.useEffect(() => {
    setIsDark(window.matchMedia?.(`(prefers-color-scheme: dark)`).matches)
  }, [])

  const gradientText = `inline-block text-transparent bg-clip-text bg-linear-to-r ${tableProject.colorFrom} ${tableProject.colorTo}`

  return (
    <div className="flex max-w-full flex-col gap-20 md:gap-32">
      <div className="mx-auto flex max-w-(--breakpoint-xl) flex-wrap items-center justify-center px-4 py-2 text-sm md:self-end md:text-base">
        {menu?.map((item, i) => {
          const label = (
            <div className="p-2 opacity-90 hover:opacity-100">{item.label}</div>
          )

          return (
            <div key={i} className="hover:underline">
              {item.to.startsWith('http') ? (
                <a href={item.to}>{label}</a>
              ) : (
                <Link to={item.to} params>
                  {label}
                </Link>
              )}
            </div>
          )
        })}
      </div>
      <div className="flex flex-col items-center gap-8 px-4 text-center">
        <div className="flex items-center gap-2 lg:gap-4">
          <h1
            className={`inline-block text-4xl font-black md:text-6xl lg:text-7xl`}
            style={{
              viewTransitionName: `library-name`,
            }}
          >
            <span className={`${gradientText}`}>TanStack Table</span>{' '}
            <span className="animate-bounce align-super text-[.5em] text-black dark:text-white">
              v8
            </span>
          </h1>
        </div>
        <h2 className="max-w-md text-2xl font-bold md:text-3xl lg:max-w-2xl lg:text-5xl">
          <span className="underline decoration-yellow-500 decoration-dashed decoration-3 underline-offset-2">
            Headless
          </span>{' '}
          UI for building powerful tables & datagrids
        </h2>
        <p className="text max-w-sm opacity-90 lg:max-w-2xl lg:text-xl">
          Supercharge your tables or build a datagrid from scratch for TS/JS,
          React, Vue, Solid, Svelte & Lit while retaining 100% control over
          markup and styles.
        </p>
        <Link
          to="./docs/introduction"
          className={`rounded-sm bg-teal-500 px-4 py-2 font-extrabold text-white uppercase`}
        >
          Get Started
        </Link>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 p-8 text-lg md:flex-row">
        <div className="flex flex-1 flex-col items-center gap-8">
          <div className="overflow-hidden text-center">
            <IoIosBody className="-mt-5 mb-5 origin-top scale-125 text-6xl text-teal-500" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-center text-xl font-black uppercase">
              Designed for zero design
            </h3>
            <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
              What good is a powerful table if that super hip designer you just
              hired can't work their UI magic on it?{' '}
              <span className="font-semibold text-teal-700 dark:text-teal-400">
                TanStack Table is headless by design
              </span>
              , which means 100% control down to the very smallest HTML tag,
              component, class and style. Pixel Perfection? Go for it!
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-8">
          <div className="text-center">
            <FaBolt className="text-6xl text-blue-600" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-center text-xl font-black uppercase">
              Big Power, Small Package
            </h3>
            <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
              Don't be fooled by the small bundle size. TanStack Table is a
              workhorse. It's built to materialize, filter, sort, group,
              aggregate, paginate and display massive data sets using a very
              small API surface. Wire up your new or existing tables and{' '}
              <span className="font-semibold text-blue-700 dark:text-blue-400">
                watch your users become instantly more productive
              </span>
              .
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-8">
          <div className="text-center">
            <FaCogs className="text-6xl text-indigo-500" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-center text-xl font-black uppercase">
              Extensible
            </h3>
            <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
              TanStack table ships with excellent defaults to get you off the
              ground as fast as possible, but nothing is stopping you from{' '}
              <span className="font-semibold text-indigo-700 dark:text-indigo-400">
                customizing and overriding literally everything to your liking
              </span>
              . Feeling tenacious enough to build your own Sheets/Excel/AirTable
              clone? Be our guest 😉
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-16 sm:text-center">
          <h3 className="mx-auto mt-2 text-center text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:leading-none">
            Framework Agnostic & Feature Rich
          </h3>
          <p className="mx-auto mt-4 max-w-3xl text-xl leading-7 opacity-60">
            TanStack Table's API and engine are highly modular and
            framework-independent while still prioritizing ergonomics. Behold,
            the obligatory feature-list:
          </p>
        </div>
        <div className="mx-auto grid grid-flow-row grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            'Lightweight (10 - 15kb)',
            'Tree-Shaking',
            'Headless',
            'Cell Formatters',
            'Auto-managed internal state',
            'Opt-in fully controlled state',
            'Sorting',
            'Multi Sort',
            'Global Filters',
            'Columns Filters',
            'Pagination',
            'Row Grouping',
            'Aggregation',
            'Row Selection',
            'Row Expansion',
            'Column Ordering',
            'Column Visibility',
            'Column Resizing',
            'Virtualizable',
            'Server-side/external Data',
            'Nested/Grouped Headers',
            'Footers',
          ].map((d, i) => {
            return (
              <span key={i} className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> {d}
              </span>
            )
          })}
        </div>
      </div>

      <div>
        <div className="mb-3 text-center text-sm font-semibold tracking-wider text-gray-400 uppercase">
          Trusted in Production by
        </div>
        {/* @ts-ignore */}
        <marquee scrollamount="2">
          <div className="ml-[-100%] flex items-center gap-2 text-3xl font-bold">
            {(new Array(4) as string[])
              .fill('')
              .reduce(
                (all) => [...all, ...all],
                [
                  'Intuit',
                  'Google',
                  'Amazon',
                  'Apple',
                  'AutoZone',
                  'Microsoft',
                  'Cisco',
                  'Uber',
                  'Salesforce',
                  'Walmart',
                  'Wix',
                  'HP',
                  'Docusign',
                  'Tripwire',
                  'Yahoo!',
                  'Ocado',
                  'Nordstrom',
                  'TicketMaster',
                  'Comcast Business',
                  'Nozzle.io',
                ],
              )
              .map((d, i) => (
                <span key={i} className="opacity-70 even:opacity-40">
                  {d}
                </span>
              ))}
          </div>
          {/* @ts-ignore */}
        </marquee>
      </div>

      <div className="mx-auto px-4 md:mx-auto lg:max-w-(--breakpoint-lg)">
        <h3 className="mt-8 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
          Partners
        </h3>
        <div className="h-8" />
        <div className={`grid max-w-[400px] grid-cols-1 gap-6`}>
          {partners
            .filter((d) => d.libraries?.includes('table'))
            .map((partner) => {
              return (
                <a
                  key={partner.name}
                  href={partner.href}
                  target="_blank"
                  className="group grid overflow-hidden rounded-lg border-gray-500/20 bg-white shadow-xl shadow-gray-500/20 dark:border dark:bg-gray-800 dark:shadow-none"
                  rel="noreferrer"
                >
                  <div className="z-0 col-start-1 row-start-1 flex items-center justify-center bg-white transition-all duration-200 group-hover:blur-xs">
                    {partner.homepageImg}
                  </div>
                  <div className="z-10 col-start-1 row-start-1 flex max-w-full flex-col items-start gap-4 bg-white/70 p-4 text-sm opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-gray-800/70">
                    {partner.content}
                  </div>
                </a>
              )
            })}
        </div>
      </div>

      <div className="relative overflow-hidden text-lg">
        <h3 className="mt-8 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
          Sponsors
        </h3>
        <div
          className="mx-auto my-4 flex max-w-(--breakpoint-lg) flex-wrap"
          style={{
            aspectRatio: '1/1',
          }}
        >
          <Await
            promise={sponsorsPromise}
            fallback={<CgSpinner className="animate-spin text-2xl" />}
            children={(sponsors) => {
              return <SponsorPack sponsors={sponsors} />
            }}
          />
        </div>
        <div className="text-center">
          <a
            href="https://github.com/sponsors/tannerlinsley"
            className="mx-auto inline-block rounded-full bg-green-500 px-4 py-2 text-xl leading-tight font-extrabold tracking-tight text-white"
          >
            Become a Sponsor!
          </a>
        </div>
      </div>

      <div className="mx-auto flex max-w-[400px] flex-col items-center gap-2">
        <div className="mx-auto max-w-[250px] overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:text-white">
          <Carbon />
        </div>
        <span className="rounded-sm bg-gray-500/10 px-2 py-1 text-[.7rem] text-gray-500 dark:bg-gray-500/20">
          This ad helps us be happy about our invested time and not burn out and
          rage-quit OSS. Yay money! 😉
        </span>
      </div>

      <div className="flex flex-col gap-4">
        <div className="container mx-auto max-w-3xl px-4 sm:px-6 sm:text-center lg:px-8">
          <h3 className="mt-2 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
            Take it for a spin!
          </h3>
          <p className="my-4 text-xl leading-7 text-gray-600">
            With some basic styles, some table markup and few columns, you're
            already well on your way to creating a drop-dead powerful table.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {(
              [
                { label: 'Angular', value: 'angular' },
                { label: 'Lit', value: 'lit' },
                { label: 'Qwik', value: 'qwik' },
                { label: 'React', value: 'react' },
                { label: 'Solid', value: 'solid' },
                { label: 'Svelte', value: 'svelte' },
                { label: 'Vue', value: 'vue' },
                { label: 'Vanilla', value: 'vanilla' },
              ] as const
            ).map((item) => (
              <button
                key={item.value}
                className={`inline-block rounded px-4 py-2 font-extrabold text-white uppercase ${
                  item.value === framework
                    ? 'bg-rose-500'
                    : 'bg-gray-300 hover:bg-rose-300 dark:bg-gray-700'
                }`}
                onClick={() => setFramework(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white dark:bg-black">
        <iframe
          key={framework}
          src={`https://stackblitz.com/github/${
            tableProject.repo
          }/tree/${branch}/examples/${framework}/basic?embed=1&theme=${
            isDark ? 'dark' : 'light'
          }&preset=node&file=${sandboxFirstFileName}`}
          title="tannerlinsley/react-table: basic"
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          className="shadow-2xl"
          loading="lazy"
          style={{
            width: '100%',
            height: '80vh',
            border: '0',
          }}
        ></iframe>
      </div>

      <div className="flex flex-col items-center gap-4">
        <div className="text-xl font-extrabold lg:text-2xl">
          Wow, you've come a long way!
        </div>
        <div className="font-sm italic opacity-70">
          Only one thing left to do...
        </div>
        <div>
          <Link
            to="./docs/introduction"
            className={`inline-block rounded-sm bg-teal-500 px-4 py-2 font-extrabold text-white uppercase`}
          >
            Get Started!
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
