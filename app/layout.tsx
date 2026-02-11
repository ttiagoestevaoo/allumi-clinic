import type { Metadata } from "next";
import { Montserrat, Playfair_Display } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Providers } from "@/lib/providers";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Allumi Clinic — Clínica de Estética em Suzano-SP",
    template: "%s | Allumi Clinic",
  },
  description:
    "Allumi Clinic em Suzano-SP: estética facial, corporal e capilar com tecnologia avançada e resultados naturais. Agende sua consulta e descubra sua melhor versão.",
  keywords: [
    "clínica de estética",
    "estética facial",
    "estética corporal",
    "estética capilar",
    "Suzano",
    "São Paulo",
    "harmonização facial",
    "botox",
    "preenchimento labial",
    "laser",
    "ultrassom",
    "tricologia",
    "alopecia",
    "drenagem linfática",
    "massagem modeladora",
  ],
  authors: [{ name: "Allumi Clinic" }],
  creator: "Allumi Clinic",
  publisher: "Allumi Clinic",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://allumiclinic.com.br"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: "/",
    siteName: "Allumi Clinic",
    title: "Allumi Clinic — Sua melhor versão",
    description:
      "Estética facial, corporal e capilar em Suzano-SP com planejamento personalizado, tecnologia de ponta e foco em resultados naturais.",
    images: [
      {
        url: "/opengraph.jpg",
        width: 1200,
        height: 630,
        alt: "Allumi Clinic — Clínica de Estética em Suzano-SP",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Allumi Clinic — Sua melhor versão",
    description:
      "Clínica de estética em Suzano-SP: facial, corporal e capilar com tecnologia avançada e resultados naturais.",
    images: ["/opengraph.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Adicione aqui códigos de verificação quando disponíveis
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${playfair.variable}`}>
      <head>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </head>
      <body>
        <Providers>
          <TooltipProvider>
            {children}
            <Toaster />
          </TooltipProvider>
        </Providers>
      </body>
    </html>
  );
}

