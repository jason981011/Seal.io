#!/bin/bash

echo "🧙‍♂️ 魔法生日慶祝網站 - GitHub Pages 部署腳本"
echo "=============================================="

# 檢查是否已安裝GitHub CLI
if ! command -v gh &> /dev/null; then
    echo "❌ 需要安裝GitHub CLI"
    echo "請訪問: https://cli.github.com/"
    exit 1
fi

# 檢查是否已登入GitHub
if ! gh auth status &> /dev/null; then
    echo "🔐 請先登入GitHub:"
    gh auth login
fi

echo "📦 正在創建GitHub倉庫..."
gh repo create magical-birthday-celebration \
    --public \
    --description "A magical Harry Potter themed birthday celebration website with calendar interface, multiple interactive pages, and stunning animations" \
    --source=. \
    --remote=origin

echo "⬆️ 正在推送代碼到GitHub..."
git push -u origin main
git push -u origin gh-pages

echo "⚙️ 正在配置GitHub Pages..."
gh repo edit magical-birthday-celebration \
    --homepage "https://$(gh api user -q '.login').github.io/magical-birthday-celebration/"

# 等待GitHub Pages 部署
echo "⏳ 正在等待GitHub Pages 部署..."
sleep 10

echo "🎉 部署完成！"
echo "🌐 您的魔法生日網站現在可以在以下地址訪問:"
echo "   https://$(gh api user -q '.login').github.io/magical-birthday-celebration/"
echo ""
echo "📋 手動配置GitHub Pages的步驟:"
echo "1. 前往倉庫 Settings > Pages"
echo "2. 將 Source 設置為 'Deploy from a branch'"
echo "3. 選擇 'gh-pages' 分支和 '/ (root)' 文件夾"
echo "4. 保存設定"