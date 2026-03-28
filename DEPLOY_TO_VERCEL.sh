#!/bin/bash
# Deploy SubStop-Manager to Vercel via GitHub

echo "🚀 SUBSTOP-MANAGER → VERCEL DEPLOYMENT"
echo "======================================"
echo ""

# Check if git is installed
if ! command -v git &> /dev/null; then
    echo "❌ Git is not installed. Please install Git first:"
    echo "   https://git-scm.com/downloads"
    exit 1
fi

# Navigate to the repo folder
cd ~/Desktop/MarketingMaster/substop-manager/github-repo

echo "📁 Repository location:"
pwd
echo ""

echo "📋 Files ready to deploy:"
ls -la
echo ""

echo "📝 Next Steps:"
echo "=============="
echo ""
echo "1. Create a GitHub repository:"
echo "   → Go to https://github.com/new"
echo "   → Name: substop-manager"
echo "   → Create repository"
echo ""

echo "2. Get your repository URL:"
echo "   → Copy the HTTPS URL (e.g., https://github.com/YOURNAME/substop-manager.git)"
echo ""

echo "3. Run these commands:"
echo ""
echo "   cd ~/Desktop/MarketingMaster/substop-manager/github-repo"
echo "   git init"
echo "   git add ."
echo "   git commit -m 'Initial landing page'"
echo "   git remote add origin https://github.com/YOURNAME/substop-manager.git"
echo "   git branch -M main"
echo "   git push -u origin main"
echo ""

echo "4. Deploy to Vercel:"
echo "   → Go to https://vercel.com"
echo "   → Sign in with GitHub"
echo "   → Click 'Add New Project'"
echo "   → Import 'substop-manager'"
echo "   → Click 'Deploy'"
echo ""

echo "5. Add custom domain:"
echo "   → In Vercel project, go to Settings → Domains"
echo "   → Add: substop.tech"
echo "   → Follow Vercel's DNS instructions"
echo ""

echo "✨ Your site will be live at: https://substop.tech"
echo ""

# Offer to initialize git
echo "Initialize git repository now? (y/n)"
read -r response

if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
    git init
    git add .
    git commit -m "Initial landing page"
    echo ""
    echo "✅ Git repository initialized!"
    echo ""
    echo "Now go to https://github.com/new and create 'substop-manager' repository"
    echo "Then run: git remote add origin https://github.com/YOURNAME/substop-manager.git"
    echo "And: git push -u origin main"
else
    echo ""
    echo "OK! Follow the manual steps above when you're ready."
fi

echo ""
echo "📖 Full guide available at: VERCEL_DEPLOYMENT.md"
