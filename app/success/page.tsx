'use client';

import Link from 'next/link';
import { Suspense } from 'react';

function SuccessContent() {
  return (
    <div className="bg-white rounded-2xl shadow-lg border p-10 max-w-md w-full text-center">
      <div className="text-6xl mb-6">🎉</div>
      <h1 className="text-2xl font-bold text-gray-800 mb-3">ご購入ありがとうございます！</h1>
      <p className="text-gray-500 mb-8">
        決済が完了しました。<br />
        無制限でSNS投稿文を生成できます！
      </p>
      <Link
        href="/tool"
        className="block bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-xl transition-colors"
      >
        投稿文を生成する
      </Link>
    </div>
  );
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <Suspense fallback={<div className="text-gray-400">読み込み中...</div>}>
        <SuccessContent />
      </Suspense>
    </div>
  );
}
