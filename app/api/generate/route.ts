import Anthropic from "@anthropic-ai/sdk";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export const dynamic = "force-dynamic";

const FREE_LIMIT = 3;

function getClient() {
  return new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
}

const rateLimit = new Map<string, { count: number; resetAt: number }>();
function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) { rateLimit.set(ip, { count: 1, resetAt: now + 60000 }); return true; }
  if (entry.count >= 20) return false;
  entry.count++;
  return true;
}

const APPS: Record<string, { name: string; desc: string; audience: string; features: string[]; url: string; price: string }> = {
  "claim-ai": {
    name: "AIクレーム対応文ジェネレーター",
    desc: "クレーム内容を入力するだけで、プロ品質の対応文をAIが自動生成するSaaSサービス",
    audience: "飲食・小売・EC・サービス業の担当者、店長、経営者",
    features: ["業種別クレーム対応文生成", "お詫び文・原因説明・再発防止策を自動構成", "30秒で完成", "無料3回試せる"],
    url: "https://claim-ai-beryl.vercel.app",
    price: "無料3回 / スタンダード¥4,980/月 / ビジネス¥9,800/月",
  },
  "ec-description-generator": {
    name: "AI商品説明文ジェネレーター",
    desc: "商品名と特徴を入力するだけで、楽天・Amazon向けSEO最適化された商品説明文を瞬時に生成",
    audience: "楽天・Amazon出品者、EC事業者、ネットショップ運営者",
    features: ["楽天・Amazon両対応", "SEOキーワード自動抽出", "キャッチコピー＋詳細説明文を一括生成", "無料3回試せる"],
    url: "https://ec-description-generator.vercel.app",
    price: "無料3回 / スタンダード¥980/月 / ビジネス¥2,980/月",
  },
  "hojyokin-ai": {
    name: "AI補助金診断",
    desc: "事業内容を入力するだけで、活用できる補助金・助成金をAIが診断するSaaSサービス",
    audience: "中小企業経営者、個人事業主、起業家",
    features: ["ものづくり補助金・IT導入補助金など主要制度に対応", "事業内容から申請可能な制度を診断", "ドラフト文書生成", "無料3回試せる"],
    url: "https://hojyokin-ai-delta.vercel.app",
    price: "無料3回 / スタンダード¥4,980/月 / ビジネス¥9,800/月",
  },
  "shukatsu-ai": {
    name: "AI終活サポート",
    desc: "終活に必要なことをAIが個別アドバイス。エンディングノート・相続・デジタル遺品・医療の意思表示をサポート",
    audience: "50代・60代・70代、終活を考え始めた方、その家族",
    features: ["エンディングノートの書き方", "相続・遺言のアドバイス", "デジタル遺品整理", "無料3回試せる"],
    url: "https://shukatsu-ai.vercel.app",
    price: "無料3回 / スタンダード¥980/月 / プレミアム¥2,980/月",
  },
  "uranai-ai": {
    name: "AI占い",
    desc: "生年月日を入力するだけで、九星気学・干支をベースにしたAIが本格鑑定",
    audience: "占い好き、日々の運勢を知りたい方、恋愛・仕事に悩む方",
    features: ["今日の運勢・恋愛運・総合運命鑑定", "九星気学と干支の計算", "毎日更新", "無料3回試せる"],
    url: "https://uranai-ai-sigma.vercel.app",
    price: "無料3回 / スタンダード¥980/月 / プレミアム¥2,980/月",
  },
  "hiki-coin": {
    name: "$HIKI ミームコイン",
    desc: "ひきこもりをテーマにしたSolanaチェーンのミームコイン。Never leave your room. Always go to the moon.",
    audience: "暗号通貨・ミームコイン投資家、Solanaユーザー、ひきこもり文化が好きな人",
    features: ["税率0%", "LP永久ロック", "Mint権限放棄（ラグなし）", "Pump.funで購入可能"],
    url: "https://hiki-coin.vercel.app",
    price: "無料（Pump.funで購入）",
  },
};

const PLATFORM_RULES: Record<string, string> = {
  "X": "Twitter/X向け。140文字以内厳守。改行を効果的に使う。ハッシュタグは2〜3個。絵文字は1〜3個。冒頭1行で引きをつくる。URLは末尾に1つ。",
  "TikTok": "TikTok向けキャプション。冒頭に強烈なフック（この動画見てよかった、と思わせる一言）。改行多め。ハッシュタグは5〜10個。絵文字多用。「保存して」「フォローして」などのCTA必須。",
  "Instagram": "Instagram向けキャプション。最初の2行で興味を引く。改行・絵文字を多用。本文150〜300文字程度。ハッシュタグは10〜15個（末尾にまとめる）。CTA（プロフリンクへ誘導）を入れる。",
  "note": "note向け記事の冒頭部分。タイトル（キャッチーで検索されやすいもの）と、本文の書き出し300文字程度。読者がスクロールを止めるような冒頭を書く。ハッシュタグ3〜5個。",
  "YouTube Shorts": "YouTube Shorts向け。動画タイトル（60文字以内）と説明文（100〜200文字）。タイトルは検索されやすいキーワードを含める。説明文にはCTAとURL。ハッシュタグ3〜5個。",
};

const ANGLE_DESCRIPTIONS: Record<string, string> = {
  "サービス紹介": "サービスの機能・特徴を分かりやすく紹介する投稿。何ができるのかを具体的に伝える。",
  "ペイン訴求": "ターゲットの悩み・痛みに共感して刺さる投稿。『こんな悩みありませんか？』から始める。",
  "無料お試しCTA": "無料で試せることを全面に出した行動喚起型投稿。今すぐ試してもらうことを目的とする。",
  "数字・実績": "具体的な数字や実績で信頼性を高める投稿。『〇秒で完成』『〇〇円節約』などを活用。",
  "ライフハック": "サービスを使った便利な使い方・tips的な投稿。役立つ情報として拡散を狙う。",
};

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || "unknown";
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  }

  const cookieStore = await cookies();
  const isPremium = cookieStore.get("stripe_premium")?.value === "1";
  const cookieCount = parseInt(cookieStore.get("gen_count")?.value ?? "0", 10);

  if (!isPremium && cookieCount >= FREE_LIMIT) {
    return NextResponse.json({ error: "limit_reached" }, { status: 402 });
  }

  const { appId, customDesc, platform, angle, count } = await req.json();

  let appInfo: { name: string; desc: string; audience: string; features: string[]; url: string; price: string };
  if (appId === "custom") {
    if (!customDesc) return NextResponse.json({ error: "No description" }, { status: 400 });
    appInfo = { name: "あなたのサービス", desc: customDesc, audience: "ターゲットユーザー", features: [], url: "", price: "" };
  } else {
    const app = APPS[appId];
    if (!app) return NextResponse.json({ error: "Invalid app" }, { status: 400 });
    appInfo = app;
  }

  const platformRule = PLATFORM_RULES[platform];
  const angleDesc = ANGLE_DESCRIPTIONS[angle];
  if (!platformRule || !angleDesc) return NextResponse.json({ error: "Invalid params" }, { status: 400 });

  const num = Math.min(Math.max(parseInt(count) || 3, 1), 5);

  const prompt = `あなたはSNSマーケティングの専門家です。以下のWebサービスの${platform}向け投稿文を${num}パターン生成してください。

【サービス情報】
- サービス名: ${appInfo.name}
- 説明: ${appInfo.desc}
- ターゲット: ${appInfo.audience}
- 主な機能: ${appInfo.features.length > 0 ? appInfo.features.join("、") : "（説明文を参照）"}
- URL: ${appInfo.url || "（省略）"}
- 料金: ${appInfo.price || "（省略）"}

【投稿ルール】
${platformRule}

【投稿の角度・方向性】
${angleDesc}

【出力形式】
各パターンを「---」で区切って出力してください。余計な説明や番号は不要です。投稿文のみを出力してください。`;

  const message = await getClient().messages.create({
    model: "claude-haiku-4-5-20251001",
    max_tokens: 2000,
    messages: [{ role: "user", content: prompt }],
  });

  const text = message.content[0].type === "text" ? message.content[0].text : "";
  const posts = text.split("---").map((p: string) => p.trim()).filter(Boolean);

  if (!isPremium) {
    const res = NextResponse.json({ posts, remaining: FREE_LIMIT - cookieCount - 1 });
    res.cookies.set("gen_count", String(cookieCount + 1), {
      httpOnly: true,
      secure: true,
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
      sameSite: "lax",
    });
    return res;
  }

  return NextResponse.json({ posts });
}
