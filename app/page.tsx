"use client";

import { useState, useEffect } from "react";

const FREE_LIMIT = 3;

async function startCheckout() {
  const res = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" } });
  const data = await res.json();
  if (data.url) window.location.href = data.url;
}

const PRESET_APPS = [
  { id: "claim-ai", name: "AIクレーム対応文ジェネレーター", emoji: "💼" },
  { id: "ec-description-generator", name: "AI商品説明文ジェネレーター", emoji: "🛒" },
  { id: "hojyokin-ai", name: "AI補助金診断", emoji: "💰" },
  { id: "shukatsu-ai", name: "AI終活サポート", emoji: "🌸" },
  { id: "uranai-ai", name: "AI占い", emoji: "🔮" },
  { id: "custom", name: "自分のサービスを入力", emoji: "✏️" },
];

const PLATFORMS = [
  { id: "X", label: "X (Twitter)", icon: "𝕏" },
  { id: "TikTok", label: "TikTok", icon: "♪" },
  { id: "Instagram", label: "Instagram", icon: "📸" },
  { id: "note", label: "note", icon: "✏️" },
  { id: "YouTube Shorts", label: "YouTube Shorts", icon: "▶" },
];

const ANGLES = [
  { id: "サービス紹介", label: "サービス紹介", desc: "機能・特徴を紹介" },
  { id: "ペイン訴求", label: "ペイン訴求", desc: "悩みに刺さる" },
  { id: "無料お試しCTA", label: "無料お試しCTA", desc: "今すぐ試して" },
  { id: "数字・実績", label: "数字・実績", desc: "具体的な数字で訴求" },
  { id: "ライフハック", label: "ライフハック", desc: "Tips・使い方" },
];

