import { HTMLProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function DocContainer({
  children,
  ...props
}: { children: React.ReactNode } & HTMLProps<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={twMerge(
        'max-w-full space-y-2 p-2 md:space-y-6 md:p-6 lg:space-y-8 lg:p-8',
        props.className,
      )}
    >
      {children}
    </div>
  )
}
