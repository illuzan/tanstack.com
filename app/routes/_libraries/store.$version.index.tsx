import { CgCornerUpLeft, CgSpinner } from 'react-icons/cg'
import { FaBook, FaDiscord, FaGithub, FaTshirt } from 'react-icons/fa'
import { Link, createFileRoute, getRouteApi } from '@tanstack/react-router'
import { Carbon } from '~/components/Carbon'
import { Footer } from '~/components/Footer'
import { VscPreview } from 'react-icons/vsc'
import { TbHeartHandshake } from 'react-icons/tb'
import SponsorPack from '~/components/SponsorPack'
import { storeProject } from '~/libraries/store'
import { Await } from '@tanstack/react-router'
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
    to: './docs/framework/react/examples/simple',
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
    to: `https://github.com/${storeProject.repo}`,
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

export const Route = createFileRoute('/_libraries/store/$version/')({
  component: StoreVersionIndex,
  head: () => ({
    meta: seo({
      title: storeProject.name,
      description: storeProject.description,
    }),
  }),
})

const librariesRouteApi = getRouteApi('/_libraries')

export default function StoreVersionIndex() {
  const { sponsorsPromise } = librariesRouteApi.useLoaderData()
  const { version } = Route.useParams()
  // const branch = getBranch(version)
  // const [framework, setFramework] = React.useState<Framework>('react')
  // const [isDark, setIsDark] = React.useState(true)

  const gradientText = `inline-block text-transparent bg-clip-text bg-linear-to-r ${storeProject.colorFrom} ${storeProject.colorTo}`

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
          <div className="flex items-center gap-2 lg:gap-4">
            <h1
              className={`inline-block text-4xl font-black md:text-6xl lg:text-7xl`}
              style={{
                viewTransitionName: `library-name`,
              }}
            >
              <span className={gradientText}>TanStack Store</span>{' '}
              <span className="animate-bounce align-super text-[.5em] text-black dark:text-white">
                {version === 'latest' ? storeProject.latestVersion : version}
              </span>
            </h1>
          </div>
          <h2 className="max-w-md text-2xl font-bold md:text-3xl lg:max-w-2xl lg:text-5xl">
            <span className="underline decoration-gray-500 decoration-dashed decoration-3 underline-offset-2">
              Framework agnostic
            </span>{' '}
            type-safe store w/ reactive framework adapters
          </h2>
          <p className="text max-w-[500px] opacity-90 lg:max-w-[800px] lg:text-xl">
            Level up your state management with TanStack Store – the
            framework-agnostic, type-safe store. Enjoy{' '}
            <strong>
              minimal setup, granular APIs, and seamless adaptability across
              frameworks
            </strong>
            . Simplify your development and boost efficiency with TanStack
            Store.
          </p>
          <Link
            to="./docs/"
            className={`rounded-sm bg-stone-600 px-4 py-2 font-extrabold text-white uppercase`}
          >
            Get Started
          </Link>
        </div>
        {/* <div
          className="text-lg flex flex-col gap-12 p-8 max-w-[1200px] mx-auto
                        md:flex-row"
        >
          <div className="flex-1 flex flex-col gap-8 items-center">
            <VscWand className="text-gray-400 text-6xl" />
            <div className="flex flex-col gap-4">
              <h3 className="uppercase text-center text-xl font-black">
                First-Class TypeScript Support
              </h3>
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-6">
                TanStack Form touts first-class TypeScript support with
                outstanding autocompletion, excellent generic throughput and
                inferred types everywhere possible.{' '}
                <span className="font-semibold text-gray-600 dark:text-gray-300">
                  This results in fewer runtime errors, increased code
                  maintainability, and a smoother development experience
                </span>{' '}
                to help you confidently build robust and type-safe form
                solutions that scale.
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-8 items-center">
            <div className="text-center">
              <FaBolt className="text-gray-500 text-6xl" />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="uppercase text-center text-xl font-black">
                Headless and Framework Agnostic
              </h3>
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-6">
                Form's headless and framework agnostic approach ensures maximum
                flexibility and broad compatibility with many front-end
                frameworks, or no framework at all. By both supplying and
                encouraging a headless approach to your forms, building custom
                reusable form components tailored to your application's needs{' '}
                <span className="font-semibold text-amber-600 dark:text-gray-500">
                  requires little abstraction and keeps your code modular,
                  simple and composable.
                </span>
              </p>
            </div>
          </div>
          <div className="flex-1 flex flex-col gap-8 items-center">
            <div className="text-center">
              <FaCogs className="text-amber-500 text-6xl" />
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="uppercase text-center text-xl font-black">
                Granular Reactive Performance
              </h3>
              <p className="text-sm text-gray-800 dark:text-gray-200 leading-6">
                When it comes to performance, TanStack Form delivers amazing
                speed and control, but without the cruft, boilerplate, or
                abstractions. With granularly reactive APIs at its core,{' '}
                <span className="font-semibold text-amber-700 dark:text-amber-500">
                  only relevant components are updated when the form state
                  changes.
                </span>{' '}
                The end result? A faster UI, happy users, and zero worries about
                performance.
              </p>
            </div>
          </div>
        </div> */}

        {/* <div className="px-4 sm:px-6 lg:px-8 mx-auto">
          <div className=" sm:text-center pb-16">
            <h3 className="text-3xl text-center mx-auto leading-tight font-extrabold tracking-tight sm:text-4xl lg:leading-none mt-2">
              No dependencies. All the Features.
            </h3>
            <p className="mt-4 text-xl max-w-3xl mx-auto leading-7 opacity-60">
              With zero dependencies, TanStack Form is extremely lean given the
              dense feature set it provides. From weekend hobbies all the way to
              enterprise TanStack Form has the tools to help you succeed at the
              speed of your creativity.
            </p>
          </div>
          <div className="grid grid-flow-row grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-4  mx-auto">
            {[
              // A list of features that @tanstack/form provides for managing form state, validation, touched/dirty states, UI integration, etc.
              'Framework agnostic design',
              'First Class TypeScript Support',
              'Headless',
              'Tiny / Zero Deps',
              'Granularly Reactive Components/Hooks',
              'Extensibility and plugin architecture',
              'Modular architecture',
              'Form/Field validation',
              'Async Validation',
              'Built-in Async Validation Debouncing',
              'Configurable Validation Events',
              'Deeply Nested Object/Array Fields',
            ].map((d, i) => {
              return (
                <span key={i} className="flex items-center gap-2">
                  <FaCheckCircle className="text-green-500 " /> {d}
                </span>
              )
            })}
          </div>
        </div> */}

        <div className="mx-auto w-[500px] max-w-full px-4">
          <h3 className="mt-8 text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none">
            Partners
          </h3>
          <div className="h-8" />
          <div className="flex flex-1 flex-col items-center divide-y-2 divide-gray-500/10 overflow-hidden rounded-lg bg-white text-center text-sm shadow-xl shadow-gray-500/20 dark:bg-gray-800 dark:shadow-none">
            <span className="flex items-center gap-2 p-12 text-4xl font-black text-rose-500 uppercase">
              Store <TbHeartHandshake /> You?
            </span>
            <div className="flex flex-col gap-4 p-4">
              <div>
                We're looking for a TanStack Store OSS Partner to go above and
                beyond the call of sponsorship. Are you as invested in TanStack
                Store as we are? Let's push the boundaries of Store together!
              </div>
              <a
                href="mailto:partners@tanstack.com?subject=TanStack Store Partnership"
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
          <span className="rounded-sm bg-gray-500/10 px-2 py-1 text-[.7rem] text-gray-500 dark:bg-gray-500/20">
            This ad helps us be happy about our invested time and not burn out
            and rage-quit OSS. Yay money! 😉
          </span>
        </div>

        {/* <div className="flex flex-col gap-4">
          <div className="px-4 sm:px-6 lg:px-8  mx-auto container max-w-3xl sm:text-center">
            <h3 className="text-3xl text-center leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none mt-2">
              Less code, fewer edge cases.
            </h3>
            <p className="my-4 text-xl leading-7  text-gray-600">
              Instead of encouraging hasty abstractions and hook-focused APIs,
              TanStack Form embraces composition where it counts by giving you
              headless APIs via components (and hooks if you want them of
              course). TanStack Form is designed to be used directly in your
              components and UI. This means less code, fewer edge cases, and
              deeper control over your UI. Try it out with one of the examples
              below!
            </p>
            <div className="flex flex-wrap gap-2 justify-center">
              {(
                [
                  { label: 'React', value: 'react' },
                  { label: 'Solid', value: 'solid' },
                  { label: 'Svelte', value: 'svelte' },
                  { label: 'Vue', value: 'vue' },
                ] as const
              ).map((item) => (
                <button
                  key={item.value}
                  className={`inline-block py-2 px-4 rounded text-black uppercase font-extrabold ${
                    item.value === framework
                      ? 'bg-gray-500'
                      : 'bg-gray-300 dark:bg-gray-700 hover:bg-gray-400'
                  }`}
                  onClick={() => setFramework(item.value)}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {['solid', 'vue', 'svelte'].includes(framework) ? (
          <div className="px-2">
            <div className="p-8 text-center text-lg w-full max-w-(--breakpoint-lg) mx-auto bg-black text-white rounded-xl">
              Looking for the <strong>@tanstack/{framework}-form</strong>{' '}
              example? We could use your help to build the{' '}
              <strong>@tanstack/{framework}-form</strong> adapter! Join the{' '}
              <a
                href="https://tlinz.com/discord"
                className="text-teal-500 font-bold"
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
              src={`https://stackblitz.com/github/${repo}/tree/${branch}/examples/${framework}/simple?embed=1&theme=${
                isDark ? 'dark' : 'light'
              }`}
              title={`tanstack//${framework}-form: simple`}
              sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
              className="shadow-2xl max-h-[800px]"
              loading="lazy"
              style={{
                width: '100%',
                height: '80vh',
                border: '0',
              }}
            ></iframe>
          </div>
        )} */}

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
              className={`inline-block rounded-sm bg-stone-700 px-4 py-2 font-extrabold text-white uppercase`}
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
