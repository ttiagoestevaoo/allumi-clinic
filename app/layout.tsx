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
    "Allumi Clinic em Suzano-SP: clínica de estética avançada especializada em tratamentos faciais, corporais e capilares. Harmonização facial, botox, preenchimentos, laser, tricologia e muito mais. Tecnologia de ponta, resultados naturais e atendimento personalizado. Agende sua consulta.",
  keywords: [
    "clínica de estética",
    "estética facial",
    "estética corporal",
    "estética capilar",
    "Suzano",
    "Suzano SP",
    "São Paulo",
    "SP",
    "Carolline Estevão",
    "Dra. Carolline Estevão",
    "Dra. Carol",
    "Dra Carol",
    "doutora Carolline",
    "harmonização facial",
    "botox",
    "preenchimento labial",
    "preenchimento full face",
    "preenchimento olheiras",
    "bioestimulador de colágeno",
    "rejuvenescimento facial",
    "limpeza de pele",
    "peeling coreano",
    "peeling ultrassônico",
    "laser lavieen",
    "ultrassom micro e macro focado",
    "harmonização glútea",
    "gordura localizada",
    "protocolo emagrecimento",
    "drenagem linfática",
    "massagem modeladora",
    "massagem relaxante",
    "tricologia",
    "alopecia",
    "alopecia androgenética",
    "calvice",
    "eflúvio telógeno",
    "queda capilar",
    "crescimento capilar",
    "tratamento acne",
    "clínica estética Suzano",
    "estética avançada Suzano",
    "estética Suzano",
    "clínica de estética Suzano SP",
  ],
  authors: [{ name: "Allumi Clinic" }],
  creator: "Allumi Clinic",
  publisher: "Allumi Clinic",
  formatDetection: {
    email: false,
    address: true,
    telephone: true,
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
      "Allumi Clinic em Suzano-SP: clínica de estética avançada com harmonização facial, botox, preenchimentos, laser, tricologia e tratamentos corporais. Tecnologia de ponta e resultados naturais.",
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
      "Allumi Clinic em Suzano-SP: harmonização facial, botox, preenchimentos, laser, tricologia e tratamentos corporais. Tecnologia avançada e resultados naturais.",
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
        <link rel="icon" type="image/png" href="/logo-allumi.png" />
        <link rel="apple-touch-icon" href="/logo-allumi.png" />
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

