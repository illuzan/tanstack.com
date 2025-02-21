import * as React from 'react'

import { CgSpinner } from 'react-icons/cg'
import { FaCheckCircle } from 'react-icons/fa'
import { Await, Link, getRouteApi } from '@tanstack/react-router'
import { Carbon } from '~/components/Carbon'
import { Footer } from '~/components/Footer'
import { TbHeartHandshake } from 'react-icons/tb'
import SponsorPack from '~/components/SponsorPack'
import { QueryGGBanner } from '~/components/QueryGGBanner'
import { queryProject } from '~/libraries/query'
import { createFileRoute } from '@tanstack/react-router'
import { Framework, getBranch, getLibrary } from '~/libraries'
import { seo } from '~/utils/seo'
import { twMerge } from 'tailwind-merge'
import { LibraryFeatureHighlights } from '~/components/LibraryFeatureHighlights'
import { partners } from '~/utils/partners'

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

const library = getLibrary('query')

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
    <div className="flex flex-1 flex-col min-h-0 relative overflow-x-hidden">
      <div className="flex flex-1 min-h-0 relative justify-center overflow-x-hidden">
        <div className="flex flex-col gap-20 md:gap-32 max-w-full py-32">
          <div className="flex flex-col items-center gap-8 text-center px-4">
            <h1 className="font-black flex gap-3 items-center text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase [letter-spacing:-.05em]">
              <span>TanStack</span>
              <span className={twMerge(gradientText)}>Query</span>
            </h1>
            <h2
              className="font-bold text-2xl max-w-md
            md:text-3xl
            lg:text-5xl lg:max-w-2xl"
            >
              Powerful{' '}
              <span className="underline decoration-yellow-500 decoration-dashed underline-offset-2">
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
            <div className="space-y-4">
              <Link
                to="./docs/"
                className={`py-2 px-4 bg-red-500 rounded-sm text-white uppercase font-extrabold`}
              >
                Read the Docs
              </Link>
              <p>(or check out our official course 👇)</p>
            </div>
            <QueryGGBanner />
          </div>
          <LibraryFeatureHighlights
            featureHighlights={library.featureHighlights}
          />

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

          <div className="px-4 lg:max-w-(--breakpoint-lg) md:mx-auto mx-auto">
            <h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none mt-8">
              Partners
            </h3>
            <div className="h-8" />
            <div className={`grid grid-cols-1 gap-6 max-w-(--breakpoint-md) mx-auto`}>
              {partners
                .filter((d) => d.libraries?.includes('query'))
                .map((partner) => {
                  return (
                    <a
                      key={partner.name}
                      href={partner.href}
                      target="_blank"
                      className="shadow-xl shadow-gray-500/20 rounded-lg dark:border border-gray-500/20 bg-white dark:bg-black/40 dark:shadow-none group overflow-hidden grid"
                      rel="noreferrer"
                    >
                      <div className="z-0 row-start-1 col-start-1 flex items-center justify-center group-hover:blur-xs transition-all duration-200">
                        {partner.homepageImg}
                      </div>
                      <div className="z-10 row-start-1 col-start-1 max-w-full p-4 text-sm flex flex-col gap-4 items-start opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-white/70 dark:bg-gray-800/70">
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
            <div className="overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:text-white">
              <Carbon />
            </div>
            <span className="rounded-sm bg-gray-500/10 px-2 py-1 text-[.7rem] text-gray-500 dark:bg-gray-500/20">
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
