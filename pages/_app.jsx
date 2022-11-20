import { useState } from 'react'
import Head from 'next/head'
import { SessionProvider } from 'next-auth/react'
import { Hydrate, QueryClient, QueryClientProvider } from '@tanstack/react-query'
import AppProvider from 'components/_app'
import { PayPalScriptProvider } from '@paypal/react-paypal-js'

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
	const [queryClient] = useState(() => new QueryClient())
	const layout = Component.layout || ((page) => page)

	return (
		<>
			<Head>
				<title>Romadan</title>
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<meta name="description" content="One of the best distributors of high-quality water filtration, containers, bottles and printing services." />
				<link rel="icon" type="image/png" size="96x96" href="favicon.png" />
			</Head>

			<SessionProvider session={session}>
				<QueryClientProvider client={queryClient}>
					<Hydrate state={pageProps.dehydratedState}>
						<PayPalScriptProvider options={{ 'client-id': process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID }}>
							<AppProvider active={true} authentication={Component.authentication}>
								{layout(<Component {...pageProps} />)}
							</AppProvider>
						</PayPalScriptProvider>
					</Hydrate>
				</QueryClientProvider>
			</SessionProvider>
		</>
	)
}

export default App
