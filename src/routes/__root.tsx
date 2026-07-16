import { useEffect } from "react";
import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { UrgencyBar } from "@/components/advertorial/UrgencyBar";
import { ExitIntentPopup } from "@/components/advertorial/ExitIntentPopup";
import { initScrollDepth } from "@/lib/analytics";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "ESI Wellness Joint Advance — Support for Healthy Joints & Mobility" },
      {
        name: "description",
        content:
          "ESI Wellness Joint Advance Formula combines powerful Ayurvedic herbs traditionally known to support joint health, reduce discomfort, and improve movement naturally.",
      },
      { name: "author", content: "ESI Wellness" },
      { property: "og:title", content: "ESI Wellness Joint Advance — Support for Healthy Joints & Mobility" },
      {
        property: "og:description",
        content:
          "Made with Premium Ayurvedic herbs that help reduce joint discomfort, improve flexibility, and support healthy cartilage.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "ESI Wellness Joint Advance — Support for Healthy Joints & Mobility" },
      { name: "description", content: "Lander Creator builds conversion-focused landing pages for lead generation." },
      { property: "og:description", content: "Lander Creator builds conversion-focused landing pages for lead generation." },
      { name: "twitter:description", content: "Lander Creator builds conversion-focused landing pages for lead generation." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6bc0056a-feef-4786-bd58-5b5884ae1515/id-preview-7e12ab7a--2b13fca1-a104-4ade-b5b5-93edb2632aad.lovable.app-1777885839427.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6bc0056a-feef-4786-bd58-5b5884ae1515/id-preview-7e12ab7a--2b13fca1-a104-4ade-b5b5-93edb2632aad.lovable.app-1777885839427.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Playfair+Display:ital,wght@0,500;0,700;1,500&family=Noto+Sans+Tamil:wght@400;500;600;700&family=Noto+Serif+Tamil:wght@500;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

const FB_PIXEL_ID = "929169270106539";

const fbPixelScript = `!function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${FB_PIXEL_ID}');
fbq('track', 'PageView');`;

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script dangerouslySetInnerHTML={{ __html: fbPixelScript }} />
        <noscript
          dangerouslySetInnerHTML={{
            __html: `<img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=${FB_PIXEL_ID}&ev=PageView&noscript=1" />`,
          }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  useEffect(() => {
    return initScrollDepth();
  }, []);
  return (
    <>
      <UrgencyBar />
      <Outlet />
      <ExitIntentPopup />
    </>
  );
}
