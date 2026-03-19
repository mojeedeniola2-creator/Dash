# Dash — Setup & Deploy Guide

## Step 1 — Install dependencies
Open this folder in your terminal and run:
```
npm install
```

## Step 2 — Test locally (optional)
```
npm run dev
```
Then open http://localhost:5173 in your browser.

## Step 3 — Push to GitHub
Run these one by one:
```
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/mojeedeniola2-creator/Dash.git
git push -u origin main
```

When asked to log in, use your GitHub username and Personal Access Token as the password.

## Step 4 — Deploy on Vercel
1. Go to vercel.com — sign up with GitHub
2. Click "Add New Project"
3. Select your Dash repo
4. Click Deploy — done!

Your live URL will be:
https://dash-mojeedeniola2-creator.vercel.app
