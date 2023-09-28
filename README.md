# RP-QASystemF

## 概要

- エンジニアが顔合わせをする際の想定質問を、Webテスト形式でできるアプリケーション

<img width="300" alt="RP-QASystemF-architecture-image" src="https://github.com/RP-QASystem/RP-QASystemF/assets/122004532/52968096-c372-43be-800d-f4911a31fec4 ">

## 環境構築手順

### 主な使用技術

- Node.js
- Next.js(app router) 13.4.7
  - React 18.2.0
- Jest 29.5.0
- TailwindCSS 3.3.2


### 手順 

1. 実行環境の構築
- Node.jsのインストール
- [Node.js公式](https://nodejs.org/ja/download)よりインストール(16.14以降)[^1]
[^1]: [Next.js公式のGetting Started > Installation](https://nextjs.org/docs/getting-started/installation)

2. プロジェクトの環境構築
- 任意のフォルダに本リポジトリをクローン
    ```
    git clone git@github.com:RP-QASystem/RP-QASystemF.git
    ```

- [yarn公式](https://classic.yarnpkg.com/en/)よりyarnのインストール
- インストール後、yarnコマンド実行で依存関係を構築
    ```
    yarn
    ```

- 開発サーバーの起動
    ```
    yarn dev
    ```


## ドキュメント
- [ディレクトリ構成](https://drive.google.com/file/d/11jAjCUoC9mMUdYHJZ13Onj7T4YGurpWW/view?usp=sharing)
- [画面遷移図](https://drive.google.com/file/d/1-_KRi0QKjMPSWCGb-LDMd0A8upXcHCox/view?usp=sharing)
- [環境変数一覧](https://docs.google.com/document/d/1OCm4vvA95b57HCcW6eWnFQNsGHtn5ZnV4fyMRNyLrgM/edit?usp=sharing)
- [ライブラリ・フレームワーク一覧](https://docs.google.com/spreadsheets/d/1J2pbtpJvDxnDqWD1qR0G5gS1Tphu4CeygcolhA5b4lY/edit?usp=sharing)
- [画面設計書](https://docs.google.com/spreadsheets/d/1sgrRegXWkKxqBCr96ndCfuSTX7QY8X2_21N89q-LyR8/edit?usp=sharing)
