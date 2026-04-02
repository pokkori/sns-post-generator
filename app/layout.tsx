import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import FeedbackButton from "@/components/FeedbackButton";
import { GoogleAdScript } from "@/components/GoogleAdScript";
import CookieBanner from "@/components/CookieBanner";
import "./globals.css";
import { InstallPrompt } from "@/components/InstallPrompt";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

const notoSansJP = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "700"],
  display: "swap",
  variable: "--font-noto-sans-jp",
});


const SITE_URL = "https://sns-post-generator-mu.vercel.app";
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
    images: [{ url: `${SITE_URL}/opengraph-image`, width: 1200, height: 630, alt: "AI SNS投稿文ジェネレーター" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESC,
    images: [`${SITE_URL}/opengraph-image`],
  },
  metadataBase: new URL(SITE_URL),
  robots: {
    index: true,
    follow: true,
  },
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
    },
    {
      "@type": "Question",
      "name": "SNS投稿AIの使い方は？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "サービス名・商品名と投稿のSNS媒体を選択し、「生成する」ボタンを押すだけです。30秒以内に5つの異なる角度の投稿文が自動生成されます。気に入った文章をそのままSNSに投稿するか、好みに編集してご利用ください。"
      }
    },
    {
      "@type": "Question",
      "name": "ハッシュタグも自動生成されますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、各SNS媒体に最適なハッシュタグも自動生成します。X向けは拡散されやすいハッシュタグ、Instagram向けはリーチを広げるタグを提案します。"
      }
    },
    {
      "@type": "Question",
      "name": "生成された投稿を編集できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、生成された投稿文はコピーしてご自身のSNS投稿画面で自由に編集できます。AIの生成文をベースにブランドのトーン&マナーに合わせてカスタマイズすることを推奨しています。"
      }
    },
    {
      "@type": "Question",
      "name": "投稿の文体（丁寧語/カジュアル）は選べますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、各SNS媒体の特性に合わせた文体で自動生成されます。X向けはカジュアルでインパクト重視、noteやLinkedIn向けはより丁寧なビジネストーンで生成します。"
      }
    },
    {
      "@type": "Question",
      "name": "解約はいつでもできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、いつでも解約できます。解約後は次の請求日から課金が停止されます。解約手続きはマイページから簡単に行えます。違約金・解約手数料は一切かかりません。"
      }
    },
    {
      "@type": "Question",
      "name": "バズる投稿を作るコツをAIが教えてくれますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、5パターンの投稿角度（ペイン訴求・数字インパクト・ライフハック・無料CTA・サービス紹介）の中から、各SNS媒体でバズりやすいフォーマットをAIが自動で選択して生成します。フック文・本文・CTA・ハッシュタグの構成をすべて最適化します。"
      }
    },
    {
      "@type": "Question",
      "name": "投稿後のパフォーマンス分析はできますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "現時点では投稿文の生成に特化したサービスです。投稿後のインプレッション・エンゲージメント分析はSNS各プラットフォームのアナリティクス機能をご活用ください。今後のアップデートで分析機能の追加を検討しています。"
      }
    },
    {
      "@type": "Question",
      "name": "業種・職種別のカスタマイズは可能ですか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、サービス名・商品の説明を具体的に入力することで、業種・職種に合わせた専門的な投稿文を生成します。飲食・美容・IT・不動産・士業など幅広い業種に対応しており、業界特有の言葉遣いやターゲット層に合わせた文章を出力します。"
      }
    },
    {
      "@type": "Question",
      "name": "英語やその他の言語でも投稿文を生成できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "現在は日本語での投稿文生成に最適化されています。英語での生成はプロンプトに英語で入力することで対応可能ですが、日本語ほどの品質保証はできません。海外向けのSNS運用については今後の対応を検討しています。"
      }
    },
    {
      "@type": "Question",
      "name": "個人のSNSアカウントでも法人・企業アカウントでも使えますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "はい、個人のインフルエンサー・副業・フリーランスの方から、中小企業・スタートアップのSNS担当者まで幅広くご利用いただけます。サービス名を入力する際に会社名・ブランド名・個人名のいずれを入力しても対応します。"
      }
    },
    {
      "@type": "Question",
      "name": "生成した投稿文をチームで共有できますか？",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "生成された投稿文はコピーボタンで簡単にコピーでき、Slack・Notion・Google Docsなど任意のツールに貼り付けてチームで共有できます。複数人での運用に便利なチーム向けプランは今後のアップデートで対応予定です。"
      }
    }
  ]
};

const webAppLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  "name": "AI SNS投稿文ジェネレーター",
  "url": SITE_URL,
  "applicationCategory": "BusinessApplication",
  "operatingSystem": "Any",
  "browserRequirements": "Requires JavaScript",
  "offers": {
    "@type": "Offer",
    "price": "0",
    "priceCurrency": "JPY",
    "description": "無料でSNS投稿を生成。月額¥980で無制限利用"
  },
  "description": DESC
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${inter.variable} ${notoSansJP.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppLd) }}
        />
      </head>
      <body className="antialiased">
        {children}
        <InstallPrompt />
        <FeedbackButton />
        <Analytics />
        <SpeedInsights />
        <GoogleAdScript />
        {process.env.NEXT_PUBLIC_CLARITY_ID && process.env.NODE_ENV === 'production' && (
          <Script
            id="clarity-init"
            strategy="afterInteractive"
          >
            {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script","${process.env.NEXT_PUBLIC_CLARITY_ID}");`}
          </Script>
        )}
        <CookieBanner />
      </body>
    </html>
  );
}
