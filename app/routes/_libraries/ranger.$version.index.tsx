import * as React from 'react'
import { CgCornerUpLeft, CgSpinner, CgTimelapse } from 'react-icons/cg'
import {
  FaBook,
  FaCheckCircle,
  FaDiscord,
  FaGithub,
  FaTshirt,
} from 'react-icons/fa'
import { Await, Link } from '@tanstack/react-router'
import { TbHeartHandshake, TbZoomQuestion } from 'react-icons/tb'
import { VscPreview } from 'react-icons/vsc'
import { RiLightbulbFlashLine } from 'react-icons/ri'
import { rangerProject } from '~/libraries/ranger'
import { Carbon } from '~/components/Carbon'
import { Footer } from '~/components/Footer'
import SponsorPack from '~/components/SponsorPack'
import { createFileRoute } from '@tanstack/react-router'
import { getRouteApi } from '@tanstack/react-router'
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
    to: './docs/overview',
  },
  {
    label: (
      <div className="flex items-center gap-1">
        <FaGithub className="text-lg" /> GitHub
      </div>
    ),
    to: `https://github.com/${rangerProject.repo}`,
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

export const Route = createFileRoute('/_libraries/ranger/$version/')({
  component: VersionIndex,
  head: () => ({
    meta: seo({
      title: rangerProject.name,
      description: rangerProject.description,
    }),
  }),
})

const librariesRouteApi = getRouteApi('/_libraries')

export default function VersionIndex() {
  const { sponsorsPromise } = librariesRouteApi.useLoaderData()
  const { version } = Route.useParams()
  const branch = getBranch(rangerProject, version)
  const [framework] = React.useState<Framework>('react')
  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    setIsDark(window.matchMedia?.(`(prefers-color-scheme: dark)`).matches)
  }, [])

  const gradientText = `inline-block leading-snug text-transparent bg-clip-text bg-linear-to-r ${rangerProject.colorFrom} ${rangerProject.colorTo}`

  return (
    <>
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
        <div className="flex flex-col items-center gap-6 px-4 text-center">
          <h1
            className={`inline-block text-4xl font-black md:text-6xl lg:text-7xl`}
            style={{
              viewTransitionName: `library-name`,
            }}
          >
            <span className={gradientText}>TanStack Ranger</span>{' '}
            <span className="animate-bounce align-super text-[.5em] text-black dark:text-white">
              {version === 'latest' ? rangerProject.latestVersion : version}
            </span>
          </h1>
          <h2 className="max-w-md text-2xl font-bold md:text-3xl lg:max-w-2xl lg:text-5xl">
            Modern and{' '}
            <span className="underline decoration-yellow-500 decoration-dashed decoration-3 underline-offset-2">
              headless
            </span>{' '}
            ranger ui library
          </h2>
          <p className="text max-w-sm opacity-90 lg:max-w-2xl lg:text-xl">
            A fully typesafe ranger hooks for React.
          </p>
          <Link
            to="./docs/overview"
            className={`rounded-sm bg-pink-500 px-4 py-2 font-extrabold text-white uppercase`}
          >
            Get Started
          </Link>
        </div>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 p-8 text-lg md:flex-row">
          <div className="flex flex-1 flex-col items-center gap-8">
            <div className="text-center">
              <RiLightbulbFlashLine className="scale-125 animate-pulse text-6xl text-pink-400" />
            </div>
            <div className="flex flex-col gap-4 text-center">
              <h3 className="text-xl font-black uppercase">
                Typesafe & powerful, yet familiarly simple
              </h3>
              <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
                Hooks for building range and multi-range sliders in React{' '}
                <span className="font-semibold text-pink-600 dark:text-pink-400">
                  100% typesafe without compromising on DX
                </span>
                .
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-8">
            <div className="text-center">
              <CgTimelapse
                className="animate-spin text-6xl text-pink-500"
                style={{
                  animationDuration: '3s',
                  animationTimingFunction: 'ease-in-out',
                }}
              />
            </div>
            <div className="flex flex-col gap-4 text-center">
              <h3 className="text-xl font-black uppercase">
                "Headless" UI library
              </h3>
              <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
                Headless and extensible. Ranger doesn't render or supply any
                actual UI elements. It's a{' '}
                <span className="font-semibold text-pink-600 dark:text-pink-400">
                  utility for building your own custom-designed UI components
                </span>
                .
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-8">
            <div className="text-center">
              <TbZoomQuestion className="text-6xl text-pink-600" />
            </div>
            <div className="flex flex-col gap-4 text-center">
              <h3 className="text-xl font-black uppercase">Extensible</h3>
              <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
                Designed with maximum inversion of control in mind, Ranger is
                built to be{' '}
                <span className="font-semibold text-pink-600 dark:text-pink-400">
                  easily extended and customized
                </span>{' '}
                to fit your needs.
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-16 sm:text-center">
            <h3 className="mx-auto mt-2 text-center text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:leading-none">
              Feature Rich and Lightweight Headless utility, which means out of
              the box, it doesn't render or supply any actual UI elements.
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-xl leading-7 opacity-60">
              Behold, the obligatory feature-list:
            </p>
          </div>
          <div className="mx-auto grid grid-flow-row grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              '100% Typesafe',
              'Lightweight (306 kB)',
              'Easy to maintain',
              'Extensible',
              'Not dictating UI',
            ].map((d, i) => {
              return (
                <span key={i} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500" /> {d}
                </span>
              )
            })}
          </div>
        </div>

        <div className="mx-auto w-[500px] max-w-full px-4">
          <h3 className="mt-8 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
            Partners
          </h3>
          <div className="h-8" />
          <div className="flex flex-1 flex-col items-center divide-y-2 divide-gray-500/10 overflow-hidden rounded-lg bg-white text-center text-sm shadow-xl shadow-gray-500/20 dark:bg-gray-800 dark:shadow-none">
            <span className="flex items-center gap-2 p-12 text-4xl font-black text-rose-500 uppercase">
              Ranger <TbHeartHandshake /> You?
            </span>
            <div className="flex flex-col gap-4 p-4">
              <div>
                We're looking for a TanStack Ranger OSS Partner to go above and
                beyond the call of sponsorship. Are you as invested in TanStack
                Ranger as we are? Let's push the boundaries of Ranger together!
              </div>
              <a
                href="mailto:partners@tanstack.com?subject=TanStack Ranger Partnership"
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
          <div className="container mx-auto max-w-3xl px-4 sm:px-6 sm:text-center lg:px-8">
            <h3 className="mt-2 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
              Take it for a spin!
            </h3>
            <p className="my-4 text-xl leading-7 text-gray-600">
              Let's see it in action!
            </p>
          </div>
        </div>

        <div className="bg-white dark:bg-black">
          <iframe
            key={framework}
            src={`https://stackblitz.com/github/${
              rangerProject.repo
            }/tree/${branch}/examples/${framework}/basic?embed=1&theme=${
              isDark ? 'dark' : 'light'
            }`}
            title="tannerlinsley/react-ranger: basic"
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
              to="./docs/overview"
              className={`inline-block rounded-sm bg-pink-500 px-4 py-2 font-extrabold text-white uppercase`}
            >
              Get Started!
            </Link>
          </div>
        </div>
        <Footer />
      </div>
    </>
  )
}
