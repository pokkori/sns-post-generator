"use client";

import { useState, useEffect } from "react";
import PayjpModal from "@/components/PayjpModal";
import KomojuButton from "@/components/KomojuButton";
import { updateStreak, loadStreak, getStreakMilestoneMessage, type StreakData } from "@/lib/streak";
import { useTypewriter } from "@/lib/useTypewriter";
import ConfettiLaunch from "@/components/ConfettiLaunch";
import { useFreemiumLimit } from "@/hooks/useFreemiumLimit";

function PostContent({ post }: { post: string }) {
  const displayed = useTypewriter(post, 15);
  return <pre className="text-sm text-gray-800 whitespace-pre-wrap font-sans leading-relaxed">{displayed}</pre>;
}

const SNS_HISTORY_KEY = "sns_history";
const HISTORY_MAX = 5;
const SNS_FREEMIUM_KEY = "sns_free_count";
const SNS_FREE_MAX = 5;

interface HistoryItem {
  platform: string;
  text: string;
  date: string;
}

function loadHistory(): HistoryItem[] {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem(SNS_HISTORY_KEY) ?? "[]");
  } catch {
    return [];
  }
}

function saveHistory(items: HistoryItem[]): void {
  try {
    localStorage.setItem(SNS_HISTORY_KEY, JSON.stringify(items.slice(0, HISTORY_MAX)));
  } catch { /* noop */ }
}

const FREE_LIMIT = 3;

// 今日のお題 - 曜日ローテーション（毎日変わるリピート誘因）
const DAILY_TOPICS = [
  { day: 0, topic: "今週試したこと・気づいたこと", hint: "リアルな体験談は読まれやすい" },
  { day: 1, topic: "お客様に感謝されたエピソード", hint: "信頼感を高める実績紹介" },
  { day: 2, topic: "あなたのサービスが解決する1つの悩み", hint: "共感を呼ぶペイン訴求" },
  { day: 3, topic: "業界の意外な豆知識", hint: "シェアされやすい情報系" },
  { day: 4, topic: "失敗から学んだこと", hint: "正直さが共感を生む" },
  { day: 5, topic: "今週のおすすめツール・サービス", hint: "有益情報で信頼構築" },
  { day: 6, topic: "来週やること・目標宣言", hint: "コミュニティ感を演出" },
];
function getDailyTopic() {
  return DAILY_TOPICS[new Date().getDay()];
}

