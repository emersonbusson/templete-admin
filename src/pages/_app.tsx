 import 'tailwindcss/tailwind.css'
 import '../styles/globals.css'
import { AppProvider } from '../data/context/AppContext'

import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return( 
    <AppProvider>
        <Component {...pageProps}/>
    </AppProvider>
  )
}
