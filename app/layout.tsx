import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";


const SITE_URL = "https://sns-post-generator.vercel.app";
const TITLE = "AI SNS投稿文ジェネレーター | X・Instagram・TikTok対応 30秒で5パターン生成";
const DESC = "サービス名を入力するだけでX・Instagram・TikTok・note・YouTube Shorts向けの投稿文をAIが自動生成。毎日の投稿ネタ切れを解消。¥980/月。";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  openGraph: {
    title: TITLE,
    description: DESC,
    url: SITE_URL,
    siteName: "AI SNS投稿文ジェネレーター",
    locale: "ja_JP",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "AI SNS投稿文ジェネレーター" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: ["/og.png"],
  },
  metadataBase: new URL(SITE_URL),
};

const breadcrumbLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "ホーム", "item": SITE_URL },
    { "@type": "ListItem", "position": 2, "name": "SNS投稿生成AIツール", "item": `${SITE_URL}/tool` },
  ],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "対応しているSNSは何ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "X（旧Twitter）・Instagram・TikTok・Facebook・LinkedIn・note・YouTube Shortsに対応しています。それぞれの媒体のルールや文字数制限に最適化した投稿文を生成します。"
      }
    },
    {
      "@type": "Question",
      "name": "無料で何回使えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "登録不要・クレジットカード不要で3回まで無料でご利用いただけます。全機能をお試しいただけます。4回目以降はプレミアムプラン（¥980/月）にアップグレードが必要です。"
      }
    },
    {
      "@type": "Question",
      "name": "AIで生成した投稿文の著作権はどこに帰属しますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "生成された文章の著作権はユーザー様に帰属します。商用利用も可能です。生成したコンテンツはご自身のSNSアカウントでご自由にお使いください。"
      }
    },
    {
      "@type": "Question",
      "name": "月額プランの内容を教えてください。",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "プレミアムプランは¥980/月（税込）で、投稿文の生成が無制限になります。X・Instagram・TikTok・note・YouTube Shortsの5媒体すべてに対応し、5つの投稿角度（ペイン訴求・サービス紹介・無料CTA・数字・ライフハック）が利用可能です。いつでも解約できます。"
      }
    },
    {
      "@type": "Question",
      "name": "AIで生成した投稿文は自然ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、各SNS媒体の特性に合わせて最適化された自然な文章を生成します。X向けは短文でインパクト重視、Instagramはビジュアル映えするキャプション、TikTokはトレンドに合ったフック文など、5媒体それぞれの文化・文体に対応しています。"
      }
    }
  ]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
