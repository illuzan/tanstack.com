import * as React from 'react'
import { Suspense } from 'react'
import { ImSpinner2 } from 'react-icons/im'

const LazySearchButton = React.lazy(() =>
  import('@orama/react-components').then((mod) => ({
    default: mod.OramaSearchButton,
  })),
)

let defaultMounted = false

export function ClientOnlySearchButton(props: any) {
  const [mounted, setMounted] = React.useState(defaultMounted)

  React.useEffect(() => {
    defaultMounted = true
    setMounted(defaultMounted)
  }, [])

  return (
    <Suspense fallback={null}>
      {mounted ? (
        <LazySearchButton {...props} />
      ) : (
        <div className="flex h-[41px] items-center rounded-md bg-gray-500/5 pl-4">
          <ImSpinner2 className="animate-spin" />
        </div>
      )}
    </Suspense>
  )
}
