import * as React from 'react'
import { CgClose, CgMenuLeft } from 'react-icons/cg'
import {
  FaArrowLeft,
  FaArrowRight,
  FaDiscord,
  FaGithub,
  FaTimes,
} from 'react-icons/fa'
import {
  Link,
  useMatches,
  useNavigate,
  useParams,
} from '@tanstack/react-router'
import { OramaSearchBox } from '@orama/react-components'
import { Carbon } from '~/components/Carbon'
import { Select } from '~/components/Select'
import { useLocalStorage } from '~/utils/useLocalStorage'
import { DocsLogo } from '~/components/DocsLogo'
import { last, capitalize } from '~/utils/utils'
import type { SelectOption } from '~/components/Select'
import type { ConfigSchema, MenuItem } from '~/utils/config'
import { create } from 'zustand'
import { searchBoxParams, searchButtonParams } from '~/components/Orama'
import { Framework, getFrameworkOptions } from '~/libraries'
import { DocsCalloutQueryGG } from '~/components/DocsCalloutQueryGG'
import { DocsCalloutBytes } from '~/components/DocsCalloutBytes'
import { ClientOnlySearchButton } from './ClientOnlySearchButton'
import { twMerge } from 'tailwind-merge'
import { partners } from '~/utils/partners'
import { useThemeStore } from './ThemeToggle'

// Let's use zustand to wrap the local storage logic. This way
// we'll get subscriptions for free and we can use it in other
// components if we need to.
const useLocalCurrentFramework = create<{
  currentFramework?: string
  setCurrentFramework: (framework: string) => void
}>((set) => ({
  currentFramework:
    typeof document !== 'undefined'
      ? localStorage.getItem('framework') || undefined
      : undefined,
  setCurrentFramework: (framework: string) => {
    localStorage.setItem('framework', framework)
    set({ currentFramework: framework })
  },
}))

/**
 * Use framework in URL path
 * Otherwise use framework in localStorage if it exists for this project
 * Otherwise fallback to react
 */
function useCurrentFramework(frameworks: Framework[]) {
  const navigate = useNavigate()

  const { framework: paramsFramework } = useParams({
    strict: false,
  })

  const localCurrentFramework = useLocalCurrentFramework()

  let framework = (paramsFramework ||
    localCurrentFramework.currentFramework ||
    'react') as Framework

  framework = frameworks.includes(framework) ? framework : 'react'

  const setFramework = React.useCallback(
    (framework: string) => {
      navigate({
        params: (prev) => ({
          ...prev,
          framework,
        }),
      })
      localCurrentFramework.setCurrentFramework(framework)
    },
    [localCurrentFramework, navigate],
  )

  React.useEffect(() => {
    // Set the framework in localStorage if it doesn't exist
    if (!localCurrentFramework.currentFramework) {
      localCurrentFramework.setCurrentFramework(framework)
    }

    // Set the framework in localStorage if it doesn't match the URL
    if (
      paramsFramework &&
      paramsFramework !== localCurrentFramework.currentFramework
    ) {
      localCurrentFramework.setCurrentFramework(paramsFramework)
    }
  })

  return {
    framework,
    setFramework,
  }
}

// Let's use zustand to wrap the local storage logic. This way
// we'll get subscriptions for free and we can use it in other
// components if we need to.
const useLocalCurrentVersion = create<{
  currentVersion?: string
  setCurrentVersion: (version: string) => void
}>((set) => ({
  currentVersion:
    typeof document !== 'undefined'
      ? localStorage.getItem('version') || undefined
      : undefined,
  setCurrentVersion: (version: string) => {
    localStorage.setItem('version', version)
    set({ currentVersion: version })
  },
}))

/**
 * Use framework in URL path
 * Otherwise use framework in localStorage if it exists for this project
 * Otherwise fallback to react
 */
function useCurrentVersion(versions: string[]) {
  const navigate = useNavigate()

  const { version: paramsVersion } = useParams({
    strict: false,
  })

  const localCurrentVersion = useLocalCurrentVersion()

  let version = paramsVersion || localCurrentVersion.currentVersion || 'latest'

  version = versions.includes(version) ? version : 'latest'

  const setVersion = React.useCallback(
    (version: string) => {
      navigate({
        params: (prev: Record<string, string>) => ({
          ...prev,
          version,
        }),
      })
      localCurrentVersion.setCurrentVersion(version)
    },
    [localCurrentVersion, navigate],
  )

  React.useEffect(() => {
    // Set the version in localStorage if it doesn't exist
    if (!localCurrentVersion.currentVersion) {
      localCurrentVersion.setCurrentVersion(version)
    }

    // Set the version in localStorage if it doesn't match the URL
    if (paramsVersion && paramsVersion !== localCurrentVersion.currentVersion) {
      localCurrentVersion.setCurrentVersion(paramsVersion)
    }
  })

  return {
    version,
    setVersion,
  }
}

