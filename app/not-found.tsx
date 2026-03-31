import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen bg-gray-950 flex flex-col items-center justify-center text-center px-4">
      <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
      <h1 className="text-2xl font-bold text-white mb-2">ページが見つかりません</h1>
      <p className="text-gray-400 mb-8">お探しのページは存在しないか、移動した可能性があります。</p>
      <Link href="/" className="bg-purple-600 px-6 py-3 rounded-full font-bold text-white">
        トップに戻る
      </Link>
    </main>
  );
}