export default function Home() {
  const [appId, setAppId] = useState("claim-ai");
  const [customDesc, setCustomDesc] = useState("");
  const [platform, setPlatform] = useState("X");
  const [angle, setAngle] = useState("サービス紹介");
  const [count, setCount] = useState("3");
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  useEffect(() => {
    fetch("/api/auth/status").then(r => r.json()).then(d => setIsPremium(d.isPremium)).catch(() => {});
  }, []);

  const handleGenerate = async () => {
    setLoading(true);
    setPosts([]);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId, customDesc: appId === "custom" ? customDesc : undefined, platform, angle, count }),
      });
      if (res.status === 402) {
        setShowPaywall(true);
        return;
      }
      const data = await res.json();
      setPosts(data.posts ?? []);
      if (data.remaining !== undefined) setRemaining(data.remaining);
      if (data.remaining === 0) setTimeout(() => setShowPaywall(true), 1500);
    } catch {
      setPosts(["エラーが発生しました。もう一度お試しください。"]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const selectedPlatform = PLATFORMS.find((p) => p.id === platform);

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📣</div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SNS投稿ジェネレーター</h1>
              <p className="text-xs text-gray-500">サービスの宣伝投稿をAIが自動生成</p>
            </div>
          </div>
          {!isPremium && (
            <div className="flex items-center gap-3">
              {remaining !== null && (
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${remaining === 0 ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                  残り{remaining}回
                </span>
              )}
              <button
                onClick={() => setShowPaywall(true)}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors"
              >
                プレミアム ¥980/月
              </button>
            </div>
          )}
          {isPremium && (
            <span className="text-xs bg-green-100 text-green-700 font-bold px-3 py-1.5 rounded-full">✓ プレミアム</span>
          )}
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8">
        <div className="space-y-6">

          {/* サービス選択 */}
          <div className="bg-white rounded-2xl border p-5">
            <h2 className="text-sm font-bold text-gray-700 mb-3">1. 宣伝するサービス</h2>
            <div className="space-y-2">
              {PRESET_APPS.map((app) => (
                <button
                  key={app.id}
                  onClick={() => setAppId(app.id)}
                  className={`w-full text-left flex items-center gap-3 px-3 py-2.5 rounded-xl border text-sm transition-colors ${
                    appId === app.id
                      ? "border-blue-500 bg-blue-50 text-blue-700 font-medium"
                      : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <span className="text-lg">{app.emoji}</span>
                  <span className="leading-tight">{app.name}</span>
                </button>
              ))}
            </div>
            {appId === "custom" && (
              <textarea
                className="mt-3 w-full h-28 p-3 rounded-xl border border-gray-300 text-sm resize-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                placeholder="サービス名・特徴・ターゲット・URL・料金などを入力してください"
                value={customDesc}
                onChange={(e) => setCustomDesc(e.target.value)}
              />
            )}
          </div>

          {/* プラットフォーム */}
          <div className="bg-white rounded-2xl border p-5">
            <h2 className="text-sm font-bold text-gray-700 mb-3">2. SNSプラットフォーム</h2>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((p) => (
                <button
                  key={p.id}
                  onClick={() => setPlatform(p.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${
                    platform === p.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 投稿の角度 */}
          <div className="bg-white rounded-2xl border p-5">
            <h2 className="text-sm font-bold text-gray-700 mb-3">3. 投稿の角度</h2>
            <div className="space-y-2">
              {ANGLES.map((a) => (
                <button
                  key={a.id}
                  onClick={() => setAngle(a.id)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm transition-colors ${
                    angle === a.id ? "border-blue-500 bg-blue-50 text-blue-700 font-medium" : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  <span>{a.label}</span>
                  <span className={`text-xs ${angle === a.id ? "text-blue-500" : "text-gray-400"}`}>{a.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 生成数 */}
          <div className="bg-white rounded-2xl border p-5">
            <h2 className="text-sm font-bold text-gray-700 mb-3">4. 生成パターン数</h2>
            <div className="flex gap-2">
              {["1", "2", "3", "4", "5"].map((n) => (
                <button
                  key={n}
                  onClick={() => setCount(n)}
                  className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-colors ${
                    count === n ? "border-blue-500 bg-blue-500 text-white" : "border-gray-200 hover:border-gray-300 text-gray-700"
                  }`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={handleGenerate}
            disabled={loading || (appId === "custom" && !customDesc.trim())}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-4 rounded-2xl text-base transition-colors"
          >
            {loading ? "生成中..." : `投稿文を生成する${!isPremium && remaining !== null ? ` (残り${remaining}回)` : ""}`}
          </button>
        </div>

        {/* 右パネル：結果 */}
        <div>
          {posts.length === 0 && !loading && (
            <div className="bg-white rounded-2xl border h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10">
              <div className="text-5xl mb-4">📝</div>
              <p className="text-gray-500 text-sm">
                左のパネルで設定して<br />「投稿文を生成する」を押してください
              </p>
              {!isPremium && (
                <p className="mt-4 text-xs text-gray-400">無料{FREE_LIMIT}回 → プレミアムで無制限</p>
              )}
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-2xl border h-full min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4 animate-pulse">✨</div>
                <p className="text-gray-500 text-sm">{selectedPlatform?.label} 投稿文を生成中...</p>
              </div>
            </div>
          )}

          {posts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">{posts.length}パターン生成完了</span>
                <button
                  onClick={() => { navigator.clipboard.writeText(posts.join("\n\n---\n\n")); setCopiedIndex(-1); setTimeout(() => setCopiedIndex(null), 2000); }}
                  className="text-xs text-blue-600 font-medium border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors"
                >
                  {copiedIndex === -1 ? "コピーしました！" : "全てコピー"}
                </button>
              </div>

              {posts.map((post, i) => (
                <div key={i} className="bg-white rounded-2xl border hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <span className="text-xs font-bold text-gray-400">パターン {i + 1}</span>
                    <button
                      onClick={() => handleCopy(post, i)}
                      className="text-xs text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors"
                    >
                      {copiedIndex === i ? "コピーしました！" : "コピー"}
                    </button>
                  </div>
                  <div className="px-4 pb-4">
                    <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{post}</pre>
                    {platform === "X" && (
                      <p className={`text-xs mt-3 text-right font-mono ${post.length > 140 ? "text-red-500" : "text-gray-400"}`}>
                        {post.length} / 140字
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <button onClick={handleGenerate} className="text-sm text-blue-600 hover:text-blue-700 font-medium">再生成する</button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ペイウォールモーダル */}
      {showPaywall && (
        <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" onClick={() => setShowPaywall(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="text-center mb-6">
              <div className="text-5xl mb-4">🔓</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">プレミアムプランで無制限に</h2>
              <p className="text-gray-500 text-sm">
                無料プランは{FREE_LIMIT}回まで。<br />
                プレミアムで全SNS・全角度を無制限生成できます。
              </p>
            </div>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              {["無制限生成", "自分のサービスを自由に入力", "5プラットフォーム対応", "5つの投稿角度"].map(f => (
                <li key={f} className="flex items-center gap-2"><span className="text-blue-500">✓</span>{f}</li>
              ))}
            </ul>
            <button
              onClick={() => startCheckout()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors mb-3"
            >
              プレミアムで解除する（¥980/月）
            </button>
            <button onClick={() => setShowPaywall(false)} className="w-full text-gray-400 hover:text-gray-600 text-sm py-2">閉じる</button>
          </div>
        </div>
      )}
    </main>
  );
}