const useMenuConfig = ({
  config,
  repo,
  frameworks,
}: {
  config: ConfigSchema
  repo: string
  frameworks: Framework[]
}): MenuItem[] => {
  const currentFramework = useCurrentFramework(frameworks)

  const localMenu: MenuItem = {
    label: 'Menu',
    children: [
      {
        label: 'Home',
        to: '..',
      },
      {
        label: (
          <div className="flex items-center gap-2">
            GitHub <FaGithub className="text-lg opacity-20" />
          </div>
        ),
        to: `https://github.com/${repo}`,
      },
      {
        label: (
          <div className="flex items-center gap-2">
            Discord <FaDiscord className="text-lg opacity-20" />
          </div>
        ),
        to: 'https://tlinz.com/discord',
      },
    ],
  }

  return [
    localMenu,
    // Merge the two menus together based on their group labels
    ...config.sections.map((section): MenuItem | undefined => {
      const frameworkDocs = section.frameworks?.find(
        (f) => f.label === currentFramework.framework,
      )
      const frameworkItems = frameworkDocs?.children ?? []

      const children = [
        ...section.children.map((d) => ({ ...d, badge: 'core' })),
        ...frameworkItems.map((d) => ({
          ...d,
          badge: currentFramework.framework,
        })),
      ]

      if (children.length === 0) {
        return undefined
      }

      return {
        label: section.label,
        children,
        collapsible: section.collapsible ?? false,
        defaultCollapsed: section.defaultCollapsed ?? false,
      }
    }),
  ].filter((item) => item !== undefined)
}

const useFrameworkConfig = ({ frameworks }: { frameworks: Framework[] }) => {
  const currentFramework = useCurrentFramework(frameworks)

  const frameworkConfig = React.useMemo(() => {
    return {
      label: 'Framework',
      selected: frameworks.includes(currentFramework.framework)
        ? currentFramework.framework
        : 'react',
      available: getFrameworkOptions(frameworks),
      onSelect: (option: { label: string; value: string }) => {
        currentFramework.setFramework(option.value)
      },
    }
  }, [frameworks, currentFramework])

  return frameworkConfig
}

const useVersionConfig = ({ versions }: { versions: string[] }) => {
  const currentVersion = useCurrentVersion(versions)

  const versionConfig = React.useMemo(() => {
    const available = versions.reduce(
      (acc: SelectOption[], version) => {
        acc.push({
          label: version,
          value: version,
        })
        return acc
      },
      [
        {
          label: 'Latest',
          value: 'latest',
        },
      ],
    )

    return {
      label: 'Version',
      selected: versions.includes(currentVersion.version)
        ? currentVersion.version
        : 'latest',
      available,
      onSelect: (option: { label: string; value: string }) => {
        currentVersion.setVersion(option.value)
      },
    }
  }, [currentVersion, versions])

  return versionConfig
}

type DocsLayoutProps = {
  name: string
  version: string
  colorFrom: string
  colorTo: string
  textColor: string
  config: ConfigSchema
  frameworks: Framework[]
  versions: string[]
  repo: string
  children: React.ReactNode
}

