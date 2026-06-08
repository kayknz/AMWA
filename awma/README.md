# AMWA Website Deployment

This project is a static HTML website for the African Muslim Women's Association.

## Recommended Deployment Options

### Option 1: GitHub Pages
1. Install Git: https://git-scm.com/downloads
2. Create a GitHub repository.
3. In this folder, run:
   ```bash
   git init
   git add .
   git commit -m "Initial AMWA website"
   git branch -M main
   git remote add origin https://github.com/<your-username>/<your-repo>.git
   git push -u origin main
   ```
4. Enable GitHub Pages in the repository settings and use the `main` branch.
5. Your site will be available at `https://<your-username>.github.io/<your-repo>/`.

### Option 2: Netlify
1. Sign up at https://app.netlify.com/
2. Click "New site from Git" and connect your GitHub repository.
3. Set the build command to none and the publish directory to `/` or leave blank.
4. Deploy the site.

### Option 3: Vercel
1. Sign up at https://vercel.com/
2. Import the project from GitHub.
3. Choose the project and deploy.

## If You Prefer a Direct Upload
- Netlify also supports drag-and-drop deployment for static sites.
- On the Netlify dashboard, choose "Sites" → "Add new site" → "Deploy manually" and drop the project folder.

## Notes
- The site is purely static, so any static hosting service will work.
- If you want, I can help you set up the GitHub repo once Git is installed.
