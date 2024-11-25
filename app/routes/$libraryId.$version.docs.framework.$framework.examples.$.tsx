import { createFileRoute } from '@tanstack/react-router'
import React from 'react'

import { FaExternalLinkAlt } from 'react-icons/fa'
import { DocTitle } from '~/components/DocTitle'
import { getBranch, getLibrary } from '~/libraries'
import { getInitialSandboxFileName } from '~/utils/sandbox'
import { seo } from '~/utils/seo'
import { capitalize, slugToTitle } from '~/utils/utils'

export const Route = createFileRoute(
  '/$libraryId/$version/docs/framework/$framework/examples/$',
)({
  head: ({ params }) => {
    const library = getLibrary(params.libraryId)

    return {
      meta: seo({
        title: `${capitalize(params.framework)} ${library.name} ${slugToTitle(
          params._splat || '',
        )} Example | ${library.name} Docs`,
        description: `An example showing how to implement ${slugToTitle(
          params._splat || '',
        )} in ${capitalize(params.framework)} using ${library.name}.`,
      }),
    }
  },
  component: Example,
})

export default function Example() {
  const { version, framework, _splat, libraryId } = Route.useParams()
  const library = getLibrary(libraryId)
  const branch = getBranch(library, version)

  const examplePath = [framework, _splat].join('/')

  const [isDark, setIsDark] = React.useState(true)

  React.useEffect(() => {
    setIsDark(window.matchMedia?.(`(prefers-color-scheme: dark)`).matches)
  }, [])

  const sandboxFirstFileName = getInitialSandboxFileName(framework, libraryId)

  const githubUrl = `https://github.com/${library.repo}/tree/${branch}/examples/${examplePath}`
  // preset=node can be removed once Stackblitz runs Angular as webcontainer by default
  // See https://github.com/stackblitz/core/issues/2957
  const stackBlitzUrl = `https://stackblitz.com/github/${
    library.repo
  }/tree/${branch}/examples/${examplePath}?embed=1&theme=${
    isDark ? 'dark' : 'light'
  }&preset=node&file=${sandboxFirstFileName}`
  const codesandboxUrl = `https://codesandbox.io/p/devbox/github/${
    library.repo
  }/tree/${branch}/examples/${examplePath}?embed=1&theme=${
    isDark ? 'dark' : 'light'
  }&file=${sandboxFirstFileName}`

  const hideCodesandbox = library.hideCodesandboxUrl
  const hideStackblitz = library.hideStackblitzUrl
  const showVercel = library.showVercelUrl

  return (
    <div className="flex min-h-0 flex-1 flex-col overflow-auto">
      <div className="p-4 lg:p-6">
        <DocTitle>
          <span>
            {capitalize(framework)} Example: {slugToTitle(_splat)}
          </span>
          <div className="flex flex-wrap items-center gap-4 text-xs font-normal">
            {showVercel ? (
              <a
                href={`https://vercel.com/new/clone?repository-url=${githubUrl}`}
              >
                <img src="https://vercel.com/button" alt="Deploy with Vercel" />
              </a>
            ) : null}
            <a
              href={githubUrl}
              target="_blank"
              className="flex items-center gap-1"
              rel="noreferrer"
            >
              <FaExternalLinkAlt /> Github
            </a>
            {!hideStackblitz ? (
              <a
                href={stackBlitzUrl}
                target="_blank"
                className="flex items-center gap-1"
                rel="noreferrer"
              >
                <FaExternalLinkAlt /> StackBlitz
              </a>
            ) : null}
            {!hideCodesandbox ? (
              <a
                href={codesandboxUrl}
                target="_blank"
                className="flex items-center gap-1"
                rel="noreferrer"
              >
                <FaExternalLinkAlt /> CodeSandbox
              </a>
            ) : null}
          </div>
        </DocTitle>
      </div>
      <div className="flex min-h-0 flex-1 flex-col lg:px-6">
        <iframe
          src={stackBlitzUrl}
          title={`${library.name} | ${examplePath}`}
          sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          className="w-full flex-1 overflow-hidden bg-white shadow-xl shadow-gray-700/20 lg:rounded-lg dark:bg-black"
        />
      </div>
      <div className="lg:mt-2 lg:h-16" />
    </div>
  )
}
