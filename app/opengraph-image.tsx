import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'AI SNS投稿文ジェネレーター';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px' }}>
          <div style={{ width: 64, height: 64, background: '#6366f1', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <svg width="36" height="36" viewBox="0 0 24 24" fill="white">
              <path d="M17 2H7C5.9 2 5 2.9 5 4v16l7-3 7 3V4c0-1.1-.9-2-2-2z"/>
            </svg>
          </div>
          <span style={{ color: '#c7d2fe', fontSize: 28, fontWeight: 700 }}>AI SNS投稿文ジェネレーター</span>
        </div>
        <div style={{ color: 'white', fontSize: 48, fontWeight: 900, textAlign: 'center', lineHeight: 1.2, maxWidth: 900 }}>
          30秒でSNS投稿文を
          <br />
          自動生成
        </div>
        <div style={{ color: '#a5b4fc', fontSize: 24, marginTop: 24, textAlign: 'center' }}>
          X・Instagram・TikTok・note対応 | 毎日の投稿ネタ切れを解消
        </div>
      </div>
    ),
    { ...size }
  );
}
