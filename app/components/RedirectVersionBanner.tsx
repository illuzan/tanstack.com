import { useLocalStorage } from '~/utils/useLocalStorage'
import { useClientOnlyRender } from '~/utils/useClientOnlyRender'
import { Link } from '@tanstack/react-router'

export function RedirectVersionBanner(props: {
  version: string
  latestVersion: string
}) {
  const { version, latestVersion } = props

  // After user clicks hide, do not show modal for a month, and then remind users that there is a new version!
  const [showModal, setShowModal] = useLocalStorage(
    'showRedirectToLatestModal',
    true,
    1000 * 60 * 24 * 30,
  )

  if (!useClientOnlyRender()) {
    return null
  }

  if (![latestVersion, 'latest'].includes(version) && showModal) {
    return (
      <div className="fixed top-4 bottom-auto left-1/2 z-20 flex w-[80%] -translate-x-1/2 items-center justify-center gap-2.5 overflow-hidden rounded-3xl bg-white/70 p-4 text-black shadow-xl shadow-black/20 backdrop-blur-sm lg:w-auto lg:gap-4 lg:rounded-full dark:bg-gray-500/40 dark:text-white">
        <p className="block">
          You are currently reading <strong>{version}</strong> docs. Redirect to{' '}
          <Link
            params={{
              version: 'latest',
            }}
            className="font-bold underline"
          >
            latest
          </Link>{' '}
          version?
        </p>
        <div className="flex flex-col items-center gap-2 lg:flex-row">
          <Link
            params={{
              version: 'latest',
            }}
            replace
            className="w-full rounded-md bg-black px-2 py-1 text-xs font-black text-white uppercase lg:w-auto dark:bg-white dark:text-black"
          >
            Latest
          </Link>
          <button
            onClick={() => setShowModal(false)}
            className="w-full rounded-md bg-black px-2 py-1 text-xs font-black text-white uppercase lg:w-auto dark:bg-white dark:text-black"
          >
            Hide
          </button>
        </div>
      </div>
    )
  }

  return null
}
