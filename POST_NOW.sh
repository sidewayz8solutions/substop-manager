#!/bin/bash
# SubStop Manager Launch Execution Script
# https://substop.tech

echo "🚀 SUBSTOP MANAGER LAUNCH EXECUTION"
echo "===================================="
echo ""
echo "Website: https://substop.tech"
echo "Status: LIVE"
echo ""

# Check if website is live
echo "Checking website..."
STATUS=$(curl -s -o /dev/null -w "%{http_code}" https://substop.tech)
if [ "$STATUS" = "200" ] || [ "$STATUS" = "307" ]; then
    echo "✅ https://substop.tech is LIVE ($STATUS)"
else
    echo "⚠️  Website returned status $STATUS"
fi
echo ""

# Show today's schedule
echo "📅 TODAY'S POSTING SCHEDULE"
echo "==========================="
echo ""
echo "9:00 AM  - TikTok Video #1: 'I built a privacy-first subscription tracker'"
echo "10:00 AM - Twitter Thread (8 tweets)"
echo "11:00 AM - Reddit r/personalfinance"
echo ""
echo "1:00 PM  - TikTok Video #2: 'I found $847 in subscriptions'"
echo "2:00 PM  - LinkedIn Post"
echo "3:00 PM  - TikTok Video #3: 'Your finance app knows too much'"
echo "4:00 PM  - Instagram Story + Post"
echo ""
echo "6:00 PM  - Email Blast"
echo "7:00 PM  - Product Hunt Launch"
echo ""

# Show tracking links
echo "📊 TRACKING LINKS"
echo "================="
echo ""
echo "TikTok Bio:"
echo "https://substop.tech?utm_source=tiktok&utm_medium=social&utm_campaign=launch"
echo ""
echo "Twitter:"
echo "https://substop.tech?utm_source=twitter&utm_medium=social&utm_campaign=launch"
echo ""
echo "Reddit:"
echo "https://substop.tech?utm_source=reddit&utm_medium=social&utm_campaign=launch"
echo ""
echo "LinkedIn:"
echo "https://substop.tech?utm_source=linkedin&utm_medium=social&utm_campaign=launch"
echo ""

# Show content files
echo "✍️  CONTENT READY"
echo "================"
echo ""
echo "TikTok Scripts:"
ls -1 ~/Desktop/substop-manager/content/tiktok/
echo ""
echo "Twitter Thread:"
ls -1 ~/Desktop/substop-manager/content/twitter/
echo ""
echo "Email Sequence:"
ls -1 ~/Desktop/substop-manager/content/email/
echo ""

# Show goals
echo "🎯 TODAY'S GOALS"
echo "==============="
echo ""
echo "Hour 1:"
echo "  • 1,000 TikTok views"
echo "  • 50 Twitter engagements"
echo "  • 100 website visits"
echo ""
echo "Day 1:"
echo "  • 10,000 TikTok views"
echo "  • 1,000 website visits"
echo "  • 100 signups"
echo "  • 10 paid conversions"
echo ""

# Action items
echo "⚡ ACTION ITEMS"
echo "=============="
echo ""
echo "1. OPEN YOUR PHONE"
echo "2. RECORD TIKTOK #1 NOW"
echo "3. USE THIS SCRIPT:"
echo ""
echo "   Hook: 'I built a privacy-first subscription tracker 🛡️'"
echo "   Script: See LAUNCH_EXECUTION.md for full script"
echo "   CTA: 'Link in bio'"
echo ""
echo "4. POST IT"
echo "5. PIN COMMENT: 'Link → https://substop.tech'"
echo "6. REPLY TO EVERY COMMENT"
echo ""
echo "THEN MOVE TO TWITTER THREAD"
echo ""

# Offer to open files
echo "📁 FILES AVAILABLE"
echo "=================="
echo ""
echo "LAUNCH_EXECUTION.md - Full posting schedule"
echo "content/tiktok/launch-scripts.json - TikTok scripts"
echo "content/twitter/launch-thread.txt - Twitter thread"
echo "content/email/welcome-sequence.md - Email templates"
echo ""

echo "🚀 GO POST YOUR FIRST TIKTOK NOW!"
echo "=================================="
echo ""
echo "Time to execute. No more planning. POST!"
echo ""
