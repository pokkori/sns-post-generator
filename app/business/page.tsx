import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "AI SNS投稿生成 ビジネスプラン｜マーケター・中小企業・EC運営者向け ¥9,800/月",
  description: "マーケター・EC運営者・中小企業向けのSNS投稿AI法人プラン。複数アカウントのSNS投稿を一括生成。X・Instagram・TikTok対応。毎日の投稿ネタ切れを解消します。",
};

const faqs = [
  {
    q: "ビジネスプランは何名で利用できますか？",
    a: "¥9,800/月のビジネスプランは5名まで、¥19,800/月の法人プランは20名までご利用いただけます。代理店・複数ブランドの運用もお問い合わせください。",
  },
  {
    q: "複数のSNSアカウントに対応していますか？",
    a: "はい、X・Instagram・TikTok・note・YouTube Shortsに対応しています。1回の生成で各媒体に最適化した投稿文を同時生成できます。",
  },
  {
    q: "生成した投稿文は直接SNSに投稿できますか？",
    a: "現在は生成した投稿文をコピーして各SNS投稿画面に貼り付ける形式です。将来的には直接投稿機能の追加を予定しています。",
  },
  {
    q: "請求書・領収書は発行されますか？",
    a: "はい、法人向けに請求書・領収書を発行いたします。経費処理に対応した書類をご用意します。お問い合わせフォームよりご依頼ください。",
  },
  {
    q: "無料トライアルはありますか？",
    a: "はい、3回まで無料でご利用いただけます。ビジネスプランも7日間の無料トライアルをご用意しています。クレジットカード不要です。",
  },
];

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900">
      <nav className="backdrop-blur-sm bg-white/5 border-b border-white/10 px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link href="/" aria-label="AI SNS投稿文ジェネレーターのトップページへ戻る" className="font-bold text-white flex items-center gap-2">
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-indigo-400" aria-hidden="true">
              <path d="M17 2H7C5.9 2 5 2.9 5 4v16l7-3 7 3V4c0-1.1-.9-2-2-2z"/>
            </svg>
            AI SNS投稿文ジェネレーター
          </Link>
          <span className="text-xs text-gray-400">法人・マーケター向けプラン</span>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-6 py-16">
        {/* Hero */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-indigo-500/20 border border-indigo-400/30 rounded-full px-4 py-1.5 text-sm text-indigo-300 mb-6">
            <svg viewBox="0 0 24 24" className="w-4 h-4 fill-indigo-400" aria-hidden="true"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
            マーケター・EC運営者・中小企業向け法人プラン
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight">
            SNS運用をAIで10倍速に。<br className="hidden md:block" />毎日の投稿ネタ切れを解消
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            X・Instagram・TikTokの投稿文をAIが30秒で自動生成。チーム全員が高品質なSNS投稿を量産できます。
          </p>
        </div>

        {/* 課題セクション */}
        <section className="mb-16" aria-labelledby="problems-heading">
          <h2 id="problems-heading" className="text-xl font-bold text-white mb-8 text-center">こんな課題を抱えていませんか？</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {[
              {
                icon: "✏",
                title: "投稿ネタ切れで更新が止まる",
                desc: "毎日投稿しようと思っても、ネタ切れで結局週1〜2回しか投稿できず、フォロワーが伸びない",
              },
              {
                icon: "⏱",
                title: "投稿文作成に時間がかかる",
                desc: "1投稿あたり30分〜1時間かかり、他の業務が後回しになっている。複数SNSへの横展開はさらに大変",
              },
              {
                icon: "📊",
                title: "担当者によって品質がバラバラ",
                desc: "ライター・社員によって投稿の質が異なり、ブランドイメージが統一できていない",
              },
            ].map((item) => (
              <div key={item.title} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="text-2xl mb-3" aria-hidden="true">{item.icon}</div>
                <h3 className="font-bold text-white text-sm mb-2">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 料金プラン */}
        <section className="mb-16" aria-labelledby="pricing-heading">
          <h2 id="pricing-heading" className="text-xl font-bold text-white mb-8 text-center">料金プラン</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                name: "個人プラン",
                price: "¥980",
                unit: "/月",
                users: "1名",
                features: ["生成無制限", "5媒体対応", "5投稿角度"],
                cta: "個人で始める",
                href: "/tool",
                highlight: false,
              },
              {
                name: "ビジネスプラン",
                price: "¥9,800",
                unit: "/月",
                users: "5名まで",
                features: ["生成無制限", "5媒体対応", "スタッフ5名まで", "請求書発行対応", "優先サポート"],
                cta: "7日間無料で試す",
                href: "/tool",
                highlight: true,
              },
              {
                name: "法人プラン",
                price: "¥19,800",
                unit: "/月",
                users: "20名まで",
                features: ["生成無制限", "5媒体対応", "スタッフ20名まで", "請求書発行対応", "専用サポート窓口", "カスタムプロンプト対応"],
                cta: "お問い合わせ",
                href: "mailto:support@sns-post-generator.vercel.app",
                highlight: false,
              },
            ].map((plan) => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 flex flex-col ${plan.highlight ? "bg-indigo-600/20 border-2 border-indigo-500" : "backdrop-blur-sm bg-white/5 border border-white/10"}`}
              >
                {plan.highlight && (
                  <div className="text-xs font-bold text-indigo-400 bg-indigo-400/20 rounded-full px-3 py-1 mb-3 text-center w-fit mx-auto">
                    おすすめ
                  </div>
                )}
                <h3 className="font-bold text-white text-lg mb-1">{plan.name}</h3>
                <div className="mb-1">
                  <span className="text-3xl font-black text-white">{plan.price}</span>
                  <span className="text-sm text-gray-400">{plan.unit}（税込）</span>
                </div>
                <p className="text-xs text-gray-400 mb-4">{plan.users}</p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  aria-label={`${plan.name}を${plan.cta}`}
                  className={`block text-center font-bold py-3 rounded-xl text-sm transition-colors ${plan.highlight ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white/10 text-gray-200 hover:bg-white/20"}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mb-16" aria-labelledby="faq-heading">
          <h2 id="faq-heading" className="text-xl font-bold text-white mb-8 text-center">よくある質問</h2>
          <div className="space-y-4">
            {faqs.map((faq) => (
              <div key={faq.q} className="backdrop-blur-sm bg-white/5 border border-white/10 rounded-xl p-5">
                <h3 className="font-bold text-white text-sm mb-2">Q. {faq.q}</h3>
                <p className="text-sm text-gray-300 leading-relaxed">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="text-center backdrop-blur-sm bg-indigo-600/10 border border-indigo-500/30 rounded-2xl p-10">
          <h2 className="text-2xl font-black text-white mb-4">まずは無料でお試しください</h2>
          <p className="text-gray-300 mb-8">クレジットカード不要。3回まで全機能を無料でお試しいただけます。</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/tool"
              aria-label="AI SNS投稿生成ビジネスプランを無料で試す"
              className="inline-block bg-indigo-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-indigo-700 transition-colors text-sm"
            >
              無料で試す
            </Link>
            <a
              href="mailto:support@sns-post-generator.vercel.app"
              aria-label="AI SNS投稿生成AIの法人プランについてお問い合わせする"
              className="inline-block bg-white/10 text-gray-200 font-bold px-8 py-4 rounded-xl hover:bg-white/20 transition-colors text-sm"
            >
              法人プランについて問い合わせる
            </a>
          </div>
        </div>
      </div>

      <footer className="text-center py-6 text-xs text-gray-400 border-t border-white/10 space-x-4">
        <Link href="/legal" aria-label="特定商取引法に基づく表記を確認する" className="hover:text-gray-300">特定商取引法に基づく表記</Link>
        <Link href="/privacy" aria-label="プライバシーポリシーを確認する" className="hover:text-gray-300">プライバシーポリシー</Link>
        <Link href="/" aria-label="AI SNS投稿文ジェネレーターのトップページへ" className="hover:text-gray-300">トップページ</Link>
      </footer>
    </main>
  );
}
