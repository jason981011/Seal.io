#!/bin/bash

echo "🧙‍♂️ Seal.io 魔法生日網站 - 最終推送"
echo "====================================="

echo "推送代碼到 seal.io 倉庫..."
git push -u origin main
git push -u origin gh-pages

echo "✅ 推送完成！"
echo ""
echo "現在請在GitHub倉庫中啟用Pages："
echo "1. 前往 https://github.com/jason981011/seal.io/settings/pages"
echo "2. 選擇 'Deploy from a branch'"
echo "3. 選擇 'gh-pages' 分支"
echo "4. 保存"
echo ""
echo "您的Seal.io魔法網站將在："
echo "https://jason981011.github.io/seal.io/"