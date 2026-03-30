import Link from "next/link";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen relative" style={{ background: "linear-gradient(135deg, #0f0b15 0%, #1a1333 25%, #0d1f2d 50%, #1a1333 75%, #0f0b15 100%)" }}>
      <div className="fixed inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute top-0 left-1/4 w-96 h-96 rounded-full opacity-[0.07]" style={{ background: "radial-gradient(circle, #6366f1, transparent 70%)" }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-[0.05]" style={{ background: "radial-gradient(circle, #8b5cf6, transparent 70%)" }} />
      </div>

      <header className="relative z-10 border-b border-white/5 px-6 py-4">
        <Link href="/" className="font-bold text-white/80 hover:text-white transition-colors flex items-center gap-2">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="#818cf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          SNS投稿ジェネレーター
        </Link>
      </header>

      <div className="relative z-10 max-w-2xl mx-auto px-6 py-12">
        <h1 className="text-2xl font-bold mb-8 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">プライバシーポリシー</h1>

        <div className="rounded-2xl p-6 sm:p-8 space-y-6 text-sm text-slate-300 leading-relaxed" style={{ background: "rgba(255,255,255,0.06)", backdropFilter: "blur(12px)", border: "1px solid rgba(255,255,255,0.08)" }}>
          <section className="border-b border-white/5 pb-6">
            <h2 className="font-bold text-base mb-2 text-slate-100">1. 収集する情報</h2>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>決済時にPAY.JP（PAY.JP株式会社）が収集する支払情報（当社はカード番号を保持しません）</li>
              <li>ブラウザのCookieおよびlocalStorage（利用回数の管理）</li>
              <li>アクセスログ（IPアドレス・ブラウザ種別・閲覧ページ）</li>
            </ul>
          </section>

          <section className="border-b border-white/5 pb-6">
            <h2 className="font-bold text-base mb-2 text-slate-100">2. 利用目的</h2>
            <ul className="list-disc list-inside space-y-1 text-slate-400">
              <li>サービスの提供・運営・改善</li>
              <li>不正利用の検知と防止</li>
            </ul>
          </section>

          <section className="border-b border-white/5 pb-6">
            <h2 className="font-bold text-base mb-2 text-slate-100">3. 第三者提供</h2>
            <p className="text-slate-400">法令に基づく場合および決済処理のためPAY.JP（PAY.JP株式会社）に提供する場合（PAY.JP（https://pay.jp）のプライバシーポリシーに従います）を除き、第三者への提供は行いません。</p>
          </section>

          <section>
            <h2 className="font-bold text-base mb-2 text-slate-100">4. お問い合わせ</h2>
            <p className="text-slate-400">X(Twitter) @levona_design へのDM</p>
          </section>
        </div>

        <p className="text-slate-600 text-xs pt-6">制定日：2025年1月1日</p>
      </div>
    </main>
  );
}
