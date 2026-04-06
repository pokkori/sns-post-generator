"use client";

import Link from "next/link";
import { useState } from "react";

const PURPOSES = [
  "自社マーケティングのSNS運用効率化",
  "EC・ネットショップの商品投稿に活用",
  "インフルエンサーマネジメントに使いたい",
  "代理店として複数クライアントへ提供したい",
  "その他",
];

function DemoForm() {
  const [form, setForm] = useState({ company: "", name: "", email: "", phone: "", purpose: "" });
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const subject = encodeURIComponent("SNS投稿生成AI 法人プラン お問い合わせ");
    const body = encodeURIComponent(
      `会社名: ${form.company}\n担当者名: ${form.name}\nメール: ${form.email}\n電話番号: ${form.phone}\nご利用目的: ${form.purpose}`
    );
    window.open(`mailto:support@pokkorilab.com?subject=${subject}&body=${body}`, "_blank");
    setSubmitted(true);
  }

  return (
    <section className="py-16 bg-[#0B1120]">
      <div className="max-w-2xl mx-auto px-6">
        <div className="text-center mb-8">
          <div className="inline-block text-xs font-semibold px-3 py-1 rounded-full mb-3 bg-indigo-500/20 text-indigo-300 border border-indigo-400/30">
            法人・代理店限定
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">無料デモ・お問い合わせ</h2>
          <p className="text-sm text-gray-400">3営業日以内にご連絡いたします</p>
        </div>
        {submitted ? (
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center">
            <svg viewBox="0 0 24 24" className="w-12 h-12 fill-green-400 mx-auto mb-3" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
            <p className="font-bold text-white mb-2">メールアプリが開きました</p>
            <p className="text-sm text-gray-400">送信後、3営業日以内にご連絡いたします。<br />メールが開かない場合は <span className="font-medium text-gray-300">support@pokkorilab.com</span> まで直接ご連絡ください。</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">会社名 <span className="text-red-400">*</span></label>
                <input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))} placeholder="株式会社○○" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">担当者名 <span className="text-red-400">*</span></label>
                <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} placeholder="山田 太郎" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">メールアドレス <span className="text-red-400">*</span></label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))} placeholder="info@example.com" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-300 mb-1">電話番号</label>
                <input value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} placeholder="03-0000-0000" className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-indigo-400" />
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-300 mb-1">ご利用目的</label>
              <select value={form.purpose} onChange={e => setForm(f => ({ ...f, purpose: e.target.value }))} className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-indigo-400">
                <option value="" className="bg-gray-900">選択してください</option>
                {PURPOSES.map(p => <option key={p} value={p} className="bg-gray-900">{p}</option>)}
              </select>
            </div>
            <button type="submit" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-bold py-3 rounded-xl text-sm transition-colors min-h-[44px]">
              無料デモを申し込む →
            </button>
            <p className="text-xs text-gray-500 text-center">送信するとメールアプリが開きます。3営業日以内にご連絡します。</p>
          </form>
        )}
      </div>
    </section>
  );
}

const PROBLEMS = [
  { title: "担当者によってSNS投稿の品質がバラバラ", desc: "AIが均一品質で生成。ブランドのトーン&マナーを維持しながら、誰でも高品質な投稿を量産できます。" },
  { title: "複数SNSへの横展開に時間がかかる", desc: "X・Instagram・TikTok・note・YouTube Shorts向けの投稿を1回の操作で同時生成。横展開工数をゼロに。" },
  { title: "クライアントへの投稿案提出が間に合わない", desc: "30秒で5パターン生成。クライアントへの提案稿作成時間を90%削減できます。" },
  { title: "投稿ネタ切れでSNS更新が止まってしまう", desc: "AIが無限に投稿アイデアを生成。更新頻度を維持し、フォロワーの離脱を防ぎます。" },
];

