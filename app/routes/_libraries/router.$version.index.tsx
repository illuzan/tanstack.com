import * as React from 'react'
import { CgSpinner, CgTimelapse } from 'react-icons/cg'
import {
  FaBook,
  FaCheckCircle,
  FaDiscord,
  FaGithub,
  FaTshirt,
} from 'react-icons/fa'
import {
  Await,
  Link,
  createFileRoute,
  getRouteApi,
} from '@tanstack/react-router'
import { TbHeartHandshake, TbZoomQuestion } from 'react-icons/tb'
import { VscPreview } from 'react-icons/vsc'
import { RiLightbulbFlashLine } from 'react-icons/ri'
import { routerProject } from '~/libraries/router'
import { Carbon } from '~/components/Carbon'
import { Footer } from '~/components/Footer'
import SponsorPack from '~/components/SponsorPack'
import { Framework, getBranch } from '~/libraries'
import { seo } from '~/utils/seo'
import { partners } from '~/utils/partners'

const menu = [
  {
    label: (
      <div className="flex items-center gap-1">
        <VscPreview className="text-lg" /> Examples
      </div>
    ),
    to: './docs/framework/react/examples/kitchen-sink-file-based',
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <FaBook className="text-lg" /> Docs
      </div>
    ),
    to: './docs/framework/react/overview',
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <FaGithub className="text-lg" /> GitHub
      </div>
    ),
    to: `https://github.com/${routerProject.repo}`,
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

export const Route = createFileRoute('/_libraries/router/$version/')({
  component: RouterVersionIndex,
  head: () => ({
    meta: seo({
      title: routerProject.name,
      description: routerProject.description,
    }),
  }),
})

const librariesRouteApi = getRouteApi('/_libraries')

