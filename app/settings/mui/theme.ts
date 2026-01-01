import { createTheme } from "@mui/material";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2", // メインカラー（青）
    },
    secondary: {
      main: "#dc004e", // アクセントカラー（赤紫）
    },
    background: {
      default: "#f8f9fa", // アプリケーション全体の背景色（薄いグレー）
    },
  },
  typography: {
    // フォントファミリー設定は削除（デフォルトを使用）
    h1: { fontSize: "2.5rem", fontWeight: 600 }, // 見出し1のサイズと太さ
    h2: { fontSize: "2rem", fontWeight: 600 },   // 見出し2のサイズと太さ
    h3: { fontSize: "1.75rem", fontWeight: 600 }, // 見出し3のサイズと太さ
  },
  components: {
    MuiButton: {
      defaultProps: {
        disableElevation: true, // ボタンの影（浮き上がり）を無効化してフラットなデザインにする
      },
      styleOverrides: {
        root: {
          textTransform: "none", // アルファベットの自動大文字変換を無効化
          borderRadius: 8,       // ボタンの角丸の半径
          fontWeight: "bold",    // 文字の太さ
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12, // カードの角丸
          boxShadow: "0 2px 8px rgba(0,0,0,0.08)", // 独自の影設定（デフォルトより柔らかく控えめな影）
        },
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "outlined", // 入力欄のスタイルをデフォルトで「枠線付き」にする
        size: "small",       // 入力欄のサイズをデフォルトで「小さめ」にする
      },
    },
  },
});