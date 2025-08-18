/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.tsx",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // 背景
        backgroundMain: '#E4DCD3',      // 背景メイン
        backgroundCard: '#FFFFFF',       // カード・モーダル背景
        border: '#F5F5F5',              // Divider / 境界線

        // テキスト
        textMain: '#0C375C',             // 見出し・本文
        textSub: '#A3A3A3',              // サブテキスト・説明文
        textHighlight: '#BFA78D',        // 強調テキスト・リンク
        textAccent: '#F29D35',           // 注意・強調用アクセント

        // ボタン
        primary: '#BFA78D',              // プライマリボタン
        primaryText: '#FFFFFF',          // プライマリボタン文字
        secondary: '#D8C4A3',            // セカンダリボタン
        secondaryText: '#0C375C',        // セカンダリボタン文字

        // グラフ
        graphBlue: '#0C375C',
        graphBeige: '#BFA78D',
        graphSky: '#4A90E2',
        graphOrange: '#F29D35',

        // モーダル
        modalBackground: '#FFFFFF',
        modalBackdrop: 'rgba(0,0,0,0.5)',

        // WebView
        webviewBackground: '#E4DCD3',
        webviewText: '#0C375C',
        webviewLink: '#BFA78D',
        webviewHeading: '#0C375C'
      },
    },
  },
  plugins: [],
};