export function DocsLayout({
  name,
  version,
  colorFrom,
  colorTo,
  textColor,
  config,
  frameworks,
  versions,
  repo,
  children,
}: DocsLayoutProps) {
  const { libraryId } = useParams({
    from: '/$libraryId/$version/docs',
  })
  const frameworkConfig = useFrameworkConfig({ frameworks })
  const versionConfig = useVersionConfig({ versions })
  const menuConfig = useMenuConfig({ config, frameworks, repo })

  const { mode: themeMode } = useThemeStore()

  const oramaThemeMode = themeMode === 'auto' ? 'system' : themeMode

  const matches = useMatches()
  const lastMatch = last(matches)

  const isExample = matches.some((d) => d.pathname.includes('/examples/'))

  const detailsRef = React.useRef<HTMLElement>(null!)

  const flatMenu = React.useMemo(
    () => menuConfig.flatMap((d) => d?.children),
    [menuConfig],
  )

  const docsMatch = matches.find((d) => d.pathname.includes('/docs'))

  const relativePathname = lastMatch.pathname.replace(
    docsMatch!.pathname + '/',
    '',
  )

  const index = flatMenu.findIndex((d) => d?.to === relativePathname)
  const prevItem = flatMenu[index - 1]
  const nextItem = flatMenu[index + 1]

  const [showBytes, setShowBytes] = useLocalStorage('showBytes', true)

  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  const menuItems = menuConfig.map((group, i) => {
    const WrapperComp = group.collapsible ? 'details' : 'div'
    const LabelComp = group.collapsible ? 'summary' : 'div'

    const isCollapsed = group.defaultCollapsed ?? false

    const detailsProps = group.collapsible ? { open: !isCollapsed } : {}

    return (
      <WrapperComp
        key={`group-${i}`}
        className="relative select-none [&>div.ts-sidebar-label]:ml-[1rem] [&>summary]:marker:-ml-[0.3rem] [&>summary]:marker:text-[0.8em] [&>summary]:marker:leading-4 [&>summary]:before:mr-[0.4rem]"
        {...detailsProps}
      >
        <LabelComp className="ts-sidebar-label text-[.8em] leading-4 font-black uppercase">
          {group?.label}
        </LabelComp>
        <div className="h-2" />
        <ul className="ml-2 list-none text-[.85em]">
          {group?.children?.map((child, i) => {
            const linkClasses = `cursor-pointer flex gap-2 items-center justify-between group px-2 py-[.1rem] rounded-lg hover:bg-gray-500/10`

            return (
              <li key={i}>
                {child.to.startsWith('http') ? (
                  <a href={child.to} className={linkClasses}>
                    {child.label}
                  </a>
                ) : (
                  <Link
                    to={child.to}
                    params
                    onClick={() => {
                      detailsRef.current.removeAttribute('open')
                    }}
                    activeOptions={{
                      exact: true,
                    }}
                    className="relative cursor-pointer!"
                  >
                    {(props) => {
                      return (
                        <div className={twMerge(linkClasses)}>
                          <div
                            className={twMerge(
                              'w-full overflow-auto',
                              props.isActive
                                ? `bg-linear-to-r bg-clip-text font-bold text-transparent ${colorFrom} ${colorTo}`
                                : '',
                            )}
                          >
                            {/* <div className="transition group-hover:delay-700 duration-300 group-hover:duration-[2s] group-hover:translate-x-[-50%]"> */}
                            {child.label}
                            {/* </div> */}
                          </div>
                          {child.badge ? (
                            <div
                              className={`text-xs ${
                                props.isActive ? 'opacity-100' : 'opacity-40'
                              } font-bold transition-opacity group-hover:opacity-100 ${
                                child.badge === 'react'
                                  ? 'text-sky-500'
                                  : child.badge === 'solid'
                                    ? 'text-blue-500'
                                    : child.badge === 'svelte'
                                      ? 'text-orange-500'
                                      : child.badge === 'vue'
                                        ? 'text-green-500'
                                        : child.badge === 'angular'
                                          ? 'text-fuchsia-500'
                                          : child.badge === 'qwik'
                                            ? 'text-indigo-500'
                                            : child.badge === 'lit'
                                              ? 'text-emerald-500'
                                              : child.badge === 'vanilla'
                                                ? 'text-yellow-500'
                                                : 'text-gray-500'
                              }`}
                            >
                              {child.badge}
                            </div>
                          ) : null}
                        </div>
                      )
                    }}
                  </Link>
                )}
              </li>
            )
          })}
        </ul>
      </WrapperComp>
    )
  })

  const logo = (
    <DocsLogo
      name={name}
      linkTo={repo.replace('tanstack/', '')}
      version={version}
      colorFrom={colorFrom}
      colorTo={colorTo}
    />
  )

  const smallMenu = (
    <div className="sticky top-0 z-20 bg-white lg:hidden dark:bg-gray-900">
      <details
        ref={detailsRef as any}
        id="docs-details"
        className="border-b border-gray-500/20"
      >
        <summary className="flex items-center justify-between gap-2 p-4">
          <div className="flex flex-1 items-center gap-2 text-xl md:text-2xl">
            <CgMenuLeft className="icon-open mr-2 cursor-pointer" />
            <CgClose className="icon-close mr-2 cursor-pointer" />
            {logo}
          </div>
        </summary>
        <div className="flex h-[0vh] flex-col gap-4 overflow-y-auto border-t border-gray-500/20 bg-gray-100 p-4 text-lg whitespace-nowrap dark:bg-gray-900">
          <div className="flex gap-4">
            <Select
              label={frameworkConfig.label}
              selected={frameworkConfig.selected}
              available={frameworkConfig.available}
              onSelect={frameworkConfig.onSelect}
            />
            <Select
              label={versionConfig.label}
              selected={versionConfig.selected!}
              available={versionConfig.available}
              onSelect={versionConfig.onSelect}
            />
          </div>
          <ClientOnlySearchButton
            {...searchButtonParams}
            colorScheme={oramaThemeMode}
          >
            Search
          </ClientOnlySearchButton>
          {menuItems}
        </div>
      </details>
    </div>
  )

  const largeMenu = (
    <div className="sticky top-0 z-20 hidden h-screen max-w-[300px] flex-col gap-4 border-gray-500/20 bg-white shadow-xl transition-all duration-500 lg:flex xl:max-w-[350px] 2xl:max-w-[400px] dark:border-r dark:bg-gray-900/50">
      <div
        className="flex items-center gap-2 px-4 pt-4 text-2xl"
        style={{
          viewTransitionName: `library-name`,
        }}
      >
        {logo}
      </div>
      <div className="px-4">
        <ClientOnlySearchButton {...searchButtonParams} />
      </div>
      <div className="flex gap-2 px-4">
        <Select
          className="flex-[3_1_0%]"
          label={frameworkConfig.label}
          selected={frameworkConfig.selected}
          available={frameworkConfig.available}
          onSelect={frameworkConfig.onSelect}
        />
        <Select
          className="flex-[2_1_0%]"
          label={versionConfig.label}
          selected={versionConfig.selected!}
          available={versionConfig.available}
          onSelect={versionConfig.onSelect}
        />
      </div>
      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-4 pb-8 text-base whitespace-nowrap">
        {menuItems}
      </div>
    </div>
  )

  return (
    <div
      className={`flex min-h-screen w-full flex-col transition-all duration-300 lg:flex-row`}
    >
      <div className="fixed z-50">
        {mounted && (
          <OramaSearchBox
            {...searchBoxParams}
            searchParams={{
              threshold: 0,
              where: {
                category: {
                  eq: capitalize(libraryId!) as string,
                },
              } as any,
            }}
            facetProperty={undefined}
            colorScheme={oramaThemeMode}
          />
        )}
      </div>
      {smallMenu}
      {largeMenu}
      <div
        className={twMerge(
          `relative flex min-h-[88dvh] w-full max-w-full min-w-0 justify-center lg:min-h-0`,
          !isExample && 'mx-auto w-[1208px]',
        )}
      >
        {children}
        <div className="fixed bottom-3 z-10 flex flex-wrap items-center px-1 text-xs md:text-sm print:hidden">
          <div className="flex flex-wrap justify-end px-1">
            {prevItem ? (
              <Link
                to={prevItem.to}
                params
                className="z-20 flex items-center justify-center overflow-hidden rounded-lg bg-white/70 px-2 py-1 text-black shadow-lg shadow-black/20 backdrop-blur-sm dark:bg-gray-500/40 dark:text-white"
              >
                <div className="flex items-center gap-2 font-bold">
                  <FaArrowLeft />
                  {prevItem.label}
                </div>
              </Link>
            ) : null}
          </div>
          <div className="flex flex-wrap justify-start px-1">
            {nextItem ? (
              <Link
                to={nextItem.to}
                params
                className="z-20 flex items-center justify-center overflow-hidden rounded-lg bg-white/70 px-2 py-1 text-black shadow-lg shadow-black/20 backdrop-blur-sm dark:bg-gray-500/40 dark:text-white"
              >
                <div className="flex items-center gap-2 font-bold">
                  <span
                    className={`bg-linear-to-r ${colorFrom} ${colorTo} bg-clip-text text-transparent`}
                  >
                    {nextItem.label}
                  </span>{' '}
                  <FaArrowRight className={textColor} />
                </div>
              </Link>
            ) : null}
          </div>
        </div>
      </div>
      <div className="sticky top-0 -ml-2 hidden max-h-screen w-64 shrink-0 overflow-y-auto pl-2 md:block">
        <div className="ml-auto flex flex-col space-y-4">
          <div className="flex flex-col divide-y divide-gray-500/20 rounded-bl-lg border border-t-0 border-r-0 border-gray-500/20 bg-white shadow-xl dark:bg-gray-900/30">
            <div className="p-3 text-center font-black uppercase opacity-50">
              Our Partners
            </div>
            {!partners.some((d) => d.libraries?.includes(libraryId as any)) ? (
              <div className="transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-500/10">
                <a
                  href={`mailto:partners@tanstack.com?subject=TanStack ${
                    repo.split('/')[1]
                  } Partnership`}
                  className="block p-2 text-xs"
                >
                  <span className="italic opacity-50">
                    Wow, it looks like you could be our first partner for this
                    library!
                  </span>{' '}
                  <span className="font-black text-blue-500">
                    Chat with us!
                  </span>
                </a>
              </div>
            ) : (
              partners
                .filter((d) => d.sidebarImgLight)
                .filter((d) => d.libraries?.includes(libraryId as any))
                .map((partner) => {
                  return (
                    <div
                      key={partner.name}
                      className="overflow-hidden transition-colors hover:bg-gray-500/10 dark:hover:bg-gray-500/10"
                    >
                      <a
                        href={partner.href}
                        target="_blank"
                        className="flex cursor-pointer items-center justify-center px-4"
                        rel="noreferrer"
                      >
                        <div className="mx-auto max-w-[150px]">
                          <img
                            src={partner.sidebarImgLight}
                            alt={partner.name}
                            className={twMerge(
                              'w-full',
                              partner.sidebarImgClass,
                              'dark:hidden',
                            )}
                          />
                          <img
                            src={
                              partner.sidebarImgDark || partner.sidebarImgLight
                            }
                            alt={partner.name}
                            className={twMerge(
                              'w-full',
                              partner.sidebarImgClass,
                              'hidden dark:block',
                            )}
                          />
                        </div>
                      </a>
                    </div>
                  )
                })
            )}
          </div>
          <div className="flex flex-col divide-y divide-gray-500/20 rounded-l-lg border-t border-b border-l border-gray-500/20 bg-white p-4 shadow-xl dark:bg-gray-900/30">
            {libraryId === 'query' ? (
              <DocsCalloutQueryGG />
            ) : (
              <DocsCalloutBytes />
            )}
          </div>

          <div className="flex flex-col space-y-2 rounded-l-lg border-t border-b border-l border-gray-500/20 bg-white p-4 shadow-xl dark:bg-gray-900/20">
            <Carbon />
            <div className="self-center rounded bg-gray-500/10 px-2 py-1 text-[.7rem] text-gray-500 italic opacity-50 transition-opacity hover:opacity-100 dark:bg-gray-500/20">
              This ad helps to keep us from burning out and rage-quitting OSS
              just *that* much more, so chill. 😉
            </div>
          </div>
        </div>
      </div>
      {showBytes ? (
        <div className="w-[300px] max-w-[350px] fixed md:hidden top-1/2 right-2 z-30 -translate-y-1/2 shadow-lg print:hidden">
          <div className="bg-white dark:bg-gray-800 border border-black/10 dark:border-white/10 p-4 md:p-6 rounded-lg">
            {libraryId === 'query' ? (
              <DocsCalloutQueryGG />
            ) : (
              <DocsCalloutBytes />
            )}
            <button
              className="opacity:30 absolute top-0 right-0 p-2 hover:text-red-500 hover:opacity-100"
              onClick={() => {
                setShowBytes(false)
              }}
            >
              <FaTimes />
            </button>
          </div>
        </div>
      ) : (
        <button
          className="fixed top-1/2 right-0 -translate-y-[50px] lg:hidden print:hidden"
          onClick={() => {
            setShowBytes(true)
          }}
        >
          <div className="origin-bottom-right -rotate-90 rounded-t-md border border-gray-100 bg-white p-1 px-2 text-xs shadow-md hover:bg-rose-600 hover:text-white dark:border-0 dark:bg-gray-800">
            {libraryId === 'query' ? (
              <>
                <strong>
                  <span role="img" aria-label="crystal ball">
                    &#128302;
                  </span>{' '}
                  Skip the docs?
                </strong>
              </>
            ) : (
              <>
                Subscribe to <strong>Bytes</strong>
              </>
            )}
          </div>
        </button>
      )}
    </div>
  )
}
