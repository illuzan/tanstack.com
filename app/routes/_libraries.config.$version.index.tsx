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
import { Carbon } from '~/components/Carbon'
import { Footer } from '~/components/Footer'
import { VscWand } from 'react-icons/vsc'
import { TbHeartHandshake } from 'react-icons/tb'
import SponsorPack from '~/components/SponsorPack'
import { configProject } from '~/libraries/config'
import {
  Await,
  Link,
  createFileRoute,
  getRouteApi,
} from '@tanstack/react-router'
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
    to: `https://github.com/${configProject.repo}`,
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

export const Route = createFileRoute('/_libraries/config/$version/')({
  component: FormVersionIndex,
  head: () => ({
    meta: seo({
      title: configProject.name,
      description: configProject.description,
    }),
  }),
})

const librariesRouteApi = getRouteApi('/_libraries')

export default function FormVersionIndex() {
  const { sponsorsPromise } = librariesRouteApi.useLoaderData()
  const { version } = Route.useParams()
  // const branch = getBranch(version)
  // const [isDark, setIsDark] = React.useState(true)

  // React.useEffect(() => {
  //   setIsDark(window.matchMedia?.(`(prefers-color-scheme: dark)`).matches)
  // }, [])

  const gradientText = `inline-block leading-snug text-transparent bg-clip-text bg-linear-to-r ${configProject.colorFrom} ${configProject.colorTo}`

  return (
    <>
      <div className="flex flex-col gap-20 md:gap-32">
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
                  <Link to={item.to}>{label}</Link>
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
              <span className={gradientText}>TanStack Config</span>{' '}
              <span className="animate-bounce align-super text-[.5em] text-black dark:text-white">
                {version === 'latest' ? configProject.latestVersion : version}
              </span>
            </h1>
          </div>
          <h2 className="max-w-[600px] text-2xl font-bold md:text-3xl lg:max-w-[800px] lg:text-5xl">
            <span className="underline decoration-gray-500 decoration-dashed decoration-3 underline-offset-2">
              Configuration and tools
            </span>{' '}
            for publishing and maintaining high-quality JavaScript packages
          </h2>
          <Link
            to="./docs/"
            className={`rounded-sm bg-gray-500 px-4 py-2 font-extrabold text-white uppercase`}
          >
            Get Started
          </Link>
        </div>
        <div className="mx-auto flex max-w-[1200px] flex-col gap-12 p-8 text-lg md:flex-row">
          <div className="flex flex-1 flex-col items-center gap-8">
            <VscWand className="text-6xl text-gray-400" />
            <div className="flex flex-col gap-4">
              <h3 className="text-center text-xl font-black uppercase">
                Intuitive Configuration
              </h3>
              <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
                TanStack Config offers a seamless and intuitive configuration
                management system that simplifies the process of building and
                publishing high-quality JavaScript packages. TanStack Config{' '}
                <span className="font-semibold text-gray-700 dark:text-gray-500">
                  streamlines the configuration process, allowing developers to
                  focus on writing code
                </span>{' '}
                without the hassle of intricate setup procedures.
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-8">
            <div className="text-center">
              <FaBolt className="text-6xl text-gray-500" />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-center text-xl font-black uppercase">
                Vite-Powered Builds
              </h3>
              <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
                TanStack Config's build configuration harnesses the Vite
                ecosystem. Customize and extend your build workflows with ease,
                tailoring them to meet the unique requirements of your project.{' '}
                <span className="font-semibold text-gray-700 dark:text-gray-500">
                  Whether you need advanced optimizations, pre-processors, or
                  other specialized tools,
                </span>{' '}
                TanStack Config provides a robust foundation for crafting a
                build pipeline that suits your specific needs.
              </p>
            </div>
          </div>
          <div className="flex flex-1 flex-col items-center gap-8">
            <div className="text-center">
              <FaCogs className="text-6xl text-gray-700" />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-center text-xl font-black uppercase">
                Effortless Publication
              </h3>

              <p className="text-sm leading-6 text-gray-800 dark:text-gray-200">
                Say goodbye to the complexities of code publishing. This package
                provides tools designed to automate the publication of your
                projects. Developers can effortlessly publish updates, manage
                versioning, and release on npm and GitHub.{' '}
                <span className="font-semibold text-gray-700 dark:text-gray-500">
                  TanStack Config takes care of the tedious aspects of package
                  publishing,
                </span>{' '}
                empowering developers to share their work with the community
                efficiently.
              </p>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="pb-16 sm:text-center">
            <h3 className="mx-auto mt-2 text-center text-3xl leading-tight font-extrabold tracking-tight sm:text-4xl lg:leading-none">
              Hassle-Free Setup
            </h3>
            <p className="mx-auto mt-4 max-w-3xl text-xl leading-7 opacity-60">
              Incorporate TanStack Config into your development toolkit and
              experience a new level of efficiency, speed, and customization in
              building and releasing high-quality JavaScript packages.
            </p>
          </div>
          <div className="mx-auto grid w-[max-content] grid-flow-row grid-cols-1 gap-x-10 gap-y-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              // A list of features that @tanstack/config provides
              'Vite ecosystem',
              'Opinionated defaults',
              'Publint-compliant',
              'Minimal configuration',
              'Package versioning',
              'Automated changelogs',
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
              Config <TbHeartHandshake /> You?
            </span>
            <div className="flex flex-col gap-4 p-4">
              <div>
                We're looking for a TanStack Config OSS Partner to go above and
                beyond the call of sponsorship. Are you as invested in TanStack
                Config as we are? Let's push the boundaries of Config together!
              </div>
              <a
                href="mailto:partners@tanstack.com?subject=TanStack Config Partnership"
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
            This ad helps us keep the lights on 😉
          </span>
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
              to="./docs/"
              className={`inline-block rounded-sm bg-gray-500 px-4 py-2 font-extrabold text-white uppercase`}
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
