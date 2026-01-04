#!/bin/bash

echo "🧙‍♂️ 魔法生日網站 - 快速推送腳本"
echo "=================================="

# 檢查遠程倉庫
if ! git remote get-url origin &>/dev/null; then
    echo "請先在GitHub上創建倉庫 'magical-birthday-celebration'"
    echo "然後將下面的URL中的YOUR_USERNAME替換為您的用戶名："
    echo "git remote add origin https://github.com/YOUR_USERNAME/magical-birthday-celebration.git"
    exit 1
fi

echo "⬆️ 推送代碼到GitHub..."
git push -u origin main
git push -u origin gh-pages

echo "✅ 推送完成！"
echo ""
echo "現在請在GitHub倉庫中："
echo "1. 前往 Settings > Pages"
echo "2. 選擇 'Deploy from a branch'"
echo "3. 選擇 'gh-pages' 分支"
echo "4. 保存"
echo ""
echo "您的網站將在以下地址上線："
echo "https://YOUR_USERNAME.github.io/magical-birthday-celebration/"