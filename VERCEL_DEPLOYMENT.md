# Deploy SubStop-Manager to Vercel
## Step-by-Step Guide

---

## Step 1: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `substop-manager`
3. Make it **Public** or **Private**
4. Click **Create repository**

---

## Step 2: Upload Your Files

### Option A: Web Upload (Easiest)

1. On your new GitHub repo page, click **"uploading an existing file"**
2. Drag and drop these files from `~/Desktop/MarketingMaster/substop-manager/github-repo/`:
   - `index.html`
   - `README.md`
   - `vercel.json`
3. Add commit message: "Initial landing page"
4. Click **Commit changes**

### Option B: Command Line

```bash
cd ~/Desktop/MarketingMaster/substop-manager/github-repo

git init
git add .
git commit -m "Initial landing page"

git remote add origin https://github.com/YOUR_USERNAME/substop-manager.git
git branch -M main
git push -u origin main
```

---

## Step 3: Deploy to Vercel

### Sign Up / Log In

1. Go to https://vercel.com
2. Sign up with your **GitHub account**
3. Click **"Add New Project"**

### Import Repository

1. Find `substop-manager` in the list
2. Click **Import**
3. Framework Preset: Select **"Other"**
4. Click **Deploy**

### Wait for Deployment

- Vercel will build and deploy your site
- You'll get a URL like: `https://substop-manager.vercel.app`
- This takes about 1-2 minutes

---

## Step 4: Add Custom Domain (substop.tech)

### In Vercel Dashboard:

1. Go to your project **Settings**
2. Click **Domains** tab
3. Enter: `substop.tech`
4. Click **Add**

### Configure DNS in Namecheap:

Vercel will show you DNS records to add. Typically:

**Option 1: A Record**
```
Type: A Record
Host: @
Value: 76.76.21.21 (or whatever Vercel provides)
TTL: Automatic
```

**Option 2: CNAME (for www)**
```
Type: CNAME Record
Host: www
Value: cname.vercel-dns.com
TTL: Automatic
```

### Or Use Vercel Nameservers (Easiest):

1. In Vercel, select **"Set Vercel as your DNS provider"**
2. Copy the Vercel nameservers (e.g., `ns1.vercel-dns.com`)
3. In Namecheap:
   - Domain List → Manage (substop.tech)
   - Nameservers → Custom DNS
   - Paste Vercel nameservers
   - Save

### Verify in Vercel:

- Click **"Refresh"** or wait for verification
- Should show: "Valid Configuration" ✅
- SSL certificate will be auto-generated

---

## Step 5: Test Your Domain

1. Wait 5-30 minutes for DNS propagation
2. Visit: https://substop.tech
3. Should show your landing page
4. Check SSL lock icon ✅

---

## Summary

| Step | Action | Time |
|------|--------|------|
| 1 | Create GitHub repo | 2 min |
| 2 | Upload files | 2 min |
| 3 | Deploy to Vercel | 2 min |
| 4 | Add custom domain | 5 min |
| 5 | Test | 5-30 min |

**Total: ~15 minutes**

---

## Troubleshooting

### "Domain already in use"
- Remove domain from other Vercel projects first
- Or check if DNS is pointing elsewhere

### "Invalid Configuration"
- Double-check DNS records match what Vercel provided
- Wait longer for DNS propagation
- Try clearing DNS cache

### SSL not working
- Vercel SSL is automatic
- Wait up to 24 hours for certificate issuance
- Check domain shows "Valid Configuration" in Vercel

---

## Benefits of Vercel

- ✅ **Free SSL** - Automatic HTTPS
- ✅ **Global CDN** - Fast loading worldwide
- ✅ **Custom domains** - Easy setup
- ✅ **Auto-deploy** - Push to GitHub = auto update
- ✅ **Analytics** - Built-in traffic stats

---

**Your site will be live at: https://substop.tech 🚀**
