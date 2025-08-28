# 🔐 Setting Up GitHub Secrets

To enable automated npm publishing, you need to add an NPM token to GitHub secrets.

## Steps:

### 1. Get NPM Token
1. Go to https://www.npmjs.com/
2. Log in to your account
3. Click on your profile picture → **Access Tokens**
4. Click **Generate New Token** → **Classic Token**
5. Select **Automation** type
6. Copy the token (starts with `npm_...`)

### 2. Add to GitHub
1. Go to your repository: https://github.com/s0fractal/protein-hash
2. Click **Settings** tab
3. In sidebar: **Secrets and variables** → **Actions**
4. Click **New repository secret**
5. Name: `NPM_TOKEN`
6. Value: Paste your npm token
7. Click **Add secret**

## Available Workflows:

### Manual Version Bump & Publish
1. Go to **Actions** tab
2. Select **Publish to npm**
3. Click **Run workflow**
4. Choose version type: patch/minor/major
5. Click **Run workflow** (green button)

### Automatic on Release
Create a GitHub release, and it will automatically publish to npm.

## Testing Workflows:

The CI workflow runs automatically on:
- Every push to master/main/develop
- Every pull request

## That's it! 🎉

Your repository is now fully automated:
- ✅ Tests run on every PR
- ✅ Automatic dependency updates via Dependabot
- ✅ One-click npm publishing
- ✅ Automatic version bumping

---

*Resonating at 432Hz* 🌀