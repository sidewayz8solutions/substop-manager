# Stripe Setup Guide for SubStop-Manager

## ⚠️ REQUIRED: Complete These Steps

### Step 1: Create Stripe Account
1. Go to https://stripe.com
2. Sign up for a free account
3. Complete verification (takes a few minutes)

### Step 2: Create Products & Prices

In your Stripe Dashboard:

**1. Create Monthly Subscription Product:**
- Products → Add product
- Name: "SubStop Complete - Monthly"
- Price: $9.99
- Billing: Recurring, Monthly
- Save and note the **Price ID** (looks like `price_1ABC...`)

**2. Create Lifetime Product:**
- Products → Add product  
- Name: "SubStop Lifetime"
- Price: $79.99
- Billing: One-time
- Save and note the **Price ID**

### Step 3: Get API Keys

In Stripe Dashboard:
- Developers → API keys
- Copy **Secret key** (starts with `sk_live_` or `sk_test_`)
- Copy **Publishable key** (starts with `pk_live_` or `pk_test_`)

### Step 4: Add Environment Variables to Vercel

Run these commands in your terminal:

```bash
# Set your actual Stripe keys
npx vercel env add STRIPE_SECRET_KEY
# Enter your secret key when prompted
# Select "Production" environment

npx vercel env add STRIPE_PRICE_MONTHLY  
# Enter the monthly price ID (price_1ABC...)
# Select "Production" environment

npx vercel env add STRIPE_PRICE_LIFETIME
# Enter the lifetime price ID (price_1ABC...)
# Select "Production" environment
```

### Step 5: Redeploy

```bash
cd ~/Desktop/substop-manager
npx vercel --prod
```

### Step 6: Test

1. Visit https://substop.tech
2. Click "Get Complete" or "Get Lifetime"
3. Should redirect to Stripe Checkout

---

## 🧪 Testing Mode (Recommended First)

Use Stripe's **Test Mode** first:
- Toggle "Test mode" ON in Stripe dashboard
- Use test API keys (start with `sk_test_`)
- Test card: `4242 4242 4242 4242`
- Any future date, any CVC, any ZIP

Once working, switch to Live mode and repeat with live keys.

---

## 🔗 Quick Reference

| What | Where |
|------|-------|
| Stripe Dashboard | https://dashboard.stripe.com |
| Test Card | 4242 4242 4242 4242 |
| Your Website | https://substop.tech |

---

## ❓ Need Help?

If you get stuck, the buttons will show "Coming Soon" modal until Stripe is configured.