const USECASES = [
  {
    title: "マーケティング会社・SNS代理店",
    problem: "クライアントごとに異なるトーンの投稿案を大量に作成する作業に多大な時間がかかっていた。",
    solution: "クライアントのサービス名・特徴を入力するだけでX・Instagram・TikTok向け投稿を即生成。担当者は改善・承認に専念。",
    result: "1クライアントあたりの投稿案作成時間が3時間から15分に短縮",
  },
  {
    title: "EC・ネットショップ運営者",
    problem: "商品ごとに異なる切り口のSNS投稿を作るのが大変で、新商品発売のたびに更新が滞っていた。",
    solution: "商品名と特徴を入力するだけで5つの投稿角度（ペイン訴求・数字・ライフハック等）を即生成。販促スピードが劇的に向上。",
    result: "SNS経由の売上が前月比40%増加",
  },
  {
    title: "インフルエンサー事務所",
    problem: "所属タレントのSNS更新頻度を維持するためのネタ出しに毎日1〜2時間かかっていた。",
    solution: "タレントのキャラクター・活動内容を設定して投稿案を一括生成。10名分の投稿を1時間で準備できるように。",
    result: "所属タレントのフォロワー増加率が平均2倍に向上",
  },
];

const PLANS = [
  {
    name: "スターター",
    price: "¥4,980",
    per: "/月",
    target: "マーケター・EC事業者（10アカウントまで）",
    features: [
      "SNSアカウント10個まで",
      "投稿生成無制限",
      "X・Instagram・TikTok・note対応",
      "5投稿角度すべて利用可能",
      "請求書払い対応",
    ],
    cta: "まず試してみる",
    href: "/tool",
    highlight: false,
  },
  {
    name: "プロ",
    price: "¥14,800",
    per: "/月",
    target: "マーケティング会社・代理店（50アカウントまで）",
    features: [
      "SNSアカウント50個まで",
      "投稿生成無制限",
      "全媒体対応（YouTube Shorts含む）",
      "チームメンバー5名まで",
      "カスタムトーン設定",
      "優先サポート",
      "請求書払い対応",
    ],
    cta: "お問い合わせ",
    href: "mailto:support@pokkorilab.com?subject=SNS投稿生成AI法人プランについて",
    highlight: true,
  },
  {
    name: "代理店プラン",
    price: "¥29,800",
    per: "/月",
    target: "インフルエンサー事務所・大規模代理店",
    features: [
      "SNSアカウント無制限",
      "投稿生成無制限",
      "チームメンバー無制限",
      "クライアント管理ダッシュボード",
      "ホワイトラベル対応",
      "専任サポート担当",
      "API連携対応",
      "請求書払い対応",
    ],
    cta: "お問い合わせ",
    href: "mailto:support@pokkorilab.com?subject=SNS投稿生成AI代理店プランについて",
    highlight: false,
  },
];

const FAQ_ITEMS = [
  {
    q: "生成した投稿文の著作権はどこに帰属しますか？",
    a: "生成された文章の著作権はユーザー様に帰属します。商用利用も可能です。クライアントへの納品物としても問題なくご利用いただけます。",
  },
  {
    q: "クライアントごとにトーン・文体をカスタマイズできますか？",
    a: "プロプラン以上ではカスタムトーン設定が可能です。クライアントのブランドガイドラインに合わせた文体・キャラクターを設定して生成できます。",
  },
  {
    q: "複数のチームメンバーで使えますか？",
    a: "スタータープランは1名向けです。プロプランはチームメンバー5名まで、代理店プランは無制限でご利用いただけます。",
  },
  {
    q: "請求書払い・銀行振込は対応していますか？",
    a: "はい。全法人プランで請求書払いに対応しています。経費処理しやすい形式で請求書を発行します。",
  },
  {
    q: "ホワイトラベルとはどういう意味ですか？",
    a: "代理店プランでは、自社ブランドでSNS投稿生成AIをクライアントに提供できます。「自社開発ツール」として提案することが可能です。詳細はお問い合わせください。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "はい、いつでも解約可能です。解約後は次回更新日まで引き続きご利用いただけます。違約金・解約手数料は一切かかりません。",
  },
];

