/* eslint-disable no-irregular-whitespace */
import "../styles/globals.css";
import type {AppProps} from "next/app";
import {SessionProvider} from "next-auth/react";
import {Session} from "next-auth";
import Router from "next/router";
import nProgress from "nprogress";
import Script from "next/script";
import {Analytics} from "@vercel/analytics/react";
import "react-tippy/dist/tippy.css";
import {ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
interface Props {
  session: Session | null;
}

nProgress.configure({showSpinner: false});
Router.events.on("routeChangeStart", () => nProgress.start());
Router.events.on("routeChangeComplete", () => nProgress.done());
Router.events.on("routeChangeError", () => nProgress.done());

export default function App({Component, pageProps}: AppProps<Props>) {
  return (
    <>
      <div>
      </div>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
        <ToastContainer />
      </SessionProvider>
      <div className="hidden">
        <Script
          strategy="afterInteractive"
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}`}
        />
        <Script
          id="google-analytics"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                page_path: window.location.pathname,
              });
            `,
          }}
        />
        <Analytics />
      </div>
    </>
  );
}
