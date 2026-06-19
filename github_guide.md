# GitHub Account & Git Commit Guide

This guide will walk you through setting up your GitHub account, installing Git on Windows, and committing/pushing your code step-by-step.

---

## Part 1: Creating a GitHub Account

1. Open your web browser and go to [github.com](https://github.com).
2. Click the **Sign up** button in the top right corner.
3. Enter your email address and click **Continue**.
4. Create a secure password and click **Continue**.
5. Enter a unique username (this will be part of your profile URL) and click **Continue**.
6. Select your preferences for receiving updates, then solve the verification puzzle (CAPTCHA) to verify you are human.
7. Click **Create account**.
8. Check your email for a verification code, enter it on GitHub, and your account will be active!

---

## Part 2: Installing Git on Windows

To manage your repositories locally and push code, you need the Git command-line tool.

1. Go to [git-scm.com/download/win](https://git-scm.com/download/win).
2. Click **Click here to download** to download the latest 64-bit Git for Windows installer.
3. Open the downloaded `.exe` installer.
4. Click **Next** on all prompts to accept the default settings (these are optimal for most users).
5. Click **Install**.
6. Once completed, search for **Git Bash** in your Windows Start Menu and open it, or open **PowerShell** to verify it is installed:
   ```powershell
   git --version
   ```

---

## Part 3: Configuring Git

Before making any commits, tell Git who you are. Open **PowerShell** or **Git Bash** and run:

```powershell
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```
*(Replace `"Your Name"` and `"your.email@example.com"` with your actual name and the email you used to register on GitHub.)*

---

## Part 4: Creating a GitHub Repository

1. Log in to [github.com](https://github.com).
2. In the upper-right corner of any page, click the **+** dropdown menu, and select **New repository**.
3. Name your repository `afe-projects`.
4. Add a brief description (optional).
5. Choose **Public** (required if you want to deploy using free GitHub Pages).
6. **Do NOT** check "Add a README file", "Add .gitignore", or "Choose a license" (since we are importing an existing folder).
7. Click **Create repository**.
8. Copy the repository URL (e.g., `https://github.com/your-username/afe-projects.git`).

---

## Part 5: Committing and Pushing Your Code

To upload your projects, follow these terminal steps.
Open a terminal in the folder containing your projects (`C:\Users\apexm\.gemini\antigravity\scratch\afe_projects`).

1. **Initialize a local Git repository**:
   ```powershell
   git init
   ```

2. **Add all project files to staging**:
   ```powershell
   git add .
   ```

3. **Create the initial commit**:
   ```powershell
   git commit -m "Initial commit of AFE projects"
   ```

4. **Set the main branch**:
   ```powershell
   git branch -M main
   ```

5. **Link your local repository to GitHub**:
   ```powershell
   git remote add origin https://github.com/YOUR_USERNAME/afe-projects.git
   ```
   *(Replace with the URL you copied in Part 4)*

6. **Push your code to GitHub**:
   ```powershell
   git push -u origin main
   ```

7. **Authentication Prompt**:
   * A pop-up dialog will appear asking you to log in to GitHub to authorize the push.
   * Click **Sign in with your browser** and follow the browser instructions.
   * Once authenticated, your terminal will upload the code!

---

## Part 6: Deploying Your Sites (Live Links)

Since you chose a **Public** repository, you can host your Portfolio and News sites for free on **GitHub Pages**:

1. On GitHub, navigate to your `afe-projects` repository.
2. Click on the **Settings** tab.
3. In the left-hand sidebar, under "Code and automation", click **Pages**.
4. Under "Build and deployment", set the Source to **Deploy from a branch**.
5. Under "Branch", select `main` and `/ (root)` folder, then click **Save**.
6. Wait 1–2 minutes. Refresh the page, and you will see a banner at the top of the Pages settings stating:
   * `"Your site is live at https://your-username.github.io/afe-projects/"`
7. You can now access your sites:
   * Portfolio website: `https://your-username.github.io/afe-projects/portfolio/`
   * News website: `https://your-username.github.io/afe-projects/news/`
