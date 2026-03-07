"use client";

import { useState, useEffect } from "react";

const FREE_LIMIT = 3;

async function startCheckout() {
  const res = await fetch("/api/stripe/checkout", { method: "POST", headers: { "Content-Type": "application/json" } });
  const data = await res.json();
  if (data.url) window.location.href = data.url;
}

const PLATFORMS = [
  { id: "X", label: "X (Twitter)", icon: "𝕏" },
  { id: "Instagram", label: "Instagram", icon: "📸" },
  { id: "TikTok", label: "TikTok", icon: "♪" },
  { id: "note", label: "note", icon: "✏️" },
  { id: "YouTube Shorts", label: "YouTube Shorts", icon: "▶" },
];

const ANGLES = [
  { id: "ペイン訴求", label: "ペイン訴求", desc: "悩みに刺さる" },
  { id: "サービス紹介", label: "サービス紹介", desc: "機能・特徴を紹介" },
  { id: "無料お試しCTA", label: "無料CTA", desc: "今すぐ試して" },
  { id: "数字・実績", label: "数字・実績", desc: "具体的な数字で訴求" },
  { id: "ライフハック", label: "Tips", desc: "役立つ使い方" },
];

const EXAMPLE_SERVICES = [
  { name: "AIクレーム対応文", desc: "クレーム内容を入力するだけでプロ品質の対応文を自動生成。飲食・EC・小売業向け。無料3回試せる。¥4,980/月〜", target: "飲食・小売・EC担当者、店長" },
  { name: "AI補助金診断", desc: "事業内容を入力するだけで使える補助金を診断し申請書ドラフトまで生成。¥2,980/1申請", target: "中小企業経営者、個人事業主" },
  { name: "AI終活サポート", desc: "エンディングノート・相続・医療の意思表示をAIがアドバイス。印刷してご家族と共有。¥1,980/1回", target: "50〜70代、終活を考える方" },
];

