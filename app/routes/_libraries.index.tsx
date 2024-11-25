import {
  Await,
  Link,
  MatchRoute,
  createFileRoute,
  getRouteApi,
} from '@tanstack/react-router'
import { Carbon } from '~/components/Carbon'
import { twMerge } from 'tailwind-merge'
import { CgSpinner } from 'react-icons/cg'
import { Footer } from '~/components/Footer'
import SponsorPack from '~/components/SponsorPack'
import discordImage from '~/images/discord-logo-white.svg'
import { useMutation } from '~/hooks/useMutation'
import { sample } from '~/utils/utils'
import { libraries } from '~/libraries'
import logoColor from '~/images/logo-color-600w.png'
import bytesImage from '~/images/bytes.svg'
// import toyPalmChair from '~/images/toy-palm-chair.png'
// import waves from '~/images/waves.png'
// import background from '~/images/background.jpg'
import { partners } from '../utils/partners'
import { FaBox, FaCube, FaDownload, FaStar, FaUsers } from 'react-icons/fa'

export const textColors = [
  `text-rose-500`,
  `text-yellow-500`,
  `text-teal-500`,
  `text-blue-500`,
]

export const gradients = [
  `from-rose-500 to-yellow-500`,
  `from-yellow-500 to-teal-500`,
  `from-teal-500 to-violet-500`,
  `from-blue-500 to-pink-500`,
]

const courses = [
  {
    name: 'The Official TanStack React Query Course',
    cardStyles: `border-t-4 border-red-500 hover:(border-green-500)`,
    href: 'https://query.gg/?s=tanstack',
    description: `Learn how to build enterprise quality apps with TanStack's React Query the easy way with our brand new course.`,
  },
]

export const Route = createFileRoute('/_libraries/')({
  loader: () => {
    return {
      randomNumber: Math.random(),
    }
  },
  component: Index,
})

async function bytesSignupServerFn({ email }: { email: string }) {
  'use server'

  return fetch(`https://bytes.dev/api/bytes-optin-cors`, {
    method: 'POST',
    body: JSON.stringify({
      email,
      influencer: 'tanstack',
    }),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })
}

const librariesRouteApi = getRouteApi('/_libraries')

