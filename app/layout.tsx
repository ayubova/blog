import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "styles/globals.css";
import Script from "next/script";
import {Analytics} from "@vercel/analytics/react";
import "react-tippy/dist/tippy.css";
import {ToastContainer} from "react-toastify";
import Provider from "app/layout/Provider";
import "react-toastify/dist/ReactToastify.css";
import {DefaultLayout} from "app/layout/DefaultLayout";

const inter = Inter({subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Julia Ayubova",
  description:
    "Welcome to my personal blog! Here you'll find articles on topics ranging from web technology and to personal development and lifestyle. Join me on my journey and let's explore the world together.",
  openGraph: {
    url: "https://www.ayubova.com/",
    locale: "en_US",
    type: "website",
    siteName: "Julia Ayubova",
  },
};

//       <title>{title ? title + " | " + APP_NAME : APP_NAME}</title>
//       <meta property="og:title" content={title ? title + " | " + APP_NAME : APP_NAME}></meta>
//       <meta property="og:description" name="description" content={desc ? desc : defaultDesc}></meta>
//       <meta property="og:url" content="https://www.ayubova.com/"></meta>
//       <meta property="og:site_name" content="Julia Ayubova"></meta>
//       <meta property="og:locale" content="en-US"></meta>
//       <meta property="og:image:type" content="image/jpeg"></meta>
//       <meta property="og:image:width" content="1920"></meta>
//       <meta property="og:image:height" content="1080"></meta>
//       <meta property="og:image" content={src ? src : "https://res.cloudinary.com/dynf9cvqt/image/upload/v1691572509/ayubova_meta_img.png"} />
//       <meta property="og:type" content="website"></meta>
//       <meta name="twitter:card" content="summary_large_image"></meta>
//       <meta property="twitter:title" content={title ? title + " | " + APP_NAME : APP_NAME}></meta>
//       <meta property="twitter:description" name="description" content={desc ? desc : defaultDesc}></meta>
//       <meta property="twitter:site_name" content="Julia Ayubova"></meta>
//       <meta property="twitter:image:type" content="image/jpeg"></meta>
//       <meta property="twitter:image:width" content="1920"></meta>
//       <meta property="twitter:image:height" content="1080"></meta>
//       <meta property="twitter:image" content={src ? src : "https://res.cloudinary.com/dynf9cvqt/image/upload/v1691572509/ayubova_meta_img.png"} />

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ToastContainer />
          <DefaultLayout>
            {children}
          </DefaultLayout>      

        </Provider>
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
      </body>
    </html>
  );
}
