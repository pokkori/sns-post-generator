"use client";
import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center px-4">
      <svg className="w-16 h-16 text-yellow-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <h1 className="text-2xl font-bold text-white mb-2">エラーが発生しました</h1>
      <p className="text-gray-400 mb-8">しばらく時間をおいてから再度お試しください。</p>
      <div className="flex gap-4">
        <button onClick={reset} className="bg-purple-600 px-6 py-3 rounded-full font-bold text-white">
          再試行
        </button>
        <Link href="/" className="bg-gray-600 px-6 py-3 rounded-full font-bold text-white">
          トップに戻る
        </Link>
      </div>
    </main>
  );
}
