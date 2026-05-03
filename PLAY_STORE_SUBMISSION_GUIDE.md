# 🚀 Charlie - Google Play Store Submission Guide

## Step 1: Download Your App File
1. Go to: **https://expo.dev/accounts/dinerocash247/projects/charlie/builds/659df0b6-f712-48ee-bba5-e4f34f69a136**
2. Look for the **"Download .aab"** button (usually on the right side or under "Build artifact").
3. Save the file (e.g., `charlie-release.aab`) to your computer.

## Step 2: Create Google Play Developer Account (One-time $25 fee)
1. Go to: **https://play.google.com/console**
2. Sign in with your Google account.
3. Click **"Get started"** and pay the **$25 registration fee**.
4. Accept the developer agreement.

## Step 3: Create Your App in Play Console
1. Click **"Create app"** in the top right.
2. Fill in:
   - **App name:** `Charlie`
   - **Default language:** `English (US)`
   - **App or Game:** `App`
   - **Free or Paid:** `Free`
3. Click **"Create app"**.

## Step 4: Complete the Store Listing
Go to **Main dashboard** → **Store listing** and fill in:

### Main Store Listing
- **App name:** Charlie
- **Short description:** `AI Video Generator for Any Industry - Turn photos into cinematic videos instantly.`
- **Full description:**
  ```
  Charlie is the industry-agnostic AI video engine that transforms static photos into stunning cinematic videos. Whether you're in Real Estate, E-commerce, Legal, or Personal Branding, Charlie creates professional content in seconds.

  🌟 Key Features:
  • Industry Selector: Choose from Real Estate, E-commerce, Legal, Personal Brand, and more
  • AI-Powered Generation: Advanced AI creates cinematic videos from your photos
  • Universal Compatibility: Works on any Android device
  • Instant Results: Get professional videos in minutes
  • Premium Quality: High-resolution output ready for social media and marketing

  Perfect for:
  - Real Estate Agents: Showcase properties with stunning video tours
  - E-commerce: Create product demo videos instantly
  - Legal Professionals: Explain complex concepts with engaging visuals
  - Personal Brands: Elevate your social media presence

  Download Charlie today and start creating professional videos with AI!
  ```
- **Category:** `Business` (or `Photo & Video`)
- **Contact email:** `support@charlie.videoai` (or your email)
- **Privacy Policy URL:** (See Step 5 for template)

### Graphics
- **High-resolution icon:** Upload `assets/icon.png` (512x512px)
- **Feature graphic:** Create a 1024x500px image (you can use Canva with "Charlie" branding)
- **Screenshots:** Take 2-3 screenshots of the app in action (upload from your phone)

## Step 5: Privacy Policy (Required)
You can use this simple template. Host it on GitHub Pages, Vercel, or any free host:

```html
<!DOCTYPE html>
<html>
<head><title>Charlie Privacy Policy</title></head>
<body>
<h1>Privacy Policy for Charlie</h1>
<p>Last updated: May 3, 2026</p>
<p>This app does not collect, store, or share any personal data. All video processing happens securely on the device or via encrypted API calls. We do not track users or sell data.</p>
<p>For questions, contact: support@charlie.videoai</p>
</body>
</html>
```
*Host this at: `https://charlie-videoai.vercel.app/privacy` (or similar)*

## Step 6: Upload Your App
1. In Play Console, go to **Release** → **Production**.
2. Click **"Create new release"**.
3. Under **"App bundles"**, click **"Upload"** and select your `.aab` file.
4. Fill in **Release notes**:
   ```
   Initial release of Charlie AI Video Generator.
   - Industry selector for Real Estate, E-commerce, Legal, and more
   - AI-powered video generation from photos
   - Premium cinematic effects
   - Optimized for Android devices
   ```
5. Click **"Next"** → **"Review release"** → **"Start rollout to Production"**.

## Step 7: Wait for Review
- Google typically reviews new apps in **1-3 days**.
- You'll get an email when it's live!
- Your app will be at: `https://play.google.com/store/apps/details?id=com.charlie.videoai`

## 🎯 Pro Tips
- **Internal Testing First:** If you want to test with friends before public release, choose **"Internal testing"** instead of "Production". Add up to 100 testers by email.
- **Screenshots:** Use high-quality screenshots showing the "Industry Selector" and "Video Generation" features.
- **Keywords:** Use "AI video", "photo to video", "real estate marketing", "cinematic videos" in your description.

## ❓ Need Help?
If you get stuck at any step, let me know exactly where! I can:
- Generate a privacy policy hosted on Vercel
- Create store listing graphics
- Help with Play Console setup
- Troubleshoot upload errors

Good luck with your launch! 🚀
