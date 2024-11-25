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
import { Await, Link, getRouteApi } from '@tanstack/react-router'
import { Carbon } from '~/components/Carbon'
import { Footer } from '~/components/Footer'
import { VscPreview, VscWand } from 'react-icons/vsc'
import { TbHeartHandshake } from 'react-icons/tb'
import SponsorPack from '~/components/SponsorPack'
import { QueryGGBanner } from '~/components/QueryGGBanner'
import { queryProject } from '~/libraries/query'
import { LogoQueryGG } from '~/components/LogoQueryGG'
import { createFileRoute } from '@tanstack/react-router'
import { Framework, getBranch } from '~/libraries'
import { seo } from '~/utils/seo'

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
    to: './docs/',
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <FaGithub className="text-lg" /> GitHub
      </div>
    ),
    to: `https://github.com/${queryProject.repo}`,
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

export const Route = createFileRoute('/_libraries/query/$version/')({
  component: VersionIndex,
  head: () => ({
    meta: seo({
      title: queryProject.name,
      description: queryProject.description,
    }),
  }),
})

const librariesRouteApi = getRouteApi('/_libraries')

export default function VersionIndex() {
  const { sponsorsPromise } = librariesRouteApi.useLoaderData()
  const { version } = Route.useParams()
  const branch = getBranch(queryProject, version)
  const [framework, setFramework] = React.useState<Framework>('react')
  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    setIsDark(window.matchMedia?.(`(prefers-color-scheme: dark)`).matches)
  }, [])

  const gradientText = `inline-block leading-snug text-transparent bg-clip-text bg-linear-to-r ${queryProject.colorFrom} ${queryProject.colorTo}`

  return (
    <div className="relative flex min-h-0 flex-1 flex-col overflow-x-hidden">
      <QueryGGBanner />
      <div className="relative flex min-h-0 flex-1 justify-center overflow-x-hidden">
        <div className="flex max-w-full flex-col gap-20 md:gap-32">
          <div className="mx-auto flex max-w-(--breakpoint-xl) flex-wrap items-center justify-center px-4 py-2 text-sm md:self-end md:text-base">
            {menu?.map((item, i) => {
              const label = (
                <div className="p-2 opacity-90 hover:opacity-100">
                  {item.label}
                </div>
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
                <span className={gradientText}>TanStack Query</span>{' '}
                <span className="animate-bounce align-super text-[.5em] text-black dark:text-white">
                  {version === 'latest' ? queryProject.latestVersion : version}
                </span>
              </h1>
            </div>
            <h2 className="max-w-md text-2xl font-bold md:text-3xl lg:max-w-2xl lg:text-5xl">
              Powerful{' '}
              <span className="underline decoration-yellow-500 decoration-dashed decoration-3 underline-offset-2">
                asynchronous state management
              </span>{' '}
              for TS/JS, React, Solid, Vue, Svelte and Angular
            </h2>
            <p className="text max-w-[500px] opacity-90 lg:max-w-[600px] lg:text-xl">
              Toss out that granular state management, manual refetching and
              endless bowls of async-spaghetti code. TanStack Query gives you
              declarative, always-up-to-date auto-managed queries and mutations
              that{' '}
              <strong>
                directly improve both your developer and user experiences
              </strong>
              .
            </p>
            <Link
              to="./docs/"
              className={`rounded-sm bg-red-500 px-4 py-2 font-extrabold text-white uppercase`}
            >
              Read the Docs
            </Link>
            <p>
              (or check out{' '}
              <a
                href="https://query.gg?s=tanstack"
                className={`${gradientText} underline`}
              >
                query.gg
              </a>{' '}
              – the official React Query course)
            </p>
          </div>
          <div className="mx-auto flex max-w-[1200px] flex-col gap-12 p-8 text-lg md:flex-row">
            <div className="flex flex-1 flex-col items-center gap-8">
              <VscWand className="text-6xl text-red-500" />
              <div className="flex flex-col gap-4">
                <h3 className="text-center text-xl font-black uppercase">
                  Declarative & Automatic
                </h3>
                <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
                  Writing your data fetching logic by hand is over. Tell
                  TanStack Query where to get your data and how fresh you need
                  it to be and the rest is automatic. It handles{' '}
                  <span className="font-semibold text-red-700 dark:text-red-400">
                    caching, background updates and stale data out of the box
                    with zero-configuration
                  </span>
                  .
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-8">
              <div className="text-center">
                <FaBolt className="text-6xl text-orange-600" />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-center text-xl font-black uppercase">
                  Simple & Familiar
                </h3>
                <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
                  If you know how to work with promises or async/await, then you
                  already know how to use TanStack Query. There's{' '}
                  <span className="font-semibold text-orange-700 dark:text-orange-400">
                    no global state to manage, reducers, normalization systems
                    or heavy configurations to understand
                  </span>
                  . Simply pass a function that resolves your data (or throws an
                  error) and the rest is history.
                </p>
              </div>
            </div>
            <div className="flex flex-1 flex-col items-center gap-8">
              <div className="text-center">
                <FaCogs className="text-6xl text-amber-500" />
              </div>
              <div className="flex flex-col gap-4">
                <h3 className="text-center text-xl font-black uppercase">
                  Extensible
                </h3>
                <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
                  TanStack Query is configurable down to each observer instance
                  of a query with knobs and options to fit every use-case. It
                  comes wired up with{' '}
                  <span className="font-semibold text-amber-700 dark:text-amber-400">
                    dedicated devtools, infinite-loading APIs, and first class
                    mutation tools that make updating your data a breeze
                  </span>
                  . Don't worry though, everything is pre-configured for
                  success!
                </p>
              </div>
            </div>
          </div>

          <div className="mx-auto px-4 sm:px-6 lg:px-8">
            <div className="pb-16 sm:text-center">
              <h3 className="mx-auto mt-2 text-center text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:leading-none">
                No dependencies. All the Features.
              </h3>
              <p className="mx-auto mt-4 max-w-3xl text-xl leading-7 opacity-60">
                With zero dependencies, TanStack Query is extremely lean given
                the dense feature set it provides. From weekend hobbies all the
                way to enterprise e-commerce systems (Yes, I'm lookin' at you
                Walmart! 😉), TanStack Query is the battle-hardened tool to help
                you succeed at the speed of your creativity.
              </p>
            </div>
            <div className="mx-auto grid grid-flow-row grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
              {[
                'Backend agnostic',
                'Dedicated Devtools',
                'Auto Caching',
                'Auto Refetching',
                'Window Focus Refetching',
                'Polling/Realtime Queries',
                'Parallel Queries',
                'Dependent Queries',
                'Mutations API',
                'Automatic Garbage Collection',
                'Paginated/Cursor Queries',
                'Load-More/Infinite Scroll Queries',
                'Scroll Recovery',
                'Request Cancellation',
                'Suspense Ready!',
                'Render-as-you-fetch',
                'Prefetching',
                'Variable-length Parallel Queries',
                'Offline Support',
                'SSR Support',
                'Data Selectors',
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
                      'Google',
                      'Walmart',
                      'Facebook',
                      'PayPal',
                      'Amazon',
                      'American Express',
                      'Microsoft',
                      'Target',
                      'Ebay',
                      'Autodesk',
                      'CarFAX',
                      'Docusign',
                      'HP',
                      'MLB',
                      'Volvo',
                      'Ocado',
                      'UPC.ch',
                      'EFI.com',
                      'ReactBricks',
                      'Nozzle.io',
                      'Uber',
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

          <div className="mx-auto w-[500px] max-w-full px-4">
            <h3 className="mt-8 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
              Partners
            </h3>
            <div className="h-8" />
            <div className="flex flex-1 flex-col items-center divide-y-2 divide-gray-500/10 overflow-hidden rounded-lg bg-white text-center text-sm shadow-xl shadow-gray-500/20 dark:bg-gray-800 dark:shadow-none">
              <span className="flex items-center gap-2 p-12 text-4xl font-black text-rose-500 uppercase">
                Query <TbHeartHandshake /> You?
              </span>
              <div className="flex flex-col gap-4 p-4">
                <div>
                  We're looking for a TanStack Query OSS Partner to go above and
                  beyond the call of sponsorship. Are you as invested in
                  TanStack Query as we are? Let's push the boundaries of Query
                  together!
                </div>
                <a
                  href="mailto:partners@tanstack.com?subject=TanStack Query Partnership"
                  className="text-sm font-black text-blue-500 uppercase"
                >
                  Let's chat
                </a>
              </div>
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
            <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:text-white">
              <Carbon />
            </div>
            <span className="rounded bg-gray-500/10 px-2 py-1 text-[.7rem] text-gray-500 dark:bg-gray-500/20">
              This ad helps us be happy about our invested time and not burn out
              and rage-quit OSS. Yay money! 😉
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <div className="mx-auto max-w-3xl px-4 sm:px-6 sm:text-center lg:px-8">
              <h3 className="mt-2 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
                Less code, fewer edge cases.
              </h3>
              <p className="my-4 text-xl leading-7 text-gray-600">
                Instead of writing reducers, caching logic, timers, retry logic,
                complex async/await scripting (I could keep going...), you
                literally write a tiny fraction of the code you normally would.
                You will be surprised at how little code you're writing or how
                much code you're deleting when you use TanStack Query. Try it
                out with one of the examples below!
              </p>
              <div className="flex flex-wrap justify-center gap-2">
                {(
                  [
                    { label: 'Angular', value: 'angular' },
                    { label: 'React', value: 'react' },
                    { label: 'Solid', value: 'solid' },
                    { label: 'Svelte', value: 'svelte' },
                    { label: 'Vue', value: 'vue' },
                  ] as const
                ).map((item) => (
                  <button
                    key={item.value}
                    className={`inline-block rounded px-4 py-2 font-extrabold text-white uppercase ${
                      item.value === framework
                        ? 'bg-red-500'
                        : 'bg-gray-300 hover:bg-red-300 dark:bg-gray-700'
                    }`}
                    onClick={() => setFramework(item.value)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {[''].includes(framework) ? (
            <div className="px-2">
              <div className="mx-auto w-full max-w-(--breakpoint-lg) rounded-xl bg-black p-8 text-center text-lg text-white">
                Looking for the <strong>@tanstack/{framework}-query</strong>{' '}
                example? We could use your help to build the{' '}
                <strong>@tanstack/{framework}-query</strong> adapter! Join the{' '}
                <a
                  href="https://tlinz.com/discord"
                  className="font-bold text-teal-500"
                >
                  TanStack Discord Server
                </a>{' '}
                and let's get to work!
              </div>
            </div>
          ) : (
            <div className="bg-white dark:bg-black">
              <iframe
                key={framework}
                src={`https://stackblitz.com/github/${
                  queryProject.repo
                }/tree/${branch}/examples/${framework}/simple?embed=1&theme=${
                  isDark ? 'dark' : 'light'
                }&preset=node`}
                title={`tannerlinsley/${framework}-query: basic`}
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
          )}

          <div className="flex flex-col items-center gap-4">
            <div className="text-xl font-extrabold lg:text-2xl">
              Wow, you've come a long way!
            </div>
            <div className="font-sm italic opacity-70">
              Only one thing left to do...
            </div>
            <div>
              <Link
                to="./docs/"
                className={`inline-block rounded-sm bg-red-500 px-4 py-2 font-extrabold text-white uppercase`}
              >
                Read the Docs!
              </Link>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  )
}