const PLATFORMS = [
  { id: "X", label: "X (Twitter)", icon: "X" },
  { id: "Instagram", label: "Instagram", icon: "IG" },
  { id: "TikTok", label: "TikTok", icon: "TT" },
  { id: "note", label: "note", icon: "note" },
  { id: "YouTube Shorts", label: "YouTube Shorts", icon: "YT" },
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
  const [streamingText, setStreamingText] = useState("");
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const [remaining, setRemaining] = useState<number | null>(null);
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);
  const [showPayjp, setShowPayjp] = useState(false);
  const [showExamples, setShowExamples] = useState(false);
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState(false);
  const [streak, setStreak] = useState<StreakData | null>(null);
  const [milestoneMsg, setMilestoneMsg] = useState<string | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const {
    isLimitReached: localLimitReached,
    remainingCount: localRemaining,
    incrementUsage: incrementLocalUsage,
    mounted: freemiumMounted,
  } = useFreemiumLimit(SNS_FREEMIUM_KEY, SNS_FREE_MAX);

  useEffect(() => {
    fetch("/api/auth/status").then(r => r.json()).then(d => setIsPremium(d.isPremium)).catch(() => {});
    setHistory(loadHistory());
    setStreak(loadStreak("sns_post"));
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

    // localStorageベースのフリーミアム制限チェック（isPremiumならスキップ）
    if (!isPremium && localLimitReached) {
      setShowPaywall(true);
      return;
    }

    setLoading(true);
    setPosts([]);
    setStreamingText("");
    try {
      const res = await fetch("/api/generate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ appId: "custom", customDesc, platform, angle, count }),
      });
      if (res.status === 402) { setShowPaywall(true); return; }
      if (!res.body) throw new Error("No response body");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value, { stream: true });
        buffer += chunk;
        setStreamingText(buffer);
        const doneIdx = buffer.lastIndexOf("\nDONE:");
        if (doneIdx !== -1) {
          const jsonStr = buffer.slice(doneIdx + 6);
          try {
            const parsed = JSON.parse(jsonStr);
            const newPosts: string[] = parsed.posts ?? [];
            setPosts(newPosts);
            if (parsed.remaining !== null && parsed.remaining !== undefined) setRemaining(parsed.remaining);
            // 生成成功時にlocalStorage使用回数を増やす
            if (!isPremium && newPosts.length > 0) {
              incrementLocalUsage();
            }
            if (parsed.remaining === 0) setTimeout(() => setShowPaywall(true), 1500);
            // 履歴保存
            if (newPosts.length > 0) {
              setShowConfetti(true);
              setTimeout(() => setShowConfetti(false), 4000);
              const firstPost = newPosts[0];
              const newItem: HistoryItem = {
                platform,
                text: firstPost.slice(0, 50),
                date: new Date().toLocaleString("ja-JP", { month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }),
              };
              const prev = loadHistory();
              const updated = [newItem, ...prev.filter(h => h.text !== newItem.text)].slice(0, HISTORY_MAX);
              saveHistory(updated);
              setHistory(updated);
            }
            // ストリーク更新
            const updatedStreak = updateStreak("sns_post");
            setStreak(updatedStreak);
            const msg = getStreakMilestoneMessage(updatedStreak.count);
            if (msg) { setMilestoneMsg(msg); setTimeout(() => setMilestoneMsg(null), 3000); }
          } catch { /* ignore parse error */ }
          setStreamingText("");
          break;
        }
      }
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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50/30 to-gray-50">
      <ConfettiLaunch trigger={showConfetti} message="投稿文完成！" />
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white" aria-hidden="true">
                <path d="M18 11.5C18 9.57 16.43 8 14.5 8h-9C3.57 8 2 9.57 2 11.5S3.57 15 5.5 15H6v3l3-3h5.5c1.93 0 3.5-1.57 3.5-3.5zM20.5 4H17v2h3.5c.83 0 1.5.67 1.5 1.5v11c0 .83-.67 1.5-1.5 1.5H17v2h3.5c1.93 0 3.5-1.57 3.5-3.5v-11C24 5.57 22.43 4 20.5 4z"/>
              </svg>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">SNS投稿ジェネレーター</h1>
              <p className="text-xs text-gray-500">あなたの商品・サービスの宣伝投稿をAIが自動生成</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {streak && streak.count > 0 && (
              <span className="text-xs font-bold px-2 py-1 rounded-full bg-orange-100 text-orange-600" aria-label={`${streak.count}日連続利用中`}>
                {streak.count}日連続
              </span>
            )}
            {!isPremium && freemiumMounted && (
              <span className={`text-xs font-medium px-2 py-1 rounded-full ${localLimitReached ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-600"}`}>
                残り{localRemaining}回無料
              </span>
            )}
            {!isPremium && (
              <button onClick={() => setShowPaywall(true)}
                aria-label="プレミアムプランに申し込む（月額980円）"
                className="text-xs bg-blue-600 hover:bg-blue-700 text-white font-bold px-3 py-1.5 rounded-lg transition-colors">
                プレミアム ¥980/月
              </button>
            )}
            {isPremium && (
              <span className="text-xs bg-green-100 text-green-700 font-bold px-3 py-1.5 rounded-full">プレミアム</span>
            )}
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-6 py-8 grid grid-cols-1 lg:grid-cols-[420px_1fr] gap-8">
        <div className="space-y-5">

          {/* サービス情報 */}
          <div className="backdrop-blur-sm bg-white/80 border border-white/40 shadow-lg rounded-2xl p-5">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-bold text-gray-700">1. あなたの商品・サービス</h2>
              <button onClick={() => setShowExamples(!showExamples)}
                aria-label={showExamples ? "記入例を閉じる" : "記入例を見る"}
                aria-expanded={showExamples}
                className="text-xs text-blue-600 hover:text-blue-800 font-medium">
                記入例を見る
              </button>
            </div>

            {showExamples && (
              <div className="mb-4 space-y-2 bg-blue-50 rounded-xl p-3">
                <p className="text-xs text-blue-600 font-medium mb-2">クリックして入力欄に反映</p>
                {EXAMPLE_SERVICES.map((ex) => (
                  <button key={ex.name} onClick={() => loadExample(ex)}
                    aria-label={`記入例「${ex.name}」を入力欄に反映する`}
                    className="w-full text-left text-xs bg-white rounded-lg p-2.5 border border-blue-100 hover:border-blue-300 transition-colors">
                    <div className="font-medium text-gray-700">{ex.name}</div>
                    <div className="text-gray-400 mt-0.5 line-clamp-1">{ex.target}</div>
                  </button>
                ))}
              </div>
            )}

            {/* 今日のお題バナー */}
            {(() => {
              const dt = getDailyTopic();
              return (
                <div className="mb-4 rounded-xl bg-purple-50 border border-purple-200 p-3 flex items-start gap-3">
                  <div className="shrink-0 w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center">
                    <svg className="w-4 h-4 text-purple-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/></svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-bold text-purple-600 mb-0.5">今日のお題</p>
                    <p className="text-sm font-semibold text-purple-900">{dt.topic}</p>
                    <p className="text-xs text-purple-500 mt-0.5">{dt.hint}</p>
                  </div>
                  <button
                    onClick={() => setServiceName(dt.topic)}
                    className="shrink-0 text-xs bg-purple-600 text-white px-3 py-1.5 rounded-lg font-bold hover:bg-purple-700 transition-colors">
                    使う
                  </button>
                </div>
              );
            })()}

            <div className="space-y-3">
              <div>
                <label className="block text-xs text-gray-500 mb-1">サービス名・商品名 <span className="text-red-400">*</span></label>
                <input type="text" value={serviceName} onChange={e => setServiceName(e.target.value)}
                  placeholder="例: AI補助金診断、ハンドメイドアクセサリー"
                  aria-label="サービス名・商品名（必須）"
                  aria-required="true"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">説明・特徴（多いほど質が上がる）</label>
                <textarea value={serviceDesc} onChange={e => setServiceDesc(e.target.value)} rows={3}
                  placeholder="例: 入力するだけで30秒で補助金診断。申請書ドラフトまで自動生成。無料3回試せる。"
                  aria-label="サービス・商品の説明と特徴"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1">ターゲット</label>
                <input type="text" value={target} onChange={e => setTarget(e.target.value)}
                  placeholder="例: 中小企業の経営者、EC出品者"
                  aria-label="ターゲット顧客"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs text-gray-500 mb-1">料金</label>
                  <input type="text" value={price} onChange={e => setPrice(e.target.value)}
                    placeholder="例: 無料3回→¥980/月"
                    aria-label="料金・価格"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
                <div>
                  <label className="block text-xs text-gray-500 mb-1">URL（任意）</label>
                  <input type="text" value={url} onChange={e => setUrl(e.target.value)}
                    placeholder="https://..."
                    aria-label="サービス・商品のURL（任意）"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400" />
                </div>
              </div>
            </div>
          </div>

          {/* プラットフォーム */}
          <div className="backdrop-blur-sm bg-white/80 border border-white/40 shadow-lg rounded-2xl p-5">
            <h2 className="text-sm font-bold text-gray-700 mb-3">2. SNSプラットフォーム</h2>
            <div className="grid grid-cols-2 gap-2">
              {PLATFORMS.map((p) => (
                <button key={p.id} onClick={() => setPlatform(p.id)}
                  aria-label={`${p.label}向けに投稿文を生成する`}
                  aria-pressed={platform === p.id}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border text-sm font-medium transition-all ${platform === p.id ? "border-blue-500 bg-blue-50 text-blue-700" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                  <span aria-hidden="true">{p.icon}</span>
                  <span>{p.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 投稿の角度 */}
          <div className="backdrop-blur-sm bg-white/80 border border-white/40 shadow-lg rounded-2xl p-5">
            <h2 className="text-sm font-bold text-gray-700 mb-3">3. 投稿の切り口</h2>
            <div className="space-y-2">
              {ANGLES.map((a) => (
                <button key={a.id} onClick={() => setAngle(a.id)}
                  aria-label={`切り口「${a.label}」（${a.desc}）を選択する`}
                  aria-pressed={angle === a.id}
                  className={`w-full text-left flex items-center justify-between px-3 py-2.5 rounded-xl border text-sm transition-colors ${angle === a.id ? "border-blue-500 bg-blue-50 text-blue-700 font-medium" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                  <span>{a.label}</span>
                  <span className={`text-xs ${angle === a.id ? "text-blue-500" : "text-gray-400"}`}>{a.desc}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 生成数 */}
          <div className="backdrop-blur-sm bg-white/80 border border-white/40 shadow-lg rounded-2xl p-5">
            <h2 className="text-sm font-bold text-gray-700 mb-3">4. 生成パターン数</h2>
            <div className="flex gap-2">
              {["1", "2", "3", "4", "5"].map((n) => (
                <button key={n} onClick={() => setCount(n)}
                  aria-label={`生成パターン数を${n}に設定する`}
                  aria-pressed={count === n}
                  className={`flex-1 py-2 rounded-xl border text-sm font-bold transition-colors ${count === n ? "border-blue-500 bg-blue-500 text-white" : "border-gray-200 hover:border-gray-300 text-gray-700"}`}>
                  {n}
                </button>
              ))}
            </div>
          </div>

          <button onClick={handleGenerate}
            disabled={loading || !canGenerate}
            aria-label={loading ? "投稿文を生成中です" : localLimitReached && !isPremium ? "プレミアムプランに申し込む" : "投稿文を生成する"}
            aria-busy={loading}
            className={`w-full text-white font-bold py-4 rounded-2xl text-base transition-colors ${localLimitReached && !isPremium ? "bg-orange-500 hover:bg-orange-600 disabled:bg-orange-300" : "bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300"}`}>
            {loading
              ? "生成中..."
              : localLimitReached && !isPremium
              ? "プレミアムで続けて生成する"
              : `投稿文を生成する${!isPremium && freemiumMounted ? ` (残り${localRemaining}回無料)` : ""}`}
          </button>
          {!canGenerate && (
            <p className="text-xs text-center text-gray-400">サービス名を入力してください</p>
          )}

          {/* 生成履歴パネル */}
          {history.length > 0 && (
            <div className="backdrop-blur-sm bg-white/80 border border-white/40 shadow-lg rounded-2xl p-4">
              <button
                onClick={() => setShowHistory(!showHistory)}
                aria-label={showHistory ? "生成履歴を閉じる" : "生成履歴を表示する"}
                aria-expanded={showHistory}
                className="w-full flex items-center justify-between text-sm font-bold text-gray-700 mb-0"
              >
                <span>生成履歴（最近{history.length}件）</span>
                <span className="text-gray-400 text-xs">{showHistory ? "閉じる" : "開く"}</span>
              </button>
              {showHistory && (
                <ul className="mt-3 space-y-2">
                  {history.map((item, i) => (
                    <li key={i} className="bg-gray-50 rounded-xl p-2.5 text-xs">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className="font-bold text-blue-600">{item.platform}</span>
                        <span className="text-gray-400">{item.date}</span>
                      </div>
                      <p className="text-gray-600 line-clamp-1">{item.text}…</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          )}
        </div>

        {/* 右パネル：結果 */}
        <div>
          {posts.length === 0 && !loading && (
            <div className="backdrop-blur-sm bg-white/80 border border-white/40 shadow-lg rounded-2xl h-full min-h-[400px] flex flex-col items-center justify-center text-center p-10 gap-4">
              <svg className="w-12 h-12 text-gray-400 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              <div>
                <p className="text-gray-700 font-medium">サービス情報を入力して</p>
                <p className="text-gray-500 text-sm mt-1">「投稿文を生成する」を押してください</p>
              </div>
              <div className="bg-gray-50 rounded-xl p-4 text-xs text-left space-y-1.5 w-full max-w-[280px]">
                <p className="font-semibold text-gray-600 mb-2">対応している投稿の切り口</p>
                <p className="text-gray-500">ペイン訴求 — 悩みを刺激して共感を生む</p>
                <p className="text-gray-500">サービス紹介 — 機能・使い方を分かりやすく</p>
                <p className="text-gray-500">無料CTA — 今すぐ試してもらう行動喚起</p>
                <p className="text-gray-500">数字・実績 — 具体数字で信頼感を高める</p>
                <p className="text-gray-500">Tips — 役立つ情報で拡散を狙う</p>
              </div>
              {!isPremium && (
                <p className="text-xs text-gray-400">無料{SNS_FREE_MAX}回 → プレミアムで無制限</p>
              )}
            </div>
          )}

          {loading && (
            <div className="backdrop-blur-sm bg-white/80 border border-white/40 shadow-lg rounded-2xl h-full min-h-[400px] flex flex-col">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-gray-100">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500" aria-hidden="true" />
                <span className="text-sm font-medium text-blue-600" aria-live="polite" aria-atomic="true">{platform}向け投稿文を生成中...</span>
              </div>
              {streamingText ? (
                <div className="flex-1 p-4 overflow-y-auto">
                  <pre className="text-xs text-gray-600 whitespace-pre-wrap font-sans leading-relaxed">{streamingText.replace(/\nDONE:.*$/, "").slice(-600)}</pre>
                </div>
              ) : (
                <div className="flex-1 p-4 space-y-3">
                  <div className="skeleton h-4 w-3/4" />
                  <div className="skeleton h-4 w-full" />
                  <div className="skeleton h-4 w-5/6" />
                  <div className="skeleton h-4 w-2/3" />
                  <div className="skeleton h-4 w-full" />
                  <p className="text-gray-400 text-xs mt-2">AIが投稿文を考えています...</p>
                </div>
              )}
            </div>
          )}

          {posts.length > 0 && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-bold text-gray-700">{posts.length}パターン生成完了</span>
                <button
                  onClick={() => { navigator.clipboard.writeText(posts.join("\n\n---\n\n")); setCopiedIndex(-1); setTimeout(() => setCopiedIndex(null), 2000); }}
                  aria-label="生成された全ての投稿文をクリップボードにコピーする"
                  className="text-xs text-blue-600 font-medium border border-blue-200 px-3 py-1.5 rounded-lg hover:bg-blue-50 transition-colors">
                  {copiedIndex === -1 ? "コピーしました！" : "全てコピー"}
                </button>
              </div>

              {posts.map((post, i) => (
                <div key={i} className="backdrop-blur-sm bg-white/80 border border-white/40 shadow-lg rounded-2xl hover:border-white/60 transition-colors">
                  <div className="flex items-center justify-between px-4 pt-4 pb-2">
                    <span className="text-xs font-bold text-gray-400">パターン {i + 1}</span>
                    <button onClick={() => handleCopy(post, i)}
                      aria-label={`パターン${i + 1}の投稿文をクリップボードにコピーする`}
                      className="text-xs text-blue-600 font-medium bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded-lg transition-colors">
                      {copiedIndex === i ? "コピーしました！" : "コピー"}
                    </button>
                  </div>
                  <div className="px-4 pb-4">
                    <PostContent post={post} />
                    {platform === "X" && (
                      <p className={`text-xs mt-3 text-right font-mono ${post.length > 140 ? "text-red-500" : "text-gray-400"}`}>
                        {post.length} / 140字
                      </p>
                    )}
                  </div>
                </div>
              ))}
              <div className="text-center pt-2 flex flex-col sm:flex-row gap-3 justify-center items-center">
                <button onClick={handleGenerate} aria-label="投稿文を再生成する" className="text-sm text-blue-600 hover:text-blue-700 font-medium">再生成する</button>
                {posts.length > 0 && (
                  <a
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(posts[0] ?? '')}&hashtags=SNS投稿AI`}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="生成された投稿文をXでシェアする"
                    className="inline-flex items-center gap-1.5 bg-black hover:bg-gray-800 text-white font-bold py-2 px-4 rounded-lg text-xs transition-colors"
                  >
                    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    Xにそのまま投稿
                  </a>
                )}
              </div>

              {/* 次のアクション：BASEアフィリエイト */}
              <div className="bg-orange-50 border border-orange-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-orange-800 mb-3">SNSで集客したら、次はネットショップ開業</p>
                <a
                  href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+8ZAE9E+2QQG+62MDD"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-between bg-white border border-orange-300 rounded-xl px-4 py-3 hover:bg-orange-50 transition-colors"
                >
                  <div>
                    <div className="text-sm font-bold text-gray-800">BASE（ベイス）で無料開業</div>
                    <div className="text-xs text-gray-500">初期費用・月額0円 • 最短5分でショップ開設 • 35万店以上が利用</div>
                  </div>
                  <span className="text-orange-600 font-bold text-xs bg-orange-100 border border-orange-200 px-2 py-1 rounded-full shrink-0">無料で始める →</span>
                </a>
                <p className="text-xs text-gray-400 text-center mt-2">※ 広告・PR掲載</p>
              </div>

              {/* ハンドメイドチャンネル アフィリエイト */}
              <div className="bg-teal-50 border border-teal-200 rounded-2xl p-4">
                <p className="text-sm font-bold text-teal-800 mb-3">SNS副業をもっと本格的に</p>
                <a
                  href="https://px.a8.net/svt/ejp?a8mat=4AZIOF+8PRGKY+4V0U+BXB8Z"
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  className="flex items-center justify-between bg-white border border-teal-300 rounded-xl px-4 py-3 hover:bg-teal-50 transition-colors"
                >
                  <div>
                    <div className="text-sm font-bold text-gray-800">ハンドメイドチャンネル — 副業・在宅ワーク</div>
                    <div className="text-xs text-gray-500">¥5,000〜¥15,000 報酬 • SNS発信を収益化するスキルを学ぶ</div>
                  </div>
                  <span className="text-teal-600 font-bold text-xs bg-teal-100 border border-teal-200 px-2 py-1 rounded-full shrink-0">詳細を見る →</span>
                </a>
                <p className="text-xs text-gray-400 text-center mt-2">※ 広告・PR掲載</p>
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
              <svg className="w-12 h-12 text-blue-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-900 mb-2">
                {localLimitReached ? `無料${SNS_FREE_MAX}回を使い切りました` : "プレミアムで無制限生成"}
              </h2>
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
                <li key={f} className="flex items-center gap-2"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500 shrink-0" aria-hidden="true"><polyline points="20 6 9 17 4 12"/></svg>{f}</li>
              ))}
            </ul>
            <KomojuButton planId="standard" planLabel="プレミアムで解除する（¥980/月）" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-colors mb-3" />
            <button onClick={() => setShowPayjp(true)}
              aria-label="クレジットカードでプレミアムプランに申し込む（PAY.JP）"
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-xl transition-colors mb-3 text-sm">
              クレジットカードで支払う（PAY.JP）
            </button>
            <button onClick={() => setShowPaywall(false)} aria-label="プレミアムプランのモーダルを閉じる" className="w-full text-gray-400 hover:text-gray-600 text-sm py-2">閉じる</button>
          </div>
        </div>
      )}
      {showPayjp && (
        <PayjpModal
          publicKey={process.env.NEXT_PUBLIC_PAYJP_PUBLIC_KEY!}
          planLabel="プレミアムプラン ¥980/月 — 投稿文生成 無制限"
          onSuccess={() => { setShowPayjp(false); setIsPremium(true); }}
          onClose={() => setShowPayjp(false)}
        />
      )}

      {/* ストリークマイルストーントースト */}
      {milestoneMsg && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-orange-500 text-white font-bold px-6 py-3 rounded-2xl shadow-xl z-50 animate-bounce"
        >
          {milestoneMsg}
        </div>
      )}
    </main>
  );
}