function RouterVersionIndex() {
  const { sponsorsPromise } = librariesRouteApi.useLoaderData()
  const { version } = Route.useParams()
  const branch = getBranch(routerProject, version)
  const [framework] = React.useState<Framework>('react')
  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    setIsDark(window.matchMedia?.(`(prefers-color-scheme: dark)`).matches)
  }, [])

  const gradientText = `inline-block text-transparent bg-clip-text bg-linear-to-r ${routerProject.colorFrom} ${routerProject.colorTo}`

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
            <span className={gradientText}>TanStack Router</span>
          </h1>
        </div>
        <h2 className="max-w-md text-2xl font-bold md:text-3xl lg:max-w-2xl lg:text-5xl">
          <span className="underline decoration-yellow-500 decoration-dashed decoration-3 underline-offset-2">
            Modern and scalable
          </span>{' '}
          routing for React applications
        </h2>
        <p className="text max-w-sm opacity-90 lg:max-w-2xl lg:text-xl">
          A fully type-safe React router with built-in data fetching,
          stale-while revalidate caching and first-class search-param APIs.
        </p>
        <Link
          to="./docs/framework/react/overview"
          className={`rounded-sm bg-emerald-500 px-4 py-2 font-extrabold text-white uppercase`}
        >
          Get Started
        </Link>
      </div>

      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 p-8 text-lg md:flex-row">
        <div className="flex flex-1 flex-col items-center gap-8">
          <div className="text-center">
            <RiLightbulbFlashLine className="scale-125 animate-pulse text-6xl text-lime-500" />
          </div>
          <div className="flex flex-col gap-4 text-center">
            <h3 className="text-xl font-black uppercase">
              Typesafe & powerful, yet familiarly simple
            </h3>
            <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
              TanStack Router builds on modern routing patterns made popular by
              other tools, but has been re-engineered from the ground up to be{' '}
              <span className="font-semibold text-lime-600 dark:text-lime-400">
                100% typesafe without compromising on DX
              </span>
              . You <em>can</em> have your cake and eat it too!
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-8">
          <div className="text-center">
            <CgTimelapse
              className="text-6xl text-teal-500 motion-safe:animate-spin"
              style={{
                animationDuration: '3s',
                animationTimingFunction: 'ease-in-out',
              }}
            />
          </div>
          <div className="flex flex-col gap-4 text-center">
            <h3 className="text-xl font-black uppercase">
              Built-in Data Fetching with Caching
            </h3>
            <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
              Hoist your data fetching and avoid waterfalls with TanStack
              Router's loader API and get{' '}
              <span className="font-semibold text-teal-500 dark:text-teal-400">
                instant navigations with built-in caching and automatic
                preloading
              </span>
              . Need something more custom? Router's API is{' '}
              <span className="font-semibold text-teal-500 dark:text-teal-400">
                designed to work with your favorite client-side cache libraries!
              </span>{' '}
              Your users will notice the difference when your pages not only
              load in parallel but also stay up to date over time.
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-8">
          <div className="text-center">
            <TbZoomQuestion className="text-6xl text-emerald-500" />
          </div>
          <div className="flex flex-col gap-4 text-center">
            <h3 className="text-xl font-black uppercase">
              Search Param APIs to make your state-manager jealous
            </h3>
            <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
              Instead of throwing you to the URLSearchParam wolves, TanStack
              Router outfits you with state-manager-grade search param APIs.
              With{' '}
              <span className="font-semibold text-emerald-500 dark:text-emerald-400">
                schemas, validation, full type-safety and pre/post manipulation
              </span>{' '}
              you'll wonder why you're not storing everything in the URL.
              Goodbye in-memory state 👋!
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto px-4 md:mx-auto lg:max-w-(--breakpoint-lg)">
        <h3 className="mt-8 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
          Partners
        </h3>
        <div className="h-8" />
        <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2`}>
          {partners
            .filter((d) => d.libraries?.includes('router'))
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

      <div className="mx-auto px-4 sm:px-6 lg:px-8">
        <div className="pb-16 sm:text-center">
          <h3 className="mx-auto mt-2 text-center text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:leading-none">
            Feature Rich and Lightweight
          </h3>
          <p className="mx-auto mt-4 w-3xl text-xl leading-7 opacity-60">
            Behold, the obligatory feature-list:
          </p>
        </div>
        <div className="mx-auto grid grid-flow-row grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            '100% Typesafe',
            'Parallel Route Loaders',
            '1st-class Search Param APIs',
            'Nested/Layout Routes',
            'Lightweight (12kb)',
            'Suspense + Transitions',
            'Strict Navigation',
            'Auto-completed Paths',
            'Search Param Schemas',
            'Search Param Validation',
            'Search Param Parsing + Serialization',
            'Search Param Pre/Post Processing',
            'Structural Sharing',
            'Automatic Prefetching',
            'Asynchronous Elements',
            'Pending Elements',
            'Error Boundaries',
          ].map((d, i) => {
            return (
              <span key={i} className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> {d}
              </span>
            )
          })}
        </div>
      </div>

      {/* <div className="mx-auto max-w-[400px] flex flex-col gap-2 items-center">
        <div className="shadow-lg rounded-lg overflow-hidden bg-white dark:bg-gray-800 dark:text-white max-w-[250px] mx-auto">
          <Carbon />
        </div>
        <span
          className="text-[.7rem] bg-gray-500/10 py-1 px-2 rounded text-gray-500
                dark:bg-gray-500/20"
        >
          This ad helps us be happy about our invested time and not burn out and
          rage-quit OSS. Yay money! 😉
        </span>
      </div> */}

      <div className="relative overflow-hidden text-lg">
        <h3 className="mt-8 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
          Sponsors
        </h3>
        <div
          className="mx-auto my-4 flex w-full max-w-(--breakpoint-lg) flex-wrap"
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

      <div>
        <div className="flex flex-col gap-4">
          <div className="mx-auto max-w-3xl px-4 sm:px-6 sm:text-center lg:px-8">
            <h3 className="mt-2 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
              Take it for a spin!
            </h3>
            <p className="my-4 text-xl leading-7 text-gray-600">
              Create a route, pop in a Router, and start slingin' some code!
            </p>
            {/* <div className="flex flex-wrap gap-2 justify-center">
            {(
              [
                { label: 'React', value: 'react' },
                { label: 'Preact', value: 'preact' },
                { label: 'Solid', value: 'solid' },
                { label: 'Vue', value: 'vue' },
                { label: 'Svelte', value: 'svelte' },
              ] as const
            ).map((item) => (
              <button
                key={item.value}
                className={`inline-block py-2 px-4 rounded text-white uppercase font-extrabold ${
                  item.value === framework
                    ? 'bg-teal-500'
                    : 'bg-gray-300 dark:bg-gray-700 hover:bg-teal-300'
                }`}
                onClick={() => setFramework(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div> */}
          </div>
        </div>

        {/* {['preact', 'vue', 'solid', 'svelte'].includes(framework) ? (
        <div className="px-2">
          <div className="p-8 text-center text-lg w-full max-w-(--breakpoint-lg) mx-auto bg-black text-white rounded-xl">
            Looking for the <strong>@tanstack/{framework}-router</strong>{' '}
            example? The <strong>@tanstack/{framework}-router</strong> adapter
            is currently under development! Join the{' '}
            <a
              href="https://tlinz.com/discord"
              className="text-teal-500 font-bold"
            >
              TanStack Discord Server
            </a>{' '}
            and help us make routing in {framework} a better place!
          </div>
        </div>
      ) : ( */}
        <div className="bg-white dark:bg-black">
          <iframe
            key={framework}
            src={`https://stackblitz.com/github/${
              routerProject.repo
            }/tree/${branch}/examples/${framework}/kitchen-sink-file-based?file=src%2Fmain.tsx&embed=1&theme=${
              isDark ? 'dark' : 'light'
            }`}
            title="tannerlinsley/router: kitchen-sink"
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
            to="./docs/framework/react/overview"
            className={`inline-block rounded-sm bg-emerald-500 px-4 py-2 font-extrabold text-white uppercase`}
          >
            Get Started!
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
