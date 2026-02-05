import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "StudyHub - Plateforme d'apprentissage interactif",
    template: "%s | StudyHub",
  },
  description:
    "Plateforme d'apprentissage interactif pour étudiants. Cours de modélisation de bases de données, exercices QCM, vrai/faux, association, et mode révision personnalisé.",
  keywords: [
    "apprentissage",
    "cours en ligne",
    "base de données",
    "modélisation",
    "exercices interactifs",
    "QCM",
    "révision",
    "étudiant",
    "informatique",
    "SQL",
    "modèle relationnel",
    "modèle entité-association",
    "StudyHub",
  ],
  authors: [{ name: "StudyHub" }],
  creator: "StudyHub",
  publisher: "StudyHub",
  metadataBase: new URL("https://studyhub.app"),
  alternates: {
    canonical: "/",
    languages: {
      "fr-FR": "/",
    },
  },
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: "StudyHub",
    title: "StudyHub - Plateforme d'apprentissage interactif",
    description:
      "Apprends efficacement avec des cours interactifs, des exercices variés et un suivi de progression personnalisé.",
    url: "https://studyhub.app",
  },
  twitter: {
    card: "summary_large_image",
    title: "StudyHub - Plateforme d'apprentissage interactif",
    description:
      "Apprends efficacement avec des cours interactifs, des exercices variés et un suivi de progression personnalisé.",
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
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        <meta name="theme-color" content="#0a0a0f" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#0a0a0f]`}
      >
        {children}
      </body>
    </html>
  );
}
