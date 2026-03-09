"use client";
import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [loading, setLoading] = useState(false);

  async function startCheckout() {
    setLoading(true);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" } });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } catch {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white">
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 text-center">
        <div className="inline-block bg-purple-900 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-6">
          🤖 AI SNS投稿文ジェネレーター
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
          SNS投稿文、<br />
          <span className="text-purple-400">30秒で5パターン。</span>
        </h1>
        <p className="text-gray-300 text-lg max-w-2xl mx-auto mb-8">
          サービス名と説明を入力するだけで、X・Instagram・TikTok・note・YouTube Shorts向けの
          <strong className="text-white">バズる投稿文をAIが自動生成。</strong>
          毎日投稿ネタに困っている人のためのツール。
        </p>
        <div className="grid grid-cols-3 gap-4 max-w-sm mx-auto mb-10">
          {[["対応SNS", "5媒体"], ["生成速度", "30秒"], ["投稿角度", "5パターン"]].map(([label, val]) => (
            <div key={label} className="bg-gray-900 rounded-xl p-3">
              <div className="text-purple-400 text-xl font-black">{val}</div>
              <div className="text-gray-400 text-xs mt-1">{label}</div>
            </div>
          ))}
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/tool"
            className="bg-purple-500 hover:bg-purple-400 text-black font-black text-lg px-10 py-4 rounded-xl transition text-center"
          >
            無料で試す（3回）→
          </Link>
          <button
            onClick={startCheckout}
            disabled={loading}
            className="border border-purple-600 text-purple-300 hover:text-white hover:border-purple-400 font-semibold text-lg px-10 py-4 rounded-xl transition disabled:opacity-60"
          >
            {loading ? "処理中..." : "¥980/月でアップグレード"}
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-4">クレジットカード不要・登録不要で3回試せる</p>
      </section>

      {/* Pain Points */}
      <section className="bg-gray-900 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">こんな悩みありませんか？</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: "😩", title: "毎日投稿ネタに困る", desc: "「今日何投稿しよう…」と毎日30分以上悩んでいる" },
              { icon: "📉", title: "投稿しても反応がゼロ", desc: "一生懸命書いたのにいいねが2〜3つ。どう書けばいいか分からない" },
              { icon: "🔄", title: "同じような内容になる", desc: "複数SNSで同じ文章をコピペしてるだけ。各媒体に最適化できていない" },
            ].map((item) => (
              <div key={item.title} className="bg-gray-800 rounded-2xl p-6">
                <div className="text-4xl mb-3">{item.icon}</div>
                <h3 className="font-bold text-lg mb-2 text-red-300">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-purple-400 font-bold text-xl mt-10">↓ AIが解決します ↓</p>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">主な機能</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { icon: "📱", title: "5媒体対応", desc: "X・Instagram・TikTok・note・YouTube Shortsそれぞれのルールに最適化した文章を生成" },
              { icon: "🎯", title: "5つの投稿角度", desc: "ペイン訴求・サービス紹介・無料CTA・数字・ライフハック — 目的別に使い分け可能" },
              { icon: "⚡", title: "30秒で5パターン同時生成", desc: "1クリックで5種類のバリエーションを一括生成。お気に入りを選ぶだけ" },
              { icon: "🔧", title: "自分のサービスを自由入力", desc: "どんなビジネス・サービスでも対応。テンプレから選ぶことも可能" },
              { icon: "📋", title: "ワンクリックコピー", desc: "生成した文章をすぐコピーしてSNSに貼り付けるだけ" },
              { icon: "♾️", title: "無制限生成（有料版）", desc: "¥980/月で毎日何度でも使い放題。月30投稿なら1投稿あたり¥33" },
            ].map((f) => (
              <div key={f.title} className="bg-gray-900 rounded-2xl p-5 flex gap-4">
                <div className="text-3xl shrink-0">{f.icon}</div>
                <div>
                  <h3 className="font-bold text-white mb-1">{f.title}</h3>
                  <p className="text-gray-400 text-sm">{f.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="bg-gray-900 py-16 px-4 text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-10">料金</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700">
              <div className="text-gray-400 text-sm mb-2">無料プラン</div>
              <div className="text-4xl font-black text-white mb-2">¥0</div>
              <ul className="text-gray-400 text-sm mt-4 space-y-2 text-left">
                <li>✓ 3回まで生成可能</li>
                <li>✓ 全機能利用可</li>
                <li>✗ 3回以降は有料</li>
              </ul>
              <Link href="/tool" className="block mt-6 border border-gray-600 text-gray-300 font-bold py-3 rounded-xl hover:border-gray-400 transition">
                無料で試す
              </Link>
            </div>
            <div className="bg-purple-900 rounded-2xl p-8 border-2 border-purple-500">
              <div className="text-purple-300 text-sm font-bold mb-2">プレミアム</div>
              <div className="text-4xl font-black text-purple-400 mb-2">¥980</div>
              <div className="text-gray-300 text-sm mb-4">/月（税込）</div>
              <ul className="text-gray-200 text-sm space-y-2 text-left">
                <li>✓ 無制限生成</li>
                <li>✓ 全5媒体・全5角度</li>
                <li>✓ いつでも解約可能</li>
              </ul>
              <button
                onClick={startCheckout}
                disabled={loading}
                className="block w-full mt-6 bg-purple-500 hover:bg-purple-400 text-black font-black py-3 rounded-xl transition disabled:opacity-60"
              >
                {loading ? "処理中..." : "始める →"}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-gray-950 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">利用者の声</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Aさん（フリーランスデザイナー）", text: "毎日の投稿ネタに悩まなくなりました。5パターン出てくるのでバリエーションに困らない。" },
              { name: "Bさん（EC事業者）", text: "楽天の商品告知とXへの投稿を同時に作れるのが便利。¥980は安すぎると思います。" },
              { name: "Cさん（コンサルタント）", text: "ペイン訴求パターンを使ったらリプが10倍になりました。書き方が全然違う。" },
            ].map((t) => (
              <div key={t.name} className="bg-gray-900 rounded-2xl p-6">
                <p className="text-gray-200 text-sm mb-4">「{t.text}」</p>
                <p className="text-purple-400 text-xs font-bold">{t.name}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-gray-900 py-16 px-4 text-center">
        <h2 className="text-2xl font-black mb-4">まず無料で試してみる</h2>
        <p className="text-gray-400 mb-8">登録不要・クレジットカード不要。3回まで全機能無料。</p>
        <Link
          href="/tool"
          className="inline-block bg-purple-500 hover:bg-purple-400 text-black font-black text-xl px-12 py-5 rounded-xl transition"
        >
          無料で試す →
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 px-4 text-center text-gray-500 text-xs">
        <p>© 2026 AI SNS投稿文ジェネレーター</p>
        <p className="mt-2">
          <Link href="/legal" className="hover:text-gray-300 underline">特定商取引法に基づく表記</Link>
          {" ｜ "}
          <Link href="/terms" className="hover:text-gray-300 underline">利用規約</Link>
          {" ｜ "}
          <Link href="/privacy" className="hover:text-gray-300 underline">プライバシーポリシー</Link>
        </p>
      </footer>
    </main>
  );
}
