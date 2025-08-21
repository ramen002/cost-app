/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.tsx",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        // ベースカラー
        background: "#E4DCD3",
        primary: "#BFA78D",
        secondary: "#D8C4A3",
        red: "#D9534F",
        green: "#5CB85C",

        // アクセントカラー
        accentBlue: "#2F4D6C",     // 柔らかいブルーグレー
        accentOrange: "#E68A2E",   // 落ち着いたオレンジ
        accentOrangeBright: "#F29D35", // 強調用オレンジ

        // テキスト & ボーダー
        textSub: "#666666",        // サブテキスト
        border: "#F5F5F5",         // 境界線・区切り線
        placeholder: "#A3A3A3",

        // 円グラフや分類用の淡色パレット
        palette: {
          orange: "#F7CDA0",
          beige: "#EEDDC8",
          olive: "#D9E2C1",
          mint: "#C9E8D9",
          aqua: "#C9E3EB",
          blue: "#B6CDE0",
          purple: "#D7CBEF",
          lavender: "#E3DDED",
          rose: "#F2D1D6",
          salmon: "#F8C8B6",
          mustard: "#F3E0A1",
          pistachio: "#DCE7B5",
          cyan: "#A7D8E8",           // 新規追加：円グラフ用青緑
          grayPurple: "#D0D0E8",     // 新規追加：円グラフ用淡グレーパープル
        },
      },
    },
  },
  plugins: [],
};

// 円グラフ用配色順リスト
const chartColors = [
  "#F7CDA0",   // ソフトオレンジ（暖色系）
  "#C9E8D9",   // ミントグリーン（寒色系）
  "#F2D1D6",   // ローズピンク（暖色系）
  "#B6CDE0",   // スモーキーブルー（寒色系）
  "#F8C8B6",   // サーモンピンク（暖色系）
  "#D7CBEF",   // パウダーパープル（紫系）
  "#F3E0A1",   // ペールマスタード（暖色系）
  "#C9E3EB",   // ペールアクア（寒色系）
  "#DCE7B5",   // ピスタチオ（寒色寄り）
  "#EEDDC8",   // ミルクティーベージュ（暖色系）
  "#A7D8E8",   // シアン（青緑、寒色系）
  "#D0D0E8",   // グレーパープル（淡紫系）
  "#E68A2E",   // 落ち着いたオレンジ（アクセント）
  "#F29D35",   // 強調オレンジ（アクセント、必要な場合）
];

