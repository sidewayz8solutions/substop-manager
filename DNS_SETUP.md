# SubStop-Manager DNS Setup
## Point substop.tech to Your Landing Page

---

## Current Status

| Resource | URL |
|----------|-----|
| SkillBoss Deployment | https://skillboss-p8e7s3oh-preview.heyboss.live |
| Your Domain | substop.tech (Namecheap) |
| Target | substop.tech → SkillBoss deployment |

---

## Option 1: Namecheap DNS Configuration (Recommended)

### Step 1: Log into Namecheap
1. Go to https://ap.www.namecheap.com/
2. Sign in to your account
3. Go to **Domain List**
4. Click **Manage** next to substop.tech

### Step 2: Configure DNS Records

In the **Advanced DNS** tab, add these records:

#### For www.substop.tech (Recommended)
```
Type: CNAME Record
Host: www
Value: skillboss-p8e7s3oh-preview.heyboss.live
TTL: Automatic
```

#### For Root Domain (substop.tech)
Option A - Redirect to www:
```
Type: URL Redirect Record
Host: @
Value: https://www.substop.tech
TTL: Automatic
```

Option B - A Record (if supported):
```
Type: A Record
Host: @
Value: 76.76.21.21 (Vercel/Cloudflare IP - check with SkillBoss)
TTL: Automatic
```

### Step 3: Save Changes
Click "Save All Changes" in Namecheap

---

## Option 2: Use Cloudflare (Best Performance)

### Why Cloudflare?
- Free CDN (faster global loading)
- Free SSL certificate
- DDoS protection
- Analytics

### Setup Steps

1. **Sign up at Cloudflare.com**
2. **Add your domain**: substop.tech
3. **Copy Cloudflare nameservers** (e.g., lara.ns.cloudflare.com)
4. **Update Namecheap nameservers**:
   - In Namecheap: Domain List → Manage → Nameservers → Custom DNS
   - Paste Cloudflare nameservers
   - Save

5. **Configure DNS in Cloudflare**:
```
Type: CNAME
Name: www
Target: skillboss-p8e7s3oh-preview.heyboss.live
Proxy status: Proxied (orange cloud)
```

```
Type: Redirect Rules
Name: root
URL: https://www.substop.tech
```

---

## Option 3: SkillBoss Custom Domain (If Supported)

Check if SkillBoss supports custom domains:

```bash
# Try running this command
cd ~/.agents/skills/skillboss
node ./scripts/serve-build.js --help

# Or check for custom domain option
node ./scripts/serve-build.js publish-static ~/Desktop/MarketingMaster/substop-manager/deployment/landing-page --domain substop.tech
```

If SkillBoss supports it, they may provide:
- A CNAME target to point to
- Or instructions for custom domain binding

---

## Recommended Setup (Cloudflare)

### Full Configuration

#### Cloudflare DNS Records:
```
Type: CNAME
Name: www
Target: skillboss-p8e7s3oh-preview.heyboss.live
TTL: Auto
Proxy: Enabled (orange cloud)
```

```
Type: A
Name: @ (root)
Target: 192.0.2.1 (dummy, we'll redirect)
TTL: Auto
```

#### Cloudflare Page Rule (Redirect root to www):
```
URL: substop.tech/*
Setting: Forwarding URL
Destination: https://www.substop.tech/$1
Status: 301 Permanent Redirect
```

#### Cloudflare SSL/TLS:
```
Mode: Full (strict)
Always Use HTTPS: ON
```

---

## Verification Steps

### 1. Check DNS Propagation
```bash
# Check if DNS is working
dig www.substop.tech

# Or use online tool
curl -I https://www.substop.tech
```

### 2. Test the Domain
Once DNS propagates (can take 5 minutes to 48 hours):
- https://www.substop.tech should load your landing page
- https://substop.tech should redirect to www

### 3. Verify SSL
- Both URLs should show secure lock icon
- SSL certificate should be valid

---

## Quick Start Guide

### Fastest Option (Namecheap Only):

1. Login to Namecheap
2. Domain List → Manage (substop.tech)
3. Advanced DNS tab
4. Add records:
   ```
   CNAME | www | skillboss-p8e7s3oh-preview.heyboss.live
   URL Redirect | @ | https://www.substop.tech
   ```
5. Save
6. Wait 5-30 minutes
7. Test: https://www.substop.tech

---

## Troubleshooting

### Issue: Domain not loading
- Clear DNS cache: `sudo killall -HUP mDNSResponder` (Mac)
- Check propagation: https://whatsmydns.net/
- Wait longer (up to 48 hours)

### Issue: SSL error
- Enable "Always Use HTTPS" in Cloudflare
- Check SSL mode is "Full"

### Issue: 404 error
- Verify CNAME value is exactly: `skillboss-p8e7s3oh-preview.heyboss.live`
- Check no trailing spaces
- Verify SkillBoss deployment is still active

---

## Summary

| Step | Action | Time |
|------|--------|------|
| 1 | Configure DNS in Namecheap/Cloudflare | 5 min |
| 2 | Wait for propagation | 5-30 min |
| 3 | Test domain | 2 min |
| 4 | Verify SSL | 2 min |

**Recommended**: Use Cloudflare for better performance and free SSL.

**Easiest**: Use Namecheap DNS with CNAME + Redirect.

---

**Your domain will be live at: https://www.substop.tech 🚀**
