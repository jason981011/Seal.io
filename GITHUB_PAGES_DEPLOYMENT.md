# GitHub Pages 部署指南

## 🚀 自動部署（推薦）

如果您已安裝GitHub CLI，請運行：

```bash
./deploy.sh
```

## 📋 手動部署步驟

### 1. 創建GitHub倉庫

1. 前往 [GitHub.com](https://github.com)
2. 點擊 "New repository"
3. 倉庫名稱：`magical-birthday-celebration`
4. 描述：`A magical Harry Potter themed birthday celebration website`
5. 設置為公開倉庫
6. **不要** 初始化README、.gitignore或授權

### 2. 推送代碼

```bash
# 添加遠程倉庫（將 YOUR_USERNAME 替換為您的GitHub用戶名）
git remote add origin https://github.com/YOUR_USERNAME/magical-birthday-celebration.git

# 推送main分支
git push -u origin main

# 推送gh-pages分支
git push -u origin gh-pages
```

### 3. 啟用GitHub Pages

1. 前往您的倉庫頁面
2. 點擊 **Settings** 標籤
3. 在左側選單中找到 **Pages**
4. 在 **Source** 下拉選單中選擇 **Deploy from a branch**
5. 選擇 **gh-pages** 分支和 **/(root)** 文件夾
6. 點擊 **Save**

### 4. 等待部署

GitHub Pages 通常需要2-3分鐘來部署您的網站。一旦完成，您將看到：

```
Your site is published at https://YOUR_USERNAME.github.io/magical-birthday-celebration/
```

## 🎯 故障排除

### 網站沒有顯示
- 確保已推送 `gh-pages` 分支
- 檢查GitHub Pages設定是否正確
- 等待5-10分鐘讓部署完成

### 資源文件加載失敗
- 確保所有文件都在倉庫中
- 檢查文件路徑是否正確

### 動畫或腳本不工作
- 檢查瀏覽器控制台是否有錯誤
- 確保所有CDN鏈接都有效

## 🌐 自訂域名（可選）

如果您想使用自訂域名：

1. 在倉庫的 **Settings > Pages** 中
2. 在 **Custom domain** 字段輸入您的域名
3. 配置DNS記錄指向GitHub Pages

---

**享受您的魔法生日慶祝網站！** 🧙‍♂️✨🎂