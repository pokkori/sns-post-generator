import { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { CrossSell } from "@/components/CrossSell";

interface KeywordData {
  title: string;
  h1: string;
  description: string;
  features: { icon: string; title: string; text: string }[];
  faqs: { q: string; a: string }[];
  lastUpdated: string;
}

export const KEYWORDS: Record<string, KeywordData> = {
  "twitter-bazu-toukourei": {
    title: "Twitter X バズる 投稿 例｜AIが30秒で自動生成",
    h1: "Twitter X バズる 投稿 例",
    description: "TwitterXでバズる投稿文をAIが30秒で自動生成。フック・共感・拡散されるフォーマットを使った投稿例を即作成。登録不要・無料3回。",
    features: [
      { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "バズる構成を自動生成", text: "「問い→共感→解決→CTA」のバズ投稿フォーマットをAIが自動適用。いいね・RT・フォロワー増加に貢献する投稿文を作成。" },
      { icon: "M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z", title: "フックを最適化", text: "最初の2行が命。スクロールを止める「フック」（驚き・疑問・共感）を自動生成し、インプレッション数を高めます。" },
      { icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z", title: "拡散されやすい形式", text: "リスト型・数字型・ストーリー型など拡散されやすい投稿フォーマットをAIが自動選択して生成します。" },
    ],
    faqs: [
      { q: "TwitterXでバズる投稿の特徴は何ですか？", a: "「最初の2行で止まる」「共感を呼ぶ内容」「行動を促すCTA」「リスト形式や数字を使う」が主な特徴です。SNS投稿生成AIがこれらの要素を自動で盛り込んだ投稿文を生成します。" },
      { q: "TwitterXの最適な投稿文字数は？", a: "140字以内（日本語）が基本ですが、バズりやすい投稿は50〜100字が目安です。SNS投稿生成AIで最適な長さの投稿文を生成できます。" },
      { q: "無料で何回使えますか？", a: "登録不要・クレジットカード不要で3回まで無料でご利用いただけます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "instagram-caption-kakikata": {
    title: "Instagram キャプション 書き方 例｜AIが30秒で自動生成",
    h1: "Instagram キャプション 書き方 例",
    description: "Instagramのキャプション（説明文）をAIが30秒で自動生成。ハッシュタグ付き・フォロワー増加に効果的な文章例を即作成。",
    features: [
      { icon: "M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", title: "ハッシュタグ自動提案", text: "投稿内容に最適なハッシュタグ10〜30個を自動提案。リーチ数・フォロワー増加を最大化します。" },
      { icon: "M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "感情を動かすコピー", text: "Instagramらしい「感情・体験・ライフスタイル」を訴求したキャプションを生成。保存・いいね増加に貢献。" },
      { icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z", title: "CTA付きキャプション", text: "「保存してね」「コメントで教えて」「プロフィールのリンクから」など適切なCTAを含むキャプションを自動生成。" },
    ],
    faqs: [
      { q: "Instagramキャプションの最適な長さは？", a: "フィード投稿は125文字以内が理想（それ以上は「続きを読む」に折りたたまれます）。重要な情報は最初に配置しましょう。SNS投稿生成AIで最適な長さのキャプションを生成できます。" },
      { q: "Instagramのハッシュタグは何個が最適ですか？", a: "3〜5個の関連性の高いハッシュタグが最も効果的という見方もありますが、20〜30個のニッチなハッシュタグを使う方法も有効です。SNS投稿生成AIが最適なハッシュタグを提案します。" },
      { q: "InstagramのキャプションにAIを使っていいですか？", a: "問題ありません。AIを使って生成したキャプションを自分でカスタマイズして使用することは一般的です。独自性を加えることで、よりあなたらしい投稿になります。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "sns-marketing-bun-sakusei": {
    title: "SNS マーケティング 投稿文 作成｜ブランド訴求をAIが自動生成",
    h1: "SNS マーケティング 投稿文 作成",
    description: "SNSマーケティング向け投稿文をAIが自動生成。X・Instagram・Facebook・Lineそれぞれに最適化した投稿文を30秒で作成。",
    features: [
      { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "プラットフォーム別最適化", text: "X・Instagram・Facebook・LINE公式アカウントそれぞれのアルゴリズム・ユーザー特性に合わせた投稿文を生成。" },
      { icon: "M16 8v8m-4-5v5m-4-2v2m-2 4h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z", title: "KPI別に最適化", text: "「エンゲージメント率向上」「フォロワー増加」「サイト誘導」「商品認知」など目標に合わせた投稿文を生成。" },
      { icon: "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z", title: "投稿カレンダー連携", text: "曜日・時間帯別の最適な投稿タイミングを考慮した投稿文を生成。定期投稿の運用効率を高めます。" },
    ],
    faqs: [
      { q: "SNSマーケティングで一番重要なことは何ですか？", a: "継続的な投稿・ターゲットに合ったコンテンツ・エンゲージメントへの返応が重要です。SNS投稿生成AIで投稿文作成にかかる時間を削減し、コミュニケーションに集中できます。" },
      { q: "企業のSNS投稿頻度はどのくらいが理想ですか？", a: "Xは毎日1〜3回、Instagramは週3〜7回、Facebookは週2〜5回が一般的な目安です。SNS投稿生成AIで投稿文を量産し、計画的な運用を実現できます。" },
      { q: "SNSマーケティングにAIを使っても大丈夫ですか？", a: "AIで生成した投稿文を活用することは合法で一般的になっています。生成した文章を自社ブランドに合わせてカスタマイズすることで効果的なSNS運用が可能です。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "tiktok-douga-setsumei": {
    title: "TikTok 動画 説明文 テンプレート｜AIが30秒で自動生成",
    h1: "TikTok 動画 説明文 テンプレート",
    description: "TikTokの動画説明文・キャプションをAIが自動生成。バズるハッシュタグ・CTAを含む投稿テンプレートを30秒で作成。登録不要。",
    features: [
      { icon: "M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z", title: "TikTokバズり構成", text: "最初の3秒で視聴を止める「フック」と、フォロー・保存を促す「CTA」を含む動画説明文を自動生成。" },
      { icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14", title: "トレンドハッシュタグ提案", text: "TikTokのトレンドハッシュタグと、ニッチで競合の少ないタグをバランスよく組み合わせた提案を自動生成。" },
      { icon: "M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z", title: "ターゲット別訴求", text: "「10代向け」「ビジネス系」「料理系」「美容系」などジャンルに合わせた投稿スタイルで生成します。" },
    ],
    faqs: [
      { q: "TikTokの動画説明文は長い方がいいですか？", a: "TikTokのキャプションは150文字以内が表示されます。重要なキーワード・ハッシュタグを最初に配置し、簡潔にまとめることが重要です。SNS投稿生成AIで最適な説明文を生成できます。" },
      { q: "TikTokでバズるハッシュタグの選び方は？", a: "「トレンドタグ（100万再生超）」「ミドルタグ（10万〜100万）」「ニッチタグ（1万〜10万）」を組み合わせると露出を最大化できます。SNS投稿生成AIが自動でバランス良く選定します。" },
      { q: "TikTokと他のSNSで同じ動画を使い回せますか？", a: "動画自体は再利用できますが、キャプション・ハッシュタグはプラットフォームごとに最適化することを推奨します。SNS投稿生成AIでTikTok/Instagram/X向けに別々に生成できます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "note-article-sns-shokai": {
    title: "note 記事 SNS 紹介文 書き方｜AIが読者を引き込む文章を生成",
    h1: "note 記事 SNS 紹介文",
    description: "noteの記事をSNSでシェアする紹介文をAIが自動生成。クリック率を高める「見出し・あらすじ・CTA」を30秒で作成。登録不要。",
    features: [
      { icon: "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z", title: "クリック率を高めるフック", text: "「この記事を読むと○○がわかります」「○○を知らないと損」などのフレーズでクリック率を最大化する紹介文を生成。" },
      { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "あらすじを的確に要約", text: "記事の要点を3〜5行でまとめたSNS映えするあらすじを自動生成。読者に「読みたい」と思わせます。" },
      { icon: "M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z", title: "プラットフォーム別に最適化", text: "X用（140字）・Instagram用（ハッシュタグ付き）など投稿先SNSに合わせた記事紹介文を生成します。" },
    ],
    faqs: [
      { q: "note記事のSNS紹介文で重要なことは何ですか？", a: "「読者のベネフィット（読むと何が得られるか）」を冒頭に明示することが最重要です。SNS投稿生成AIが読者を引き込む紹介文を自動生成します。" },
      { q: "noteの無料記事と有料記事で紹介文の書き方は変わりますか？", a: "有料記事は「なぜお金を出す価値があるか」の訴求が重要です。「○○円でこれだけの情報が得られる」という視点でSNS投稿生成AIが紹介文を生成します。" },
      { q: "note記事をXでシェアするのに最適なタイミングは？", a: "木曜・金曜の20〜22時が最もエンゲージメントが高い傾向があります。SNS投稿生成AIで複数パターンの紹介文を用意し、A/Bテストすることも有効です。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "twitter-thread-kakikata": {
    title: "Twitter スレッド 書き方 構成｜バズる連続投稿をAIが自動生成",
    h1: "Twitter スレッド 書き方 構成",
    description: "TwitterXのスレッド投稿をAIが自動生成。読者を引き込む5〜10連投の構成・フックを30秒で作成。フォロワー増加に貢献。",
    features: [
      { icon: "M4 6h16M4 10h16M4 14h16M4 18h16", title: "バズるスレッド構成", text: "「フック→リスト→具体例→まとめ→CTA」の黄金スレッド構成をAIが自動生成。最後まで読まれるスレッドを作成。" },
      { icon: "M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z", title: "各ツイートの完結性", text: "スレッドの各ツイートが単体でも意味を成すよう設計。引用RTでも拡散されやすい投稿に仕上げます。" },
      { icon: "M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "テーマ・ジャンル別", text: "「ビジネス知識系」「自己啓発系」「業界情報系」「実体験系」など人気ジャンル別のスレッドを生成します。" },
    ],
    faqs: [
      { q: "Twitterスレッドは何投稿が最適ですか？", a: "5〜10投稿が最もエンゲージメントが高い傾向があります。最後のツイートにCTA（フォロー・リプライ誘導）を入れるのが効果的です。SNS投稿生成AIで最適なスレッドを生成できます。" },
      { q: "Twitterスレッドでフォロワーを増やすコツは？", a: "「有益な情報」「個人の経験・失敗談」「数字で示す根拠」を含むスレッドが伸びやすいです。SNS投稿生成AIでこれらの要素を盛り込んだスレッドを生成できます。" },
      { q: "スレッドの最初のツイートで絶対やるべきことは？", a: "最初のツイートで「このスレッドを読むと何が得られるか」を明確に示すことが最重要です。SNS投稿生成AIがクリックを促すフックを自動生成します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "sns-business-pr-bun": {
    title: "SNS ビジネス PR 投稿文 例｜企業・個人事業主向けAI生成",
    h1: "SNS ビジネス PR 投稿文 例",
    description: "企業・個人事業主のSNS PR投稿文をAIが自動生成。商品・サービス・イベントの告知文を30秒で作成。景表法対応。登録不要。",
    features: [
      { icon: "M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z", title: "告知文の構成最適化", text: "「問題提起→解決策（商品）→特徴→価格・購入方法→CTA」の購買促進フォーマットで投稿文を自動生成。" },
      { icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z", title: "景表法NG表現を回避", text: "「No.1・最安値・100%効果保証」などの景表法違反表現を自動的に回避した安全なPR文を生成します。" },
      { icon: "M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z", title: "PR・広告の明示", text: "ステルスマーケティング防止のため、「PR」「広告」の明示を適切に盛り込んだ投稿文を生成します。" },
    ],
    faqs: [
      { q: "企業SNSの投稿でステルスマーケティングを防ぐには？", a: "2023年10月施行の景表法改正によりステルスマーケティングが違法になりました。インフルエンサーを使った場合は「#PR #AD #広告」の明示が必要です。SNS投稿生成AIが適切な明示を含む投稿文を生成します。" },
      { q: "SNSで商品を宣伝する際の注意点は？", a: "景表法（優良誤認・有利誤認）・薬機法（化粧品・健康食品）・金融商品取引法（投資系）など業種によって規制があります。SNS投稿生成AIが安全な表現を使った投稿文を生成します。" },
      { q: "個人事業主がSNSで集客するのに最適なプラットフォームは？", a: "業種・ターゲット年齢によって異なります。サービス業はInstagram・X、B2BはLinkedIn・X、地域密着はFacebookが効果的な傾向があります。SNS投稿生成AIで各プラットフォーム向けの投稿文を生成できます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "instagram-profile-kakikata": {
    title: "Instagram プロフィール 文章 例｜フォロワーが増えるAI生成",
    h1: "Instagram プロフィール 文章 例",
    description: "Instagramのプロフィール文章をAIが自動生成。フォローしたくなる「誰に・何を・なぜ」が伝わるプロフィールを30秒で作成。",
    features: [
      { icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z", title: "3行プロフィール最適化", text: "Instagramプロフィールの「誰向けか・何を発信するか・フォローするメリット」を3行以内に凝縮した最適なプロフィールを生成。" },
      { icon: "M13 10V3L4 14h7v7l9-11h-7z", title: "フォロー率を高める訴求", text: "「フォローすると○○がわかります」「毎日○○を発信中」など、フォローするベネフィットを明示した文章を生成。" },
      { icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14", title: "リンク誘導文も生成", text: "プロフィールのリンク（LPページ・ECサイト・公式サイト等）への誘導文を自動生成します。" },
    ],
    faqs: [
      { q: "Instagramプロフィールの文字数制限は？", a: "Instagramのプロフィール説明文は150文字以内です。限られた文字数でフォロワーを獲得するプロフィールをSNS投稿生成AIが生成します。" },
      { q: "企業アカウントと個人アカウントでプロフィールの書き方は違いますか？", a: "企業は「ブランドの特徴・商品ラインナップ・連絡先」、個人は「専門性・人柄・フォローするメリット」を重視します。SNS投稿生成AIで目的に合わせたプロフィールを生成できます。" },
      { q: "Instagramプロフィールを定期的に更新すべきですか？", a: "キャンペーン・新商品発売・季節に合わせてプロフィールを更新することで、訪問者へのアクション率が向上します。SNS投稿生成AIで素早くプロフィール文を生成できます。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "sns-hashtag-koukatek": {
    title: "SNS ハッシュタグ 効果的 使い方｜AIが最適なタグを自動提案",
    h1: "SNS ハッシュタグ 効果的 使い方",
    description: "SNSのハッシュタグ戦略をAIが最適化。X・Instagram・TikTokそれぞれのリーチを最大化するハッシュタグを30秒で自動提案。",
    features: [
      { icon: "M7 20l4-16m2 16l4-16M6 9h14M4 15h14", title: "プラットフォーム別最適化", text: "XとInstagramとTikTokではハッシュタグの効果が異なります。各SNSに最適なタグ数・タグの種類をAIが自動選定。" },
      { icon: "M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z", title: "ビッグ・ミドル・ニッチのバランス", text: "超人気タグ・中規模タグ・ニッチタグを戦略的に組み合わせ、新規リーチと固定読者両方を獲得。" },
      { icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6", title: "競合分析で差別化", text: "競合が使っているハッシュタグを分析し、狙い目のすき間ハッシュタグを提案します。" },
    ],
    faqs: [
      { q: "InstagramとXでハッシュタグの最適な個数は違いますか？", a: "Instagramは3〜5個（または20〜30個のニッチタグ）、XはSEO的に1〜2個が一般的です。SNS投稿生成AIがプラットフォーム別に最適なハッシュタグ数を提案します。" },
      { q: "Instagramで「シャドウバン」にならないためのハッシュタグ使い方は？", a: "禁止タグ・スパム的なタグの使用を避け、投稿ジャンルと関連性の高いタグを選ぶことが重要です。SNS投稿生成AIが安全で効果的なハッシュタグを提案します。" },
      { q: "毎回同じハッシュタグを使い回していいですか？", a: "同じハッシュタグセットを使い続けるとアルゴリズムに低品質と判断される場合があります。SNS投稿生成AIで投稿ごとに微妙に変えたハッシュタグセットを生成することを推奨します。" },
    ],
    lastUpdated: "2026-03-31",
  },
  "line-official-toukou-template": {
    title: "LINE公式 投稿文 テンプレート｜開封率UPの文章をAIが自動生成",
    h1: "LINE公式 投稿文 テンプレート",
    description: "LINE公式アカウントの投稿文・メッセージをAIが自動生成。開封率・クリック率UPのテンプレートを30秒で作成。登録不要。",
    features: [
      { icon: "M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z", title: "開封率を高める件名", text: "LINE通知で表示される最初の一文を工夫し、「開封しないと損」と感じさせるフックを自動生成します。" },
      { icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", title: "クーポン・キャンペーン告知", text: "期間限定クーポン・季節キャンペーン・新商品案内などLINE向けの購買促進メッセージを生成します。" },
      { icon: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", title: "ブロック率を下げる頻度管理", text: "送りすぎによるブロックを防ぐメッセージ設計・内容バリエーションを提案。友だち維持率を高めます。" },
    ],
    faqs: [
      { q: "LINE公式アカウントの投稿頻度はどのくらいが適切ですか？", a: "週1〜2回が一般的なブロック率を抑えながら認知を維持できる頻度です。キャンペーン時は増やしても問題ありませんが価値のある情報を提供することが重要です。SNS投稿生成AIで多様なメッセージを生成できます。" },
      { q: "LINE公式アカウントでブロック率を下げるには？", a: "「有益な情報」「クーポン・特典」「パーソナライズされたメッセージ」が重要です。広告色が強すぎるメッセージはブロック率を高めます。SNS投稿生成AIで読者にとって価値ある投稿文を生成できます。" },
      { q: "LINE公式のセグメント配信で効果的なメッセージの作り方は？", a: "購買履歴・属性・行動に合わせたパーソナライズメッセージが効果的です。SNS投稿生成AIでターゲット別のメッセージを量産できます。" },
    ],
    lastUpdated: "2026-03-31",
  },
};

const ALL_SLUGS = Object.keys(KEYWORDS);

export function generateStaticParams() {
  return ALL_SLUGS.map((slug) => ({ slug }));
}

const SITE_URL = "https://sns-post-generator-mu.vercel.app";

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const kw = KEYWORDS[params.slug];
  if (!kw) return {};
  return {
    title: kw.title,
    description: kw.description,
    other: { "article:modified_time": kw.lastUpdated },
    openGraph: {
      title: kw.title,
      description: kw.description,
      url: `${SITE_URL}/keywords/${params.slug}`,
      siteName: "SNS投稿生成AI｜Twitter/Instagram投稿文を30秒で自動生成",
      locale: "ja_JP",
      type: "website",
      images: [{ url: "/og.png", width: 1200, height: 630, alt: kw.h1 }],
    },
    twitter: { card: "summary_large_image", title: kw.title, description: kw.description, images: ["/og.png"] },
    alternates: { canonical: `${SITE_URL}/keywords/${params.slug}` },
  };
}

function FeatureIcon({ d }: { d: string }) {
  return (
    <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-pink-500/10 border border-pink-500/20 shrink-0">
      <svg className="w-6 h-6 text-pink-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d={d} />
      </svg>
    </div>
  );
}

export default function KeywordPage({ params }: { params: { slug: string } }) {
  const kw = KEYWORDS[params.slug];
  if (!kw) notFound();

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "dateModified": kw.lastUpdated,
    mainEntity: kw.faqs.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <main className="min-h-screen text-white" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(236,72,153,0.12) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(168,85,247,0.10) 0%, transparent 50%), #0B0F1E" }}>
        <section className="max-w-3xl mx-auto px-4 pt-16 pb-12 text-center">
          <p className="text-pink-400 text-sm font-medium tracking-wider mb-4">SNS投稿生成AI｜Twitter/Instagram投稿文を30秒で自動生成</p>
          <h1 className="text-3xl sm:text-4xl font-bold mb-6 bg-clip-text text-transparent" style={{ backgroundImage: "linear-gradient(135deg, #FBCFE8, #FFFFFF, #E9D5FF)" }}>{kw.h1}</h1>
          <p className="text-base sm:text-lg leading-relaxed mb-8" style={{ color: "rgba(251,207,232,0.8)" }}>{kw.description}</p>
          <Link href="/tool" className="inline-flex items-center gap-2 text-white font-bold text-lg px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-200" style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)", boxShadow: "0 0 30px rgba(236,72,153,0.4)" }}>
            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            無料でSNS投稿文を生成する
          </Link>
          <p className="text-xs mt-3" style={{ color: "rgba(251,207,232,0.5)" }}>登録不要・クレジットカード不要・無料3回</p>
        </section>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-bold text-center mb-8 text-white/90">特長</h2>
          <div className="grid sm:grid-cols-3 gap-6">
            {kw.features.map((f, i) => (
              <div key={i} className="rounded-2xl p-6 border border-white/10 backdrop-blur-sm" style={{ background: "rgba(255,255,255,0.03)" }}>
                <FeatureIcon d={f.icon} />
                <h3 className="font-bold mt-4 mb-2 text-white/90">{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(251,207,232,0.7)" }}>{f.text}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16">
          <h2 className="text-xl font-bold text-center mb-8 text-white/90">よくある質問</h2>
          <div className="space-y-4">
            {kw.faqs.map((f, i) => (
              <details key={i} className="rounded-2xl border border-white/10 backdrop-blur-sm group" style={{ background: "rgba(255,255,255,0.03)" }}>
                <summary className="cursor-pointer px-6 py-4 font-medium text-white/90 flex items-center justify-between list-none">
                  {f.q}
                  <svg className="w-5 h-5 text-pink-400 transition-transform group-open:rotate-180 shrink-0 ml-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 9l-7 7-7-7" /></svg>
                </summary>
                <p className="px-6 pb-4 text-sm leading-relaxed" style={{ color: "rgba(251,207,232,0.7)" }}>{f.a}</p>
              </details>
            ))}
          </div>
        </section>

        <section className="max-w-3xl mx-auto px-4 pb-16 text-center">
          <div className="rounded-2xl p-8 border border-pink-500/20" style={{ background: "linear-gradient(135deg, rgba(236,72,153,0.1), rgba(168,85,247,0.05))" }}>
            <h2 className="text-xl font-bold mb-3 text-white/90">今すぐSNS投稿文を生成</h2>
            <p className="text-sm mb-6" style={{ color: "rgba(251,207,232,0.7)" }}>テーマを入力するだけ。Twitter/Instagram/TikTok向けの投稿文を30秒で自動生成します。</p>
            <Link href="/tool" className="inline-flex items-center gap-2 text-white font-bold px-8 py-4 rounded-2xl hover:scale-105 transition-all duration-200" style={{ background: "linear-gradient(135deg, #EC4899, #A855F7)", boxShadow: "0 0 30px rgba(236,72,153,0.4)" }}>
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              無料でSNS投稿生成AIを使う
            </Link>
          </div>
        </section>

        <p className="text-center text-xs text-white/40 mt-8 pb-8">最終更新: 2026年3月31日</p>

        <section className="max-w-4xl mx-auto px-4 pb-16">
          <CrossSell currentService="SNS投稿生成AI" />
        </section>
      </main>
    </>
  );
}
