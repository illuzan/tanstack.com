import { CgSpinner } from 'react-icons/cg'
import { Link, createFileRoute, getRouteApi } from '@tanstack/react-router'
import { Carbon } from '~/components/Carbon'
import { Footer } from '~/components/Footer'
import { TbHeartHandshake } from 'react-icons/tb'
import SponsorPack from '~/components/SponsorPack'
import { storeProject } from '~/libraries/store'
import { Await } from '@tanstack/react-router'
import { seo } from '~/utils/seo'
import { twMerge } from 'tailwind-merge'
import { getLibrary } from '~/libraries'
import { LibraryFeatureHighlights } from '~/components/LibraryFeatureHighlights'

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
const library = getLibrary('store')

export default function StoreVersionIndex() {
  const { sponsorsPromise } = librariesRouteApi.useLoaderData()
  const { version } = Route.useParams()

  const gradientText = `inline-block text-transparent bg-clip-text bg-linear-to-r ${storeProject.colorFrom} ${storeProject.colorTo}`

  return (
    <>
      <div className="flex flex-col gap-20 md:gap-32 max-w-full pt-32">
        <div className="flex flex-col items-center gap-6 text-center px-4">
          <h1 className="font-black flex gap-3 items-center text-4xl md:text-6xl lg:text-7xl xl:text-8xl uppercase [letter-spacing:-.05em]">
            <span>TanStack</span>
            <span className={twMerge(gradientText)}>Store</span>
          </h1>
          <h2
            className="font-bold text-2xl max-w-md
            md:text-3xl
            lg:text-5xl lg:max-w-2xl"
          >
            <span className="underline decoration-dashed decoration-gray-500 underline-offset-2">
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
        <LibraryFeatureHighlights
          featureHighlights={library.featureHighlights}
        />
        <div className="px-4 w-[500px] max-w-full mx-auto">
          <h3 className="text-center text-3xl leading-8 font-extrabold tracking-tight sm:text-4xl sm:leading-10 lg:leading-none mt-8">
            Partners
          </h3>
          <div className="h-8" />
          <div
            className="flex-1 flex flex-col items-center text-sm text-center
                      bg-white/80 shadow-xl shadow-gray-500/20 rounded-lg
                        divide-y-2 divide-gray-500/10 overflow-hidden
                        dark:bg-black/40 dark:shadow-none"
          >
            <span className="flex items-center gap-2 p-12 text-4xl text-rose-500 font-black uppercase">
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
