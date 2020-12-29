import React from 'react'
import { setup, tw } from 'twind'
import { css } from 'twind/css'
import { Seo } from '../components/Seo'
import twindConfig from '../twind.config'

if (typeof window !== 'undefined') {
  setup(twindConfig)
}

// function loadScript(src, attrs = {}) {
//   if (typeof document !== 'undefined') {
//     const script = document.createElement('script')
//     script.async = true
//     script.defer = true
//     Object.keys(attrs).forEach((attr) => script.setAttribute(attr, attrs[attr]))
//     script.src = src
//     document.body.appendChild(script)
//   }
// }  <div className={tw(css({ '& *': 'z-10' }))} />

// const MyGlobalStyles = createGlobalStyle`
//   @media (prefers-color-scheme: dark) {
//     * {
//       scrollbar-color: ${theme`colors.gray.700`} ${theme`colors.gray.800`};

//       ::-webkit-scrollbar, scrollbar {
//         width: 1rem;
//         height: 1rem;
//       }

//       ::-webkit-scrollbar-track, scrollbar-track {
//         background: ${theme`colors.gray.800`};
//       }

//       ::-webkit-scrollbar-thumb, scrollbar-thumb {
//         background: ${theme`colors.gray.700`};
//         border-radius: .5rem;
//         border: 3px solid ${theme`colors.gray.800`};
//       }
//     }
//   }
// `

function MyApp({ Component, pageProps }) {
  // React.useEffect(() => {
  //   loadScript('https://tanstack.ck.page/7b33d93773/index.js', {
  //     'data-uid': '7b33d93773',
  //   })
  // }, [])

  return (
    <>
      {/* <style
        dangerouslySetInnerHTML={{
          __html: `
            * {
              scrollbar-color: ${theme.backgroundAlt} ${theme.gray};
            }
              
            *::-webkit-scrollbar, scrollbar {
              width: 1rem;
              height: 1rem;
            }
            
            *::-webkit-scrollbar-track, scrollbar-track {
              background: ${theme.backgroundAlt};
            }
             
            *::-webkit-scrollbar-thumb, scrollbar-thumb {
              background: ${theme.gray};
              border-radius: .5rem;
              border: 3px solid ${theme.backgroundAlt};
            }
          `,
        }}
      /> */}
      <div className={tw(css({ '& *': 'bg-blue-500' }))} />
      <Seo title="Quality Softare & Open Source Libraries for the Modern Web" />
      {/* <GlobalStyles /> */}
      {/* <MyGlobalStyles /> */}
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
