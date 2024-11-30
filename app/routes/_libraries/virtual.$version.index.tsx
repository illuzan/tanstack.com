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
import {
  Await,
  Link,
  createFileRoute,
  getRouteApi,
} from '@tanstack/react-router'
import { virtualProject } from '~/libraries/virtual'
import { Carbon } from '~/components/Carbon'
import { Footer } from '~/components/Footer'
import { IoIosBody } from 'react-icons/io'
import SponsorPack from '~/components/SponsorPack'
import { TbHeartHandshake } from 'react-icons/tb'
import { VscPreview } from 'react-icons/vsc'
import { Logo } from '~/components/Logo'
import { getSponsorsForSponsorPack } from '~/server/sponsors'
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
    to: './docs/framework/react/examples/dynamic',
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
    to: `https://github.com/${virtualProject.repo}`,
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

export const Route = createFileRoute('/_libraries/virtual/$version/')({
  component: RouteComp,
  head: () => ({
    meta: seo({
      title: virtualProject.name,
      description: virtualProject.description,
    }),
  }),
})

const librariesRouteApi = getRouteApi('/_libraries')

export default function RouteComp() {
  const { sponsorsPromise } = librariesRouteApi.useLoaderData()
  const { version } = Route.useParams()
  const [framework, setFramework] = React.useState<Framework>('react')
  const branch = getBranch(virtualProject, version)
  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    setIsDark(window.matchMedia?.(`(prefers-color-scheme: dark)`).matches)
  }, [])

  const gradientText = `inline-block text-transparent bg-clip-text bg-linear-to-r ${virtualProject.colorFrom} ${virtualProject.colorTo}`

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
            <span className={gradientText}>TanStack Virtual</span>{' '}
            <span className="animate-bounce align-super text-[.5em] text-black dark:text-white">
              v3
            </span>
          </h1>
        </div>
        <h2 className="max-w-md text-2xl font-bold md:text-3xl lg:max-w-2xl lg:text-5xl">
          <span className="underline decoration-yellow-500 decoration-dashed decoration-3 underline-offset-2">
            Headless
          </span>{' '}
          UI for Virtualizing Large Element Lists
        </h2>
        <p className="text max-w-sm opacity-90 lg:max-w-2xl lg:text-xl">
          Virtualize only the visible DOM nodes within massive scrollable
          elements at 60FPS in TS/JS, React, Vue, Solid, Svelte, Lit & Angular
          while retaining 100% control over markup and styles.
        </p>
        <Link
          to="./docs/introduction"
          className={`rounded-sm bg-purple-500 px-4 py-2 font-extrabold text-white uppercase`}
        >
          Get Started
        </Link>
      </div>
      <div className="mx-auto flex max-w-[1200px] flex-col gap-12 p-8 text-lg md:flex-row">
        <div className="flex flex-1 flex-col items-center gap-8">
          <div className="overflow-hidden text-center">
            <IoIosBody className="-mt-5 mb-5 origin-top scale-125 text-6xl text-purple-400" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-center text-xl font-black uppercase">
              Designed for zero design
            </h3>
            <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
              Headless Virtualization means you're always in control of your{' '}
              <span className="font-semibold text-violet-600 dark:text-violet-400">
                markup, styles and components
              </span>
              . Go design and implement the most beautiful UI you can dream up
              and let us take care of the hard parts.
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-8">
          <div className="text-center">
            <FaBolt className="text-6xl text-purple-500" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-center text-xl font-black uppercase">
              Big Power, Small Package
            </h3>
            <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
              Don't be fooled by the small bundle size. TanStack Virtual uses
              every byte to deliver powerful performance. After all,{' '}
              <span className="font-semibold text-violet-700 dark:text-violet-400">
                {' '}
                60FPS is table stakes
              </span>{' '}
              these days and we refuse to sacrifice anything for that 🧈-y
              smooth UX.
            </p>
          </div>
        </div>
        <div className="flex flex-1 flex-col items-center gap-8">
          <div className="text-center">
            <FaCogs className="text-6xl text-purple-600" />
          </div>
          <div className="flex flex-col gap-4">
            <h3 className="text-center text-xl font-black uppercase">
              Maximum Composability
            </h3>
            <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
              With a single function/hook, you'll get limitless virtualization
              for{' '}
              <span className="font-semibold text-violet-700 dark:text-violet-400">
                vertical, horizontal, and grid-style{' '}
              </span>
              layouts. The API is tiny (literally 1 function), but its
              composability is not.
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
            TanStack Virtual's API and engine are highly modular and
            framework-independent while still prioritizing ergonomics. Behold,
            the obligatory feature-list:
          </p>
        </div>
        <div className="mx-auto grid grid-flow-row grid-cols-1 gap-x-10 gap-y-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[
            'Lightweight (10 - 15kb)',
            'Tree-Shaking',
            'Headless',
            'Vertical/Column Virtualization',
            'Horizontal/Row Virtualization',
            'Grid Virtualization',
            'Window-Scrolling',
            'Fixed Sizing',
            'Variable Sizing',
            'Dynamic/Measured Sizing',
            'Scrolling Utilities',
            'Sticky Items',
          ].map((d, i) => {
            return (
              <span key={i} className="flex items-center gap-2">
                <FaCheckCircle className="text-green-500" /> {d}
              </span>
            )
          })}
        </div>
      </div>

      {/* <div>
        <div className="uppercase tracking-wider text-sm font-semibold text-center text-gray-400 mb-3">
          Trusted in Production by
        </div>
        <marquee scrollamount="2">
          <div className="flex gap-2 items-center text-3xl font-bold ml-[-100%]">
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
                ]
              )
              .map((d, i) => (
                <span key={i} className="opacity-70 even:opacity-40">
                  {d}
                </span>
              ))}
          </div>
        </marquee>
      </div> */}

      <div className="mx-auto w-[500px] max-w-full px-4">
        <h3 className="mt-8 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
          Partners
        </h3>
        <div className="h-8" />
        <div className="flex flex-1 flex-col items-center divide-y-2 divide-gray-500/10 overflow-hidden rounded-lg bg-white text-center text-sm shadow-xl shadow-gray-500/20 dark:bg-gray-800 dark:shadow-none">
          <span className="flex items-center gap-2 p-12 text-4xl font-black text-rose-500 uppercase">
            Virtual <TbHeartHandshake /> You?
          </span>
          <div className="flex flex-col gap-4 p-4">
            <div>
              We're looking for a TanStack Virtual OSS Partner to go above and
              beyond the call of sponsorship. Are you as invested in TanStack
              Virtual as we are? Let's push the boundaries of Virtual together!
            </div>
            <a
              href="mailto:partners@tanstack.com?subject=TanStack Virtual Partnership"
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
        <div className="mx-auto max-w-[250px] overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:text-white">
          <Carbon />
        </div>
        <span className="rounded bg-gray-500/10 px-2 py-1 text-[.7rem] text-gray-500 dark:bg-gray-500/20">
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
            With just a few divs and some inline styles, you're already well on
            your way to creating an extremely powerful virtualization
            experience.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            {(
              [
                { label: 'React', value: 'react' },
                { label: 'Solid', value: 'solid' },
                { label: 'Lit', value: 'lit' },
                { label: 'Svelte', value: 'svelte' },
                { label: 'Vue', value: 'vue' },
                { label: 'Angular', value: 'angular' },
              ] as const
            ).map((item) => (
              <button
                key={item.value}
                className={`inline-block rounded px-4 py-2 font-extrabold text-white uppercase ${
                  item.value === framework
                    ? 'bg-purple-500'
                    : 'bg-gray-300 hover:bg-teal-300 dark:bg-gray-700'
                }`}
                onClick={() => setFramework(item.value)}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {['vue', 'solid', 'svelte'].includes(framework) ? (
        <div className="px-2">
          <div className="mx-auto w-full max-w-(--breakpoint-lg) rounded-xl bg-black p-8 text-center text-lg text-white">
            Looking for the <strong>@tanstack/{framework}-virtual</strong>{' '}
            example? We could use your help to build the{' '}
            <strong>@tanstack/{framework}-virtual</strong> adapter! Join the{' '}
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
              virtualProject.repo
            }/tree/${branch}/examples/${framework}/fixed?embed=1&theme=${
              isDark ? 'dark' : 'light'
            }`}
            title="tannerlinsley/react-table: dynamic"
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
            to="./docs/introduction"
            className={`inline-block rounded-sm bg-purple-500 px-4 py-2 font-extrabold text-white uppercase`}
          >
            Get Started!
          </Link>
        </div>
      </div>
      <Footer />
    </div>
  )
}
