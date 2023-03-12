import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";
import "../styles/globals.scss";
import { ThemeProvider } from "next-themes";

export default function App({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider session={pageProps.session}>
			<ThemeProvider>
				<Component {...pageProps} />
			</ThemeProvider>
		</SessionProvider>
	);
}