export default function BusinessPage() {
  return (
    <main className="min-h-screen bg-[#0B1120]">
      <nav className="border-b border-white/10 px-6 py-4 sticky top-0 bg-[#0B1120]/95 backdrop-blur z-10">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <span className="font-bold text-white">
            AI SNS投稿生成 <span className="text-indigo-400 text-sm font-medium ml-2">法人向け</span>
          </span>
          <div className="flex gap-3">
            <Link href="/" className="text-sm text-gray-400 hover:text-gray-200">個人向けはこちら</Link>
            <Link href="/tool" className="bg-indigo-600 text-white text-sm font-medium px-4 py-2 rounded-lg hover:bg-indigo-700 min-h-[44px] flex items-center">
              無料で試す
            </Link>
          </div>
        </div>
      </nav>

      {/* ヒーロー */}
      <section className="max-w-4xl mx-auto px-6 py-20 text-center">
        <div className="inline-block bg-indigo-500/20 text-indigo-300 text-xs font-semibold px-3 py-1 rounded-full mb-6 border border-indigo-400/30">
          マーケティング会社・EC事業者・インフルエンサー事務所向け法人プラン
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
          SNS運用コストを<br /><span className="text-indigo-400">AIで90%削減する</span>
        </h1>
        <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
          X・Instagram・TikTok対応の投稿文を30秒で生成。<br />
          チーム全員が高品質なSNS投稿を量産できます。
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tool"
            className="inline-block bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-900/50 min-h-[56px] flex items-center justify-center"
          >
            まず無料で試す →
          </Link>
          <a
            href="mailto:support@pokkorilab.com?subject=SNS投稿生成AI法人プランについて"
            className="inline-block bg-white/10 text-gray-200 font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/20 border border-white/10 min-h-[56px] flex items-center justify-center"
          >
            法人プランを問い合わせる
          </a>
        </div>
        <p className="text-xs text-gray-500 mt-4">解約はいつでも可能 | 請求書払い対応 | ホワイトラベル対応</p>
      </section>

      {/* スタッツ */}
      <section className="bg-indigo-600/10 border-y border-indigo-500/20 py-12">
        <div className="max-w-4xl mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
            {[
              { num: "30秒", label: "1投稿の生成時間", sub: "従来30〜60分の作業をAIが代行" },
              { num: "5媒体", label: "対応SNS数", sub: "X・Instagram・TikTok・note・YouTube Shorts" },
              { num: "90%", label: "投稿作成コスト削減", sub: "外注費・人件費を大幅削減" },
            ].map(stat => (
              <div key={stat.num} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-6">
                <div className="text-4xl font-bold text-indigo-400 mb-1">{stat.num}</div>
                <div className="text-sm font-medium text-white">{stat.label}</div>
                <div className="text-xs text-gray-400 mt-1">{stat.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 課題 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-white mb-10">こんな課題を解決します</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {PROBLEMS.map(p => (
              <div key={p.title} className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-xl p-5">
                <p className="font-semibold text-white mb-2 flex items-start gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" className="shrink-0 mt-0.5 text-red-400" aria-hidden="true"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>{p.title}
                </p>
                <p className="text-sm text-gray-400 flex items-start gap-2">
                  <span className="text-green-400 shrink-0 mt-0.5">→</span>{p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ユースケース */}
      <section className="py-16 bg-white/5">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-white mb-10">導入事例</h2>
          <div className="space-y-5">
            {USECASES.map(u => (
              <div key={u.title} className="bg-[#0B1120] rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-bold text-white mb-4">{u.title}</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs font-semibold text-red-400 mb-1">課題</p>
                    <p className="text-sm text-gray-400">{u.problem}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-indigo-400 mb-1">解決策</p>
                    <p className="text-sm text-gray-400">{u.solution}</p>
                  </div>
                  <div className="bg-green-500/10 rounded-lg p-3 border border-green-500/20">
                    <p className="text-xs font-semibold text-green-400 mb-1">導入効果</p>
                    <p className="text-sm font-bold text-green-400">{u.result}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 料金 */}
      <section className="py-16">
        <div className="max-w-4xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-white mb-3">法人向け料金プラン</h2>
          <p className="text-center text-gray-400 text-sm mb-10">すべてのプランで請求書払い対応。初期費用ゼロ。</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PLANS.map(plan => (
              <div
                key={plan.name}
                className={`rounded-2xl p-6 flex flex-col relative ${plan.highlight ? "bg-indigo-600/20 border-2 border-indigo-500" : "bg-white/5 backdrop-blur-xl border border-white/10"}`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-xs bg-indigo-600 text-white px-3 py-0.5 rounded-full whitespace-nowrap">
                    最も人気
                  </div>
                )}
                <p className="text-xs text-gray-400 mb-1">{plan.target}</p>
                <p className="font-bold text-white text-lg mb-1">{plan.name}</p>
                <p className="text-3xl font-bold text-indigo-400 mb-5">
                  {plan.price}<span className="text-sm font-normal text-gray-400">{plan.per}</span>
                </p>
                <ul className="space-y-2 mb-6 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="text-sm text-gray-300 flex items-start gap-2">
                      <svg viewBox="0 0 24 24" className="w-4 h-4 fill-indigo-400 flex-shrink-0 mt-0.5" aria-hidden="true"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href={plan.href}
                  className={`block w-full text-center text-sm font-bold py-3 rounded-xl min-h-[44px] ${plan.highlight ? "bg-indigo-600 text-white hover:bg-indigo-700" : "bg-white/10 text-gray-200 hover:bg-white/20"}`}
                >
                  {plan.cta}
                </a>
              </div>
            ))}
          </div>
          <p className="text-center text-xs text-gray-500 mt-4">解約はいつでも可能 | 年間契約割引あり（20%OFF）</p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-6">
        <div className="max-w-2xl mx-auto bg-indigo-600/20 border border-indigo-500/30 rounded-2xl p-8 text-center">
          <p className="text-sm font-semibold text-indigo-300 mb-2">まずは実際の生成品質を体感してください</p>
          <h2 className="text-2xl font-bold text-white mb-4">SNS投稿の工数を、今月から削減する</h2>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/tool"
              className="inline-block bg-indigo-600 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-indigo-700 shadow-lg shadow-indigo-900/50 min-h-[56px] flex items-center justify-center"
            >
              まず無料で試す →
            </Link>
            <a
              href="mailto:support@pokkorilab.com?subject=SNS投稿生成AI法人プランについて"
              className="inline-block bg-white/10 text-gray-200 font-bold text-lg px-8 py-4 rounded-xl hover:bg-white/20 border border-white/10 min-h-[56px] flex items-center justify-center"
            >
              法人プランを問い合わせる
            </a>
          </div>
          <p className="text-gray-400 text-xs mt-3">初期費用ゼロ | 解約はいつでも可能</p>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white/5">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-2xl font-bold text-center text-white mb-10">よくある質問</h2>
          <div className="space-y-4">
            {FAQ_ITEMS.map((faq, i) => (
              <div key={i} className="bg-[#0B1120] rounded-xl p-5 border border-white/10">
                <p className="font-semibold text-white mb-2 text-sm">Q. {faq.q}</p>
                <p className="text-sm text-gray-400">A. {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* デモ申込フォーム */}
      <DemoForm />

      {/* 最終CTA */}
      <section className="bg-indigo-600 py-16 text-center px-6">
        <h2 className="text-2xl font-bold text-white mb-3">SNS投稿の外注コストを、今月から削減する</h2>
        <p className="text-indigo-100 text-sm mb-8">初期費用ゼロ。解約はいつでも可能。リスクなくお試しいただけます。</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href="/tool"
            className="inline-block bg-white text-indigo-600 font-bold text-lg px-8 py-4 rounded-xl hover:bg-indigo-50 shadow-lg min-h-[56px] flex items-center justify-center"
          >
            まず無料で試す →
          </Link>
          <a
            href="mailto:support@pokkorilab.com?subject=SNS投稿生成AI法人プランについて"
            className="inline-block bg-indigo-500 text-white font-bold text-lg px-8 py-4 rounded-xl hover:bg-indigo-400 min-h-[56px] flex items-center justify-center"
          >
            法人プランを問い合わせる
          </a>
        </div>
      </section>

      <footer className="border-t border-white/10 py-6 text-center text-xs text-gray-500 space-x-4">
        <Link href="/legal" className="hover:text-gray-300">特定商取引法に基づく表記</Link>
        <Link href="/privacy" className="hover:text-gray-300">プライバシーポリシー</Link>
        <Link href="/" className="hover:text-gray-300">トップページ</Link>
      </footer>
    </main>
  );
}
