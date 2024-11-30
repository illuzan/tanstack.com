import { Link, createFileRoute, notFound } from '@tanstack/react-router'

import { formatAuthors, getPostList } from '~/utils/blog'
import { DocTitle } from '~/components/DocTitle'
import { Markdown } from '~/components/Markdown'
import { format } from 'date-fns'
import { Footer } from '~/components/Footer'
import { extractFrontMatter, fetchRepoFile } from '~/utils/documents.server'
import { PostNotFound } from './blog'
import { createServerFn } from '@tanstack/start'

const fetchFrontMatters = createServerFn({ method: 'GET' }).handler(
  async () => {
    const postInfos = getPostList()

    const frontMatters = await Promise.all(
      postInfos.map(async (info) => {
        const filePath = `app/blog/${info.id}.md`

        const file = await fetchRepoFile(
          'tanstack/tanstack.com',
          'main',
          filePath,
        )

        if (!file) {
          throw notFound()
        }

        const frontMatter = extractFrontMatter(file)

        return [
          info.id,
          {
            title: frontMatter.data.title,
            published: frontMatter.data.published,
            excerpt: frontMatter.excerpt,
            authors: frontMatter.data.authors as Array<string> | undefined,
          },
        ] as const
      }),
    )

    return frontMatters.sort((a, b) => {
      if (!a[1].published) {
        return 1
      }

      return (
        new Date(b[1].published || 0).getTime() -
        new Date(a[1].published || 0).getTime()
      )
    })

    // return json(frontMatters, {
    //   headers: {
    //     'Cache-Control': 'public, max-age=300, s-maxage=3600',
    //   },
    // })
  },
)

export const Route = createFileRoute('/_libraries/blog/')({
  loader: () => fetchFrontMatters(),
  notFoundComponent: () => <PostNotFound />,
  component: BlogIndex,
  head: () => ({
    meta: [
      {
        title: 'Blog',
      },
    ],
  }),
})

function BlogIndex() {
  const frontMatters = Route.useLoaderData()

  return (
    <div>
      <div className="min-h-screen p-4 lg:p-6">
        <div>
          <DocTitle>Blog</DocTitle>
          <div className="h-6" />
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 2xl:grid-cols-3">
          {frontMatters.map(
            ([id, { title, published, excerpt, authors = [] }]) => {
              return (
                <Link
                  key={id}
                  to={`${id}`}
                  className={`flex flex-col justify-between gap-4 rounded-lg border-2 border-transparent bg-white/100 p-4 shadow-xl transition-all hover:border-blue-500 md:p-8 dark:bg-gray-800 dark:shadow-lg dark:shadow-blue-500/30`}
                >
                  <div>
                    <div className={`text-lg font-extrabold`}>{title}</div>
                    <div className={`mt-1 text-xs font-light italic`}>
                      <p>
                        by {formatAuthors(authors)}
                        {published ? (
                          <time
                            dateTime={published}
                            title={format(new Date(published), 'MMM dd, yyyy')}
                          >
                            {' '}
                            on {format(new Date(published), 'MMM dd, yyyy')}
                          </time>
                        ) : null}
                      </p>
                    </div>
                    <div
                      className={`mt-4 text-sm leading-7 text-black dark:text-white`}
                    >
                      <Markdown rawContent={excerpt || ''} />
                    </div>
                  </div>
                  <div>
                    <div className="text-sm font-black text-blue-500 uppercase">
                      Read More
                    </div>
                  </div>
                </Link>
              )
            },
          )}
        </div>
        <div className="h-24" />
      </div>
      <Footer />
    </div>
  )
}