function Index() {
  const bytesSignupMutation = useMutation({
    fn: bytesSignupServerFn,
  })

  const { randomNumber } = Route.useLoaderData()
  const { sponsorsPromise } = librariesRouteApi.useLoaderData()
  const gradient = sample(gradients, randomNumber)

  return (
    <>
      {/* <img
        src={waves}
        className="-bottom-[50px] -left-[10px] z-0 fixed opacity-20"
      />
      <img
        src={toyPalmChair}
        className="-bottom-[50px] -right-[100px] z-0 fixed opacity-20"
      /> */}
      <div className="z-10 max-w-full">
        <div className="flex flex-col items-center gap-6 px-4 pt-12 text-center lg:pt-24">
          <div className="flex items-center gap-2 lg:gap-4">
            <img
              src={logoColor}
              alt="TanStack Logo"
              className="w-[40px] md:w-[60px] lg:w-[100px]"
            />
            <h1
              className={`inline-block text-5xl font-black md:text-6xl lg:text-8xl`}
            >
              <span
                className={`inline-block bg-linear-to-r bg-clip-text text-transparent ${gradient} mb-2 [letter-spacing:-.05em] uppercase underline decoration-gray-200 decoration-4 underline-offset-[.5rem] md:decoration-8 md:underline-offset-[1rem] dark:decoration-gray-800`}
              >
                TanStack
              </span>
            </h1>
          </div>
          <h2 className="max-w-md text-2xl font-bold text-balance md:text-4xl lg:max-w-2xl lg:text-5xl">
            High-quality open-source software for{' '}
            <span className="underline decoration-yellow-500 decoration-dashed decoration-3 underline-offset-2">
              web developers.
            </span>
          </h2>
          <p className="text max-w-sm text-balance opacity-90 lg:max-w-2xl lg:text-xl">
            Headless, type-safe, & powerful utilities for Web Applications,
            Routing, State Management, Data Visualization, Datagrids/Tables, and
            more.
          </p>
        </div>
        <div className="h-8" />
        <div className="mx-auto grid w-fit grid-cols-1 place-items-center items-center justify-center gap-8 rounded-xl bg-white/50 p-8 shadow-xl sm:grid-cols-2 xl:grid-cols-4 dark:bg-gray-700/30 dark:shadow-none">
          <div className="flex items-center gap-4">
            <FaDownload className="text-2xl" />
            <div className="">
              <div className="text-2xl font-bold opacity-80">352,749,203</div>
              <div className="text-sm font-medium italic opacity-50">
                NPM Downloads
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaStar className="text-2xl" />
            <div className="">
              <div className="text-2xl font-bold opacity-80">91,478</div>
              <div className="text-sm font-medium italic opacity-50">
                Stars on Github
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaUsers className="text-2xl" />
            <div className="">
              <div className="text-2xl font-bold opacity-80">1,959</div>
              <div className="text-sm font-medium italic opacity-50">
                Contributors on GitHub
              </div>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <FaCube className="text-2xl" />
            <div className="">
              <div className="text-2xl font-bold opacity-80">1,126,523</div>
              <div className="text-sm font-medium italic opacity-50">
                Dependents on GitHub
              </div>
            </div>
          </div>
        </div>
        <div className="h-24" />
        <div className="px-4 md:mx-auto lg:max-w-(--breakpoint-lg)">
          <h3 className={`text-4xl font-light`}>Open Source Libraries</h3>
          <div
            className={`mt-4 grid grid-cols-1 gap-8 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3`}
          >
            {libraries.map((library, i) => {
              return (
                <Link
                  key={library.name}
                  to={library.to ?? '#'}
                  params
                  className={twMerge(
                    `rounded-lg border-4 border-transparent bg-white p-4 text-white shadow-lg transition-all md:p-8 dark:border dark:border-gray-800 dark:bg-gray-900`,
                    library.cardStyles,
                  )}
                  style={{
                    zIndex: i,
                  }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <MatchRoute
                      pending
                      to={library.to}
                      children={(isPending) => {
                        return (
                          <div
                            className={twMerge(
                              `text-2xl font-extrabold`,
                              // isPending && `[view-transition-name:library-name]`
                            )}
                            style={{
                              viewTransitionName: `library-name-${library.id}`,
                            }}
                          >
                            {library.name}
                          </div>
                        )
                      }}
                    />
                    {library.badge ? (
                      <div
                        className={twMerge(
                          `animate-pulse rounded-full bg-yellow-500 px-2 py-1 text-xs font-black text-white uppercase`,
                          library.bgStyle,
                        )}
                      >
                        {library.badge}
                      </div>
                    ) : null}
                  </div>
                  <div className={`mt-2 text-lg font-light italic`}>
                    {library.tagline}
                  </div>
                  <div className={`mt-2 text-sm text-black dark:text-white`}>
                    {library.description}
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
        <div className="h-12" />
        <div className={`px-4 md:mx-auto lg:max-w-(--breakpoint-lg)`}>
          <h3 className={`mb-4 text-4xl font-light`}>Partners</h3>
          <div className={`grid grid-cols-1 gap-6 sm:grid-cols-2`}>
            {partners.map((partner) => {
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
        <div className="h-20" />
        <div className={`mx-auto px-4 lg:max-w-(--breakpoint-lg)`}>
          <h3 className={`text-4xl font-light`}>Courses</h3>
          <div className={`mt-4 grid grid-cols-1 gap-4`}>
            {courses.map((course) => (
              <a
                key={course.name}
                href={course.href}
                className={`flex justify-between gap-2 rounded-lg border-2 border-transparent bg-white/90 p-4 shadow-xl shadow-green-700/10 transition-all hover:border-green-500 md:p-8 dark:bg-gray-800/90 dark:shadow-green-500/30`}
                target="_blank"
                rel="noreferrer"
              >
                <div className={`col-span-2 md:col-span-5`}>
                  <div className={`text-2xl font-bold text-green-500`}>
                    {course.name}
                  </div>
                  <div className={`mt-2 text-sm`}>{course.description}</div>
                  <div
                    className={`mt-4 inline-block rounded-sm bg-green-500 px-4 py-2 text-sm font-black text-white uppercase shadow`}
                  >
                    Check it out →
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
        <div className="h-12" />
        <div className={`mx-auto px-4 lg:max-w-(--breakpoint-lg)`}>
          <h3 className={`text-4xl font-light`}>OSS Sponsors</h3>
          <div className="h-4" />
          <div
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
          <div className={`h-6`} />
          <div className={`text-center`}>
            <div>
              <a
                href="https://github.com/sponsors/tannerlinsley"
                className={`inline-block rounded-sm bg-green-500 p-4 font-black text-white uppercase`}
              >
                Become a Sponsor!
              </a>
            </div>
            <div className={`h-4`} />
            <p
              className={`mx-auto max-w-(--breakpoint-sm) text-gray-500 italic`}
            >
              Sponsors get special perks like{' '}
              <strong>
                private discord channels, priority issue requests, direct
                support and even course vouchers
              </strong>
              !
            </p>
          </div>
        </div>
        <div className="h-12" />
        <div className={`mx-auto px-4 lg:max-w-[400px]`}>
          <div className="flex flex-col gap-4">
            <div className="mx-auto max-w-[250px] overflow-hidden rounded-lg bg-white shadow-lg dark:bg-gray-800 dark:text-white">
              <Carbon />
            </div>
            <span className="self-center rounded bg-gray-500/10 px-2 py-1 text-[.7rem] text-gray-500 dark:bg-gray-500/20">
              This ad helps us be happy about our invested time and not burn out
              and rage-quit OSS. Yay money! 😉
            </span>
          </div>
        </div>
        <div className="h-12" />
        <div className="mx-auto max-w-(--breakpoint-lg) px-4">
          <div
            className={`bg-discord relative grid gap-6 overflow-hidden rounded-md p-4 text-white shadow-xl shadow-indigo-700/30 sm:grid-cols-3 sm:p-8`}
          >
            <div
              className={`absolute top-0 right-0 z-0 -translate-y-1/3 translate-x-1/3 transform opacity-10 sm:opacity-20`}
            >
              <img
                src={discordImage}
                alt="Discord Logo"
                width={300}
                height={300}
              />
            </div>
            <div className={`sm:col-span-2`}>
              <h3 className={`text-3xl`}>TanStack on Discord</h3>
              <p className={`mt-4`}>
                The official TanStack community to ask questions, network and
                make new friends and get lightning fast news about what's coming
                next for TanStack!
              </p>
            </div>
            <div className={`flex items-center justify-center`}>
              <a
                href="https://discord.com/invite/WrRKjPJ"
                target="_blank"
                className={`text-discord z-10 mt-4 block w-full rounded bg-white px-4 py-2 text-center font-black uppercase shadow-lg`}
                rel="noreferrer"
              >
                Join TanStack Discord
              </a>
            </div>
          </div>
        </div>
        <div className="h-4" />
        <div className="relative mx-auto max-w-(--breakpoint-lg) px-4">
          <div className="rounded-md bg-white p-8 shadow-xl shadow-gray-900/10 md:p-14 dark:bg-gray-800">
            {!bytesSignupMutation.submittedAt ? (
              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  const formData = new FormData(e.currentTarget)

                  bytesSignupMutation.mutate({
                    email: formData.get('email_address')?.toString() || '',
                  })
                }}
              >
                <div>
                  <div className={`relative inline-block`}>
                    <h3 className={`text-3xl`}>Subscribe to Bytes</h3>
                    <figure className={`absolute top-0 right-[-48px]`}>
                      <img
                        src={bytesImage}
                        alt="Bytes Logo"
                        width={40}
                        height={40}
                      />
                    </figure>
                  </div>

                  <h3 className={`mt-1 text-lg`}>
                    The Best JavaScript Newsletter
                  </h3>
                </div>
                <div className={`mt-4 grid grid-cols-3 gap-2`}>
                  <input
                    disabled={bytesSignupMutation.status === 'pending'}
                    className={`dark:(text-white bg-gray-700) col-span-2 w-full rounded-sm bg-gray-200 p-3 text-sm text-black placeholder-gray-400 outline-hidden focus:outline-hidden`}
                    name="email_address"
                    placeholder="Your email address"
                    type="text"
                    required
                  />
                  <button
                    type="submit"
                    className={`rounded-sm bg-[#ED203D] font-black text-white uppercase`}
                  >
                    <span>
                      {bytesSignupMutation.status === 'pending'
                        ? 'Loading ...'
                        : 'Subscribe'}
                    </span>
                  </button>
                </div>
                {bytesSignupMutation.error ? (
                  <p
                    className={`mt-2 text-sm font-semibold text-red-500 italic`}
                  >
                    Looks like something went wrong. Please try again.
                  </p>
                ) : (
                  <p className={`mt-2 text-sm font-semibold italic opacity-30`}>
                    Join over 100,000 devs
                  </p>
                )}
              </form>
            ) : (
              <p>🎉 Thank you! Please confirm your email</p>
            )}
          </div>
        </div>
        <div className={`h-20`} />
        <Footer />
      </div>
    </>
  )
}
