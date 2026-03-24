"use client";
import { useState } from "react";
import Link from "next/link";
import PayjpModal from "@/components/PayjpModal";

export default function Home() {
  const [showPayjp, setShowPayjp] = useState(false);
  const loading = false;
  const startCheckout = () => setShowPayjp(true);

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-950 via-purple-950/30 to-gray-950 text-white">
      {/* Hero */}
      <section className="pt-20 pb-16 px-4 text-center">
        <div className="inline-flex items-center gap-1.5 bg-purple-900 text-purple-300 text-xs font-bold px-3 py-1 rounded-full mb-6">
          <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-purple-400" aria-hidden="true"><path d="M12 2a2 2 0 0 1 2 2c0 .74-.4 1.39-1 1.73V7h1a7 7 0 0 1 7 7h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1v1a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-1H2a1 1 0 0 1-1-1v-3a1 1 0 0 1 1-1h1a7 7 0 0 1 7-7h1V5.73c-.6-.34-1-.99-1-1.73a2 2 0 0 1 2-2M7.5 13A2.5 2.5 0 0 0 5 15.5 2.5 2.5 0 0 0 7.5 18 2.5 2.5 0 0 0 10 15.5 2.5 2.5 0 0 0 7.5 13m9 0a2.5 2.5 0 0 0-2.5 2.5 2.5 2.5 0 0 0 2.5 2.5 2.5 2.5 0 0 0 2.5-2.5 2.5 2.5 0 0 0-2.5-2.5z"/></svg>
          AI SNS投稿文ジェネレーター
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
            <div key={label} className="backdrop-blur-sm bg-white/10 border border-white/20 shadow-lg rounded-xl p-3">
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
            aria-label="¥980/月のプレミアムプランに申し込む"
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
              { num: "01", title: "毎日投稿ネタに困る", desc: "「今日何投稿しよう…」と毎日30分以上悩んでいる" },
              { num: "02", title: "投稿しても反応がゼロ", desc: "一生懸命書いたのにいいねが2〜3つ。どう書けばいいか分からない" },
              { num: "03", title: "同じような内容になる", desc: "複数SNSで同じ文章をコピペしてるだけ。各媒体に最適化できていない" },
            ].map((item) => (
              <div key={item.title} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px' }} className="shadow-lg p-6">
                <div className="text-purple-500 text-xs font-black tracking-widest mb-3">{item.num}</div>
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
              { label: "5媒", title: "5媒体対応", desc: "X・Instagram・TikTok・note・YouTube Shortsそれぞれのルールに最適化した文章を生成" },
              { label: "角", title: "5つの投稿角度", desc: "ペイン訴求・サービス紹介・無料CTA・数字・ライフハック — 目的別に使い分け可能" },
              { label: "30s", title: "30秒で5パターン同時生成", desc: "1クリックで5種類のバリエーションを一括生成。お気に入りを選ぶだけ" },
              { label: "入力", title: "自分のサービスを自由入力", desc: "どんなビジネス・サービスでも対応。テンプレから選ぶことも可能" },
              { label: "Copy", title: "ワンクリックコピー", desc: "生成した文章をすぐコピーしてSNSに貼り付けるだけ" },
              { label: "∞", title: "無制限生成（有料版）", desc: "¥980/月で毎日何度でも使い放題。月30投稿なら1投稿あたり¥33" },
            ].map((f) => (
              <div key={f.title} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px' }} className="shadow-lg p-5 flex gap-4">
                <div className="w-10 h-10 rounded-xl bg-purple-800 flex items-center justify-center text-purple-300 text-xs font-black shrink-0">{f.label}</div>
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
            <div style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px' }} className="shadow-lg p-8">
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
            <div style={{ background: 'rgba(88,28,135,0.45)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '2px solid rgba(168,85,247,0.5)', borderRadius: '16px' }} className="shadow-lg p-8">
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
                aria-label="プレミアムプランの申し込みを開始する"
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
              <div key={t.name} style={{ background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '16px' }} className="shadow-lg p-6">
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
        <div style={{ background: 'rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: '20px' }} className="shadow-lg p-8 max-w-md mx-auto mb-6">
          <Link
            href="/tool"
            aria-label="SNS投稿生成AIを無料で試す（3回）"
            className="inline-block bg-purple-500 hover:bg-purple-400 text-black font-black text-xl px-12 py-5 rounded-xl transition w-full"
          >
            無料で試す →
          </Link>
        </div>
        <div className="mt-6">
          <a
            href="https://twitter.com/intent/tweet?text=AIで5媒体のSNS投稿文を一括生成！無料3回試せます&url=https://sns-post-generator-mu.vercel.app"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="XでSNS投稿生成AIをシェアする"
            className="inline-flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
          >
            𝕏 でシェアする
          </a>
        </div>
      </section>

      {/* アフィリエイト導線 */}
      <section className="bg-gray-950 py-12 px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-6">
            <div className="inline-block bg-blue-900 text-blue-300 text-xs font-bold px-3 py-1 rounded-full mb-3">SNS発信をもっと活用する</div>
            <h2 className="text-xl font-black text-white">投稿文ができたら、次のステップへ</h2>
            <p className="text-gray-400 text-sm mt-1">SNSの発信力をビジネスに変えるヒント</p>
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+8PRGKY+4V0U+BXB8Z"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block bg-white border-2 border-blue-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-blue-600" aria-hidden="true"><path d="M12 15.5A3.5 3.5 0 0 1 8.5 12 3.5 3.5 0 0 1 12 8.5a3.5 3.5 0 0 1 3.5 3.5 3.5 3.5 0 0 1-3.5 3.5m7.43-2.92c.04-.3.07-.61.07-.93 0-.32-.03-.63-.07-.93l2.01-1.58c.18-.14.23-.39.12-.59l-1.9-3.3c-.12-.21-.36-.28-.57-.21l-2.37.95c-.49-.38-1.02-.7-1.6-.94l-.36-2.52c-.04-.22-.23-.38-.45-.38h-3.8c-.22 0-.41.16-.45.38l-.36 2.52c-.58.24-1.11.56-1.6.94l-2.37-.95c-.21-.07-.45 0-.57.21L2.4 8.27c-.11.2-.06.45.12.59L4.53 10.44c-.04.3-.07.62-.07.93s.03.63.07.93L2.52 13.92c-.18.14-.23.39-.12.59l1.9 3.3c.12.21.36.28.57.21l2.37-.95c.49.38 1.02.7 1.6.94l.36 2.52c.04.22.23.38.45.38h3.8c.22 0 .41-.16.45-.38l.36-2.52c.58-.24 1.11-.56 1.6-.94l2.37.95c.21.07.45 0 .57-.21l1.9-3.3c.11-.2.06-.45-.12-.59l-2.01-1.56z"/></svg></div>
                <div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full mb-1">ハンドメイドチャンネル</div>
                  <h3 className="font-black text-gray-900 text-base mb-1 group-hover:text-blue-700 transition-colors">SNS発信を仕事にする</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">ハンドメイド作品のSNS発信方法や販売ノウハウを学べる動画チャンネル。投稿文を活用してフォロワーを収益に変えたい方に。</p>
                  <p className="text-blue-600 text-xs font-bold mt-2">詳しく見る →</p>
                </div>
              </div>
            </a>
            <a
              href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+8ZAE9E+2QQG+62MDD"
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="block bg-white border-2 border-blue-200 rounded-2xl p-5 hover:border-blue-400 hover:shadow-md transition-all group"
            >
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center shrink-0"><svg viewBox="0 0 24 24" className="w-5 h-5 fill-blue-600" aria-hidden="true"><path d="M19 6h-2c0-2.76-2.24-5-5-5S7 3.24 7 6H5c-1.1 0-1.99.9-1.99 2L3 20c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-7-3c1.66 0 3 1.34 3 3H9c0-1.66 1.34-3 3-3zm0 10c-1.66 0-3-1.34-3-3h2c0 .55.45 1 1 1s1-.45 1-1h2c0 1.66-1.34 3-3 3z"/></svg></div>
                <div>
                  <div className="inline-block bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full mb-1">BASE</div>
                  <h3 className="font-black text-gray-900 text-base mb-1 group-hover:text-blue-700 transition-colors">SNS × ネットショップで売上アップ</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">BASEはSNSとの連携が得意なネットショップ作成サービス。Instagramやポストから直接購入導線を作れる、SNS発信との相性が抜群。</p>
                  <p className="text-blue-600 text-xs font-bold mt-2">無料で始める →</p>
                </div>
              </div>
            </a>
          </div>
          <p className="text-xs text-gray-600 text-center mt-3">※ 広告リンクを含みます</p>
        </div>
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
      {showPayjp && (
        <PayjpModal
          publicKey={process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY!}
          planLabel="プレミアムプラン ¥980/月 — 投稿文生成 無制限"
          onSuccess={() => setShowPayjp(false)}
          onClose={() => setShowPayjp(false)}
        />
      )}
    </main>
  );
}
