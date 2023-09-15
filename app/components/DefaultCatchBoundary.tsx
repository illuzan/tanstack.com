import { Link, isRouteErrorResponse, useRouteError } from '@remix-run/react'

export function DefaultCatchBoundary({ isRoot }: { isRoot?: boolean }) {
  const error = useRouteError();
  
  if (isRouteErrorResponse(error)) {
  let message
  switch (error.status) {
    case 401:
      message = (
        <p>
          Oops! Looks like you tried to visit a page that you do not have access
          to.
        </p>
      )
      break
    case 404:
      message = (
        <p>Oops! Looks like you tried to visit a page that does not exist.</p>
      )
      break

    default:
      throw new Error(caught.data || caught.statusText)
  }

  return (
    <div className="flex-1 p-4 flex flex-col items-center justify-center gap-6">
      <h1 className="opacity-10 flex flex-col text-center font-black">
        <div className="text-7xl leading-none">{error.status}</div>
        {error.statusText ? (
          <div className="text-3xl leading-none">{error.statusText}</div>
        ) : null}
      </h1>
      {message ? <div className="text-lg">{message}</div> : null}
      {isRoot ? (
        <Link
          to="/"
          className={`py-2 px-4 bg-gray-600 dark:bg-gray-700 rounded text-white uppercase font-extrabold`}
        >
          TanStack Home
        </Link>
      ) : null}
    </div>
  )
  }
}