export default function Home() {
  const [serviceName, setServiceName] = useState("");
  const [serviceDesc, setServiceDesc] = useState("");
  const [target, setTarget] = useState("");
  const [price, setPrice] = useState("");
  const [url, setUrl] = useState("");
  const [platform, setPlatform] = useState("X");
  const [angle, setAngle] = useState("ペイン訴求");
  const [count, setCount] = useState("3");
  const [posts, setPosts] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showExamples, setShowExamples] = useState(false);

  useEffect(() => {
    fetch("/api/auth/status").then(r => r.json()).then(d => setIsPremium(d.isPremium)).catch(() => {});
  }, []);

  const buildCustomDesc = () => {
    const parts = [];
    if (serviceName) parts.push(`サービス名: ${serviceName}`);
    if (serviceDesc) parts.push(`内容・特徴: ${serviceDesc}`);
    if (target) parts.push(`ターゲット: ${target}`);
    if (price) parts.push(`料金: ${price}`);
    if (url) parts.push(`URL: ${url}`);
    return parts.join("\n");
  };

  const handleGenerate = async () => {
    const customDesc = buildCustomDesc();
    if (!customDesc.trim()) return;
    setLoading(true);
    setPosts([]);
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId: "custom", customDesc, platform, angle, count }),
      });
      if (res.status === 402) { setShowPaywall(true); return; }
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

  const loadExample = (ex: typeof EXAMPLE_SERVICES[0]) => {
    setServiceName(ex.name);
    setServiceDesc(ex.desc);
    setTarget(ex.target);
    setShowExamples(false);
  };

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const canGenerate = serviceName.trim() || serviceDesc.trim();

  return (
    <main className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-2xl">📣</div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SNS投稿ジェネレーター</h1>
              <p className="text-xs text-gray-500">あなたの商品・サービスの宣伝投稿をAIが自動生成</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {!isPremium && remaining !== null && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${remaining === 0 ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                残り{remaining}回
              </span>
            )}
            {!isPremium && (
              <button onClick={() => setShowPaywall(true)}
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors">
                プレミアム ¥980/月
              </button>
            )}
            {isPremium && (
              <span className="text-xs bg-green-100 text-green-700 font-bold px-3 py-1.5 rounded-full">✓ プレミアム</span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
        <div className="space-y-5">

          {/* サービス情報 */}
          <div className="bg-white rounded-2xl border p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-700">1. あなたの商品・サービス</h2>
              <button onClick={() => setShowExamples(!showExamples)}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                記入例を見る
              </button>
            </div>

            {showExamples && (
              <div className="mb-4 space-y-2 bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium mb-2">クリックして入力欄に反映</p>
                {EXAMPLE_SERVICES.map((ex) => (
                  <button key={ex.name} onClick={() => loadExample(ex)}
                    className="w-full text-left text-xs bg-white rounded-lg p-2.5 border border-blue-100 hover:border-blue-300 transition-colors">
                    <div className="font-medium text-gray-700">{ex.name}</div>
                    <div className="text-gray-400 mt-0.5 line-clamp-1">{ex.target}</div>
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">サービス名・商品名 <span className="text-red-400">*</span></label>
                <input type="text" value={serviceName} onChange={e => setServiceName(e.target.value)}
                  placeholder="例: AI補助金診断、ハンドメイドアクセサリー"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">説明・特徴（多いほど質が上がる）</label>
                <textarea value={serviceDesc} onChange={e => setServiceDesc(e.target.value)} rows={3}
                  placeholder="例: 入力するだけで30秒で補助金診断。申請書ドラフトまで自動生成。無料3回試せる。"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">ターゲット</label>
                <input type="text" value={target} onChange={e => setTarget(e.target.value)}
                  placeholder="例: 中小企業の経営者、EC出品者"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">料金</label>
                  <input type="text" value={price} onChange={e => setPrice(e.target.value)}
                    placeholder="例: 無料3回→¥980/月"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">URL（任意）</label>
                  <input type="text" value={url} onChange={e => setUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
              </div>
            </div>
          </div>

          {/* プラットフォーム */}
          <div className="bg-white rounded-2xl border p-5">
            <h2 className="text-sm font-bold text-gray-700 mb-3">2. SNSプラットフォーム</h2>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((p) => (
                <button key={p.id} onClick={() => setPlatform(p.id)}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${platform === p.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                  <span>{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 投稿の角度 */}
          <div className="bg-white rounded-2xl border p-5">
            <h2 className="text-sm font-bold text-gray-700 mb-3">3. 投稿の切り口</h2>
            <div className="space-y-2">
              {ANGLES.map((a) => (
                <button key={a.id} onClick={() => setAngle(a.id)}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm transition-colors ${angle === a.id ? "border-blue-500 bg-blue-50 text-blue-700 font-medium" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
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
                <button key={n} onClick={() => setCount(n)}
                  className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-colors ${count === n ? "border-blue-500 bg-blue-500 text-white" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleGenerate}
            disabled={loading || !canGenerate}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold py-4 rounded-2xl text-base transition-colors">
            {loading ? "生成中..." : `投稿文を生成する${!isPremium && remaining !== null ? ` (残り${remaining}回)` : ""}`}
          </button>
          {!canGenerate && (
            <p className="text-xs text-center text-gray-400">サービス名を入力してください</p>
          )}
        </div>

        {/* 右パネル：結果 */}
        <div>
          {posts.length === 0 && !loading && (
            <div className="bg-white rounded-2xl border h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10 gap-4">
              <div className="text-5xl">📝</div>
              <div>
                <p className="text-gray-700 font-medium">サービス情報を入力して</p>
                <p className="text-gray-500 text-sm mt-1">「投稿文を生成する」を押してください</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-xs text-left space-y-1.5 w-full max-w-[280px]">
                <p className="font-semibold text-gray-600 mb-2">対応している投稿の切り口</p>
                <p className="text-gray-500">😤 ペイン訴求 — 悩みを刺激して共感を生む</p>
                <p className="text-gray-500">📢 サービス紹介 — 機能・使い方を分かりやすく</p>
                <p className="text-gray-500">🎁 無料CTA — 今すぐ試してもらう行動喚起</p>
                <p className="text-gray-500">📊 数字・実績 — 具体数字で信頼感を高める</p>
                <p className="text-gray-500">💡 Tips — 役立つ情報で拡散を狙う</p>
              </div>
              {!isPremium && (
                <p className="text-xs text-gray-400">無料{FREE_LIMIT}回 → プレミアムで無制限</p>
              )}
            </div>
          )}

          {loading && (
            <div className="bg-white rounded-2xl border h-full min-h-[400px] flex items-center justify-center">
              <div className="text-center">
                <div className="text-4xl mb-4 animate-pulse">✨</div>
                <p className="text-gray-500 text-sm">{platform}向け投稿文を生成中...</p>
              </div>
            </div>
          )}

          {posts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">{posts.length}パターン生成完了</span>
                <button
                  onClick={() => { navigator.clipboard.writeText(posts.join("\n\n---\n\n")); setCopiedIndex(-1); setTimeout(() => setCopiedIndex(null), 2000); }}
                  className="text-xs text-blue-600 font-medium border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                  {copiedIndex === -1 ? "コピーしました！" : "全てコピー"}
                </button>
              </div>

              {posts.map((post, i) => (
                <div key={i} className="bg-white rounded-2xl border hover:border-gray-300 transition-colors">
                  <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <span className="text-xs font-bold text-gray-400">パターン {i + 1}</span>
                    <button onClick={() => handleCopy(post, i)}
                      className="text-xs text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors">
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
              <div className="text-5xl mb-4">🚀</div>
              <h2 className="text-xl font-bold text-gray-900 mb-2">プレミアムで無制限生成</h2>
              <p className="text-gray-500 text-sm">
                毎日の投稿ネタ切れを解消。<br />
                サービス・商品・イベントの告知を秒で量産。
              </p>
            </div>
            <ul className="text-sm text-gray-600 space-y-2 mb-6">
              {[
                "投稿文を無制限生成",
                "X・Instagram・TikTok・note・YouTube Shorts対応",
                "ペイン訴求・実績・Tips など5つの切り口",
                "自分のサービスを自由に入力",
                "5パターン同時生成",
              ].map(f => (
                <li key={f} className="flex items-center gap-2"><span className="text-blue-500">✓</span>{f}</li>
              ))}
            </ul>
            <button onClick={() => startCheckout()}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors mb-3">
              プレミアムで解除する（¥980/月）
            </button>
            <button onClick={() => setShowPaywall(false)} className="w-full text-gray-400 hover:text-gray-600 text-sm py-2">閉じる</button>
          </div>
        </div>
      )}
    </main>
  );
}
