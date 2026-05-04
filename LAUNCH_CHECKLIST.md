# 🚀 Charlie - Launch Checklist

## ✅ PHASE 1: IMMEDIATE LAUNCH (Do This Now)

### 1. Download Existing Build
- [ ] Go to: https://expo.dev/accounts/dinerocash247/projects/charlie/builds/659df0b6-f712-48ee-bba5-e4f34f69a136
- [ ] Click "Download .aab"
- [ ] Save as `charlie-v1.0.aab`

### 2. Wait for Google Verification
- [ ] Check email for "Identity Verified" (1-3 days)
- [ ] Once verified, log in to Play Console

### 3. Prepare Store Listing
- [ ] Copy "Short Description" from `STORE_LISTING_GUIDE.md`
- [ ] Copy "Full Description" from `STORE_LISTING_GUIDE.md`
- [ ] Host `privacy-policy.html` on Vercel:
  ```bash
  cd /root/.hermes/videoai-mobile
  vercel deploy --prod
  ```
  - Copy the URL (e.g., `https://charlie-privacy.vercel.app`)

### 4. Submit to Play Store
- [ ] Create App: "Charlie"
- [ ] Category: Business (or Photo & Video)
- [ ] Upload `charlie-v1.0.aab`
- [ ] Paste descriptions
- [ ] Add Privacy Policy URL
- [ ] Upload graphics (icon, feature graphic, screenshots)
- [ ] Submit for review

---

## ✅ PHASE 2: UNIVERSAL UPDATE (Do Later)

### 1. Rebuild Locally
- [ ] Clone repo: `git clone https://github.com/SAHJONY/charlie-app.git`
- [ ] Install: `npm install`
- [ ] Login: `npx eas login`
- [ ] Build: `npx eas build --platform android --profile production`

### 2. Download New Build
- [ ] Download the new `.aab` from Expo link
- [ ] Save as `charlie-v1.1-universal.aab`

### 3. Submit Update
- [ ] Go to Play Console → Your App → Release → Production
- [ ] Create New Release
- [ ] Upload `charlie-v1.1-universal.aab`
- [ ] Release Notes: "Added dynamic industry-specific text for Real Estate, E-Commerce, Legal, and more!"
- [ ] Submit

---

## 📁 Files Created for You

1. **`privacy-policy.html`** - Professional privacy policy (host on Vercel)
2. **`STORE_LISTING_GUIDE.md`** - Complete Play Store copy & graphics guide
3. **`LAUNCH_CHECKLIST.md`** - This file (your step-by-step guide)
4. **GitHub Repo** - `https://github.com/SAHJONY/charlie-app` (code is saved)

---

## 🎯 Key Dates

- **Today:** Download v1.0 build, prepare store listing
- **In 1-3 Days:** Google verifies identity → Submit v1.0
- **In 2 Weeks:** Rebuild v1.1 with universal text (optional but recommended)
- **In 3 Weeks:** Submit v1.1 update

---

## 🆘 Need Help?

- **Build Issues:** Check `PLAY_STORE_SUBMISSION_GUIDE.md`
- **Privacy Policy:** Use `privacy-policy.html` (already written)
- **Store Listing:** Use `STORE_LISTING_GUIDE.md` (copy-paste ready)
- **Code Changes:** All saved in GitHub (pull when ready)

---

**You're all set!** The app is ready to launch. Just follow the checklist above. 🚀
