# 🌳 The Ultimate Git Branches Guide

> **A comprehensive guide to mastering Git branches - from beginner to professional workflows**

---

## 📑 Table of Contents

1. [What is a Branch?](#-what-is-a-branch)
2. [Why Do We Need Branches?](#-why-do-we-need-branches)
3. [Basic Branch Commands](#-basic-branch-commands)
4. [Creating Your First Branch](#-creating-your-first-branch)
5. [Switching Between Branches](#-switching-between-branches)
6. [Merging Branches](#-merging-branches)
7. [Handling Merge Conflicts](#-handling-merge-conflicts)
8. [Deleting Branches](#-deleting-branches)
9. [Remote Branches](#-remote-branches)
10. [Professional Branching Strategies](#-professional-branching-strategies)
    - [Git Flow](#1-git-flow)
    - [GitHub Flow](#2-github-flow)
    - [GitLab Flow](#3-gitlab-flow)
    - [Trunk-Based Development](#4-trunk-based-development)
11. [Best Practices](#-best-practices)
12. [Common Scenarios & Solutions](#-common-scenarios--solutions)
13. [Cheat Sheet](#-cheat-sheet)

---

## 🌿 What is a Branch?

A **branch** in Git is like a parallel universe for your code. It's an independent line of development that allows you to work on features, fixes, or experiments without affecting the main codebase.

### Visual Representation

```
        feature-branch
              ↓
        o---o---o
       /
o---o---o---o---o  ← main branch
             \
              o---o  ← bugfix-branch
```

### Key Concepts

| Term            | Description                                         |
| --------------- | --------------------------------------------------- |
| **Branch**      | A pointer to a specific commit                      |
| **HEAD**        | A pointer to the current branch you're working on   |
| **main/master** | The default primary branch                          |
| **Commit**      | A snapshot of your code at a specific point in time |

---

## 🤔 Why Do We Need Branches?

### 1. **Isolation of Work**

- Work on new features without breaking the main code
- Multiple developers can work simultaneously without conflicts

### 2. **Safe Experimentation**

- Try new ideas without risking the stable codebase
- Easy to discard experiments that don't work out

### 3. **Code Review Process**

- Create pull/merge requests for team review
- Ensure code quality before merging

### 4. **Release Management**

- Maintain different versions of your software
- Hotfix production issues while developing new features

### 5. **Collaboration**

- Team members can work on different features simultaneously
- Clear ownership of specific tasks

---

## 🔧 Basic Branch Commands

### Viewing Branches

```bash
# List all local branches
git branch

# List all branches (local and remote)
git branch -a

# List remote branches only
git branch -r

# Show branches with their last commit
git branch -v

# Show branches that have been merged into current branch
git branch --merged

# Show branches that haven't been merged
git branch --no-merged
```

### Creating Branches

```bash
# Create a new branch (but don't switch to it)
git branch <branch-name>

# Create and switch to a new branch
git checkout -b <branch-name>

# Modern way (Git 2.23+): Create and switch
git switch -c <branch-name>

# Create a branch from a specific commit
git branch <branch-name> <commit-hash>

# Create a branch from another branch
git checkout -b <new-branch> <source-branch>
```

### Switching Branches

```bash
# Switch to an existing branch
git checkout <branch-name>

# Modern way (Git 2.23+)
git switch <branch-name>

# Switch to the previous branch
git checkout -
git switch -
```

---

## 🚀 Creating Your First Branch

### Step-by-Step Example

```bash
# 1. Make sure you're on the main branch
git checkout main

# 2. Pull the latest changes
git pull origin main

# 3. Create and switch to a new feature branch
git checkout -b feature/user-authentication

# 4. Verify you're on the new branch
git branch
# Output:
#   main
# * feature/user-authentication

# 5. Make your changes and commit
git add .
git commit -m "Add user login functionality"

# 6. Push the branch to remote
git push -u origin feature/user-authentication
```

### Branch Naming Conventions

Good branch names are descriptive and follow a consistent pattern:

```bash
# Feature branches
feature/user-authentication
feature/shopping-cart
feature/payment-integration

# Bug fix branches
bugfix/login-error
bugfix/cart-calculation
fix/header-alignment

# Hotfix branches (urgent production fixes)
hotfix/security-vulnerability
hotfix/payment-crash

# Release branches
release/v1.0.0
release/2024-01-sprint

# Experimental branches
experiment/new-ui-framework
spike/performance-testing

# Personal branches (if needed)
dev/ahmed/user-profile
```

---

## 🔀 Switching Between Branches

### Basic Switching

```bash
# Switch to main branch
git checkout main
# or
git switch main

# Switch to a feature branch
git checkout feature/user-authentication
# or
git switch feature/user-authentication
```

### What Happens When You Switch?

1. Git updates your working directory to match the branch
2. HEAD pointer moves to the new branch
3. Your staged changes (if any) come with you
4. Uncommitted changes might conflict (Git will warn you)

### Handling Uncommitted Changes

```bash
# Option 1: Stash your changes
git stash
git checkout other-branch
# ... do work ...
git checkout original-branch
git stash pop

# Option 2: Commit your changes first
git add .
git commit -m "WIP: Save progress"
git checkout other-branch

# Option 3: Discard changes (careful!)
git checkout -- .
git checkout other-branch
```

### Stash Commands Deep Dive

```bash
# Save current changes to stash
git stash

# Save with a description
git stash save "Working on login feature"

# List all stashes
git stash list

# Apply most recent stash (keep in stash list)
git stash apply

# Apply and remove from stash list
git stash pop

# Apply a specific stash
git stash apply stash@{2}

# Drop a specific stash
git stash drop stash@{0}

# Clear all stashes
git stash clear
```

---

## 🔗 Merging Branches

### Types of Merges

#### 1. Fast-Forward Merge

When the target branch has no new commits since the source branch was created:

```
Before:
main:     A---B
               \
feature:        C---D

After (fast-forward):
main:     A---B---C---D
```

```bash
git checkout main
git merge feature/user-auth
# Fast-forward merge happens automatically
```

#### 2. Three-Way Merge (Merge Commit)

When both branches have new commits:

```
Before:
main:     A---B---E---F
               \
feature:        C---D

After (merge commit):
main:     A---B---E---F---G (merge commit)
               \       /
feature:        C---D-/
```

```bash
git checkout main
git merge feature/user-auth
# Creates a merge commit
```

#### 3. Squash Merge

Combine all commits from a branch into one:

```bash
git checkout main
git merge --squash feature/user-auth
git commit -m "Add user authentication feature"
```

### Merge Commands

```bash
# Basic merge
git checkout main
git merge feature-branch

# Merge with a commit message
git merge feature-branch -m "Merge feature: user authentication"

# Merge without fast-forward (always create merge commit)
git merge --no-ff feature-branch

# Abort a merge in progress
git merge --abort

# Continue merge after resolving conflicts
git merge --continue
```

---

## ⚠️ Handling Merge Conflicts

### What is a Merge Conflict?

A conflict occurs when Git can't automatically merge changes because the same lines were modified in both branches.

### Conflict Markers

```javascript
<<<<<<< HEAD
// This is your current branch's code
const greeting = "Hello, World!";
=======
// This is the incoming branch's code
const greeting = "Hi, Universe!";
>>>>>>> feature-branch
```

### Resolving Conflicts Step-by-Step

```bash
# 1. Start the merge
git checkout main
git merge feature-branch
# CONFLICT message appears

# 2. See which files have conflicts
git status

# 3. Open conflicted files and resolve manually
# Remove conflict markers and keep the code you want

# 4. After resolving, stage the files
git add <resolved-file>

# 5. Complete the merge
git commit -m "Merge feature-branch, resolve conflicts"
```

### VS Code Conflict Resolution

VS Code provides a visual interface for resolving conflicts:

- **Accept Current Change**: Keep your branch's version
- **Accept Incoming Change**: Keep the other branch's version
- **Accept Both Changes**: Keep both versions
- **Compare Changes**: See side-by-side diff

### Tips for Avoiding Conflicts

1. **Pull frequently**: Keep your branch up to date with main
2. **Small branches**: Smaller changes = fewer conflicts
3. **Communicate**: Let team know what files you're working on
4. **Rebase often**: Keep your branch's history clean

```bash
# Keep your feature branch updated
git checkout feature-branch
git fetch origin
git rebase origin/main
```

---

## 🗑️ Deleting Branches

### Local Branch Deletion

```bash
# Delete a merged branch
git branch -d feature-branch

# Force delete (even if not merged)
git branch -D feature-branch

# Delete multiple branches
git branch -d branch1 branch2 branch3
```

### Remote Branch Deletion

```bash
# Delete a remote branch
git push origin --delete feature-branch

# Alternative syntax
git push origin :feature-branch
```

### Cleanup: Prune Stale Branches

```bash
# Remove local references to deleted remote branches
git fetch --prune

# Or set it to happen automatically
git config --global fetch.prune true

# See which branches would be pruned
git remote prune origin --dry-run
```

---

## 🌐 Remote Branches

### Understanding Remote Branches

Remote branches are references to the state of branches on your remote repositories.

```bash
# Format: <remote>/<branch>
origin/main
origin/feature-branch
upstream/develop
```

### Working with Remote Branches

```bash
# Fetch all remote branches
git fetch origin

# Fetch a specific branch
git fetch origin feature-branch

# List remote branches
git branch -r

# Create local branch from remote
git checkout -b feature-branch origin/feature-branch

# Or simply (Git will track automatically)
git checkout feature-branch

# Push a new branch to remote
git push -u origin feature-branch

# Set upstream for existing branch
git branch --set-upstream-to=origin/feature-branch feature-branch
```

### Tracking Branches

```bash
# See which branches track which remotes
git branch -vv

# Output example:
#   main                  abc1234 [origin/main] Latest commit
# * feature-auth          def5678 [origin/feature-auth: ahead 2] Add login
#   bugfix-cart           ghi9012 [origin/bugfix-cart: behind 1] Fix cart
```

---

## 🏢 Professional Branching Strategies

### 1. Git Flow

The most structured and widely-used branching model, ideal for projects with scheduled releases.

#### Branch Types

| Branch      | Purpose             | Created From | Merges Into    |
| ----------- | ------------------- | ------------ | -------------- |
| `main`      | Production code     | -            | -              |
| `develop`   | Integration branch  | main         | main           |
| `feature/*` | New features        | develop      | develop        |
| `release/*` | Release preparation | develop      | main & develop |
| `hotfix/*`  | Production fixes    | main         | main & develop |

#### Visual Flow

```
main       ──●─────────────────●─────────────●──────────●──
             │                 ↑             ↑          ↑
             │                 │             │          │
hotfix       │                 │             │      ●───●
             │                 │             │     /
release      │             ●───●─────────────●────/
             │            /    │
develop   ───●───●───●───●─────●───●───●───●───●───●───●──
              \   \     /           \     /
feature        ●───●───●             ●───●
```

#### Commands for Git Flow

```bash
# Initialize Git Flow (if using git-flow extension)
git flow init

# Start a new feature
git checkout develop
git checkout -b feature/user-profile

# Finish a feature
git checkout develop
git merge --no-ff feature/user-profile
git branch -d feature/user-profile

# Start a release
git checkout develop
git checkout -b release/v1.0.0

# Finish a release
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"
git checkout develop
git merge --no-ff release/v1.0.0
git branch -d release/v1.0.0

# Start a hotfix
git checkout main
git checkout -b hotfix/critical-bug

# Finish a hotfix
git checkout main
git merge --no-ff hotfix/critical-bug
git tag -a v1.0.1 -m "Hotfix 1.0.1"
git checkout develop
git merge --no-ff hotfix/critical-bug
git branch -d hotfix/critical-bug
```

#### When to Use Git Flow

✅ **Good for:**

- Projects with scheduled release cycles
- Multiple versions in production
- Teams that need strict processes
- Software with long development cycles

❌ **Not ideal for:**

- Continuous deployment
- Small teams or solo projects
- Web applications with frequent updates

---

### 2. GitHub Flow

A simpler, more streamlined approach perfect for continuous deployment.

#### The Flow

1. Create a branch from `main`
2. Add commits
3. Open a Pull Request
4. Discuss and review code
5. Deploy for testing (optional)
6. Merge to `main`
7. Deploy to production

#### Visual Flow

```
main     ──●───●───────●───────●───●───────●──
            \         ↗       /   \       /
feature-1    ●───●───●       /     \     /
                            /       \   /
feature-2                  ●───●─────●─/
```

#### Commands for GitHub Flow

```bash
# 1. Create a branch
git checkout main
git pull origin main
git checkout -b feature/new-feature

# 2. Make changes and commit
git add .
git commit -m "Add new feature"

# 3. Push to remote
git push -u origin feature/new-feature

# 4. Create Pull Request on GitHub
# (done via GitHub UI or CLI)
gh pr create --title "Add new feature" --body "Description here"

# 5. After approval, merge via GitHub UI
# or via command line:
git checkout main
git pull origin main
git merge feature/new-feature
git push origin main

# 6. Delete the branch
git branch -d feature/new-feature
git push origin --delete feature/new-feature
```

#### When to Use GitHub Flow

✅ **Good for:**

- Continuous deployment
- Web applications
- Small to medium teams
- Projects that need simplicity

❌ **Not ideal for:**

- Multiple production versions
- Scheduled releases
- Complex release processes

---

### 3. GitLab Flow

A middle ground between Git Flow and GitHub Flow, with environment branches.

#### Branch Types

```
production ──●─────────────●─────────────●──
             ↑             ↑             ↑
staging    ──●───●─────────●───●─────────●──
             ↑   ↑         ↑   ↑
main       ──●───●───●─────●───●───●─────●──
              \     /           \   /
feature        ●───●             ●─●
```

#### Environment Branches

| Branch       | Environment | Purpose                |
| ------------ | ----------- | ---------------------- |
| `main`       | Development | Latest code            |
| `staging`    | Staging     | Pre-production testing |
| `production` | Production  | Live code              |

#### Commands for GitLab Flow

```bash
# Feature development
git checkout main
git checkout -b feature/new-feature
# ... make changes ...
git push -u origin feature/new-feature
# Create Merge Request to main

# After merge to main, deploy to staging
git checkout staging
git merge main
git push origin staging
# Triggers staging deployment

# After testing, deploy to production
git checkout production
git merge staging
git push origin production
# Triggers production deployment
```

#### When to Use GitLab Flow

✅ **Good for:**

- Teams needing environment-based deployments
- Projects requiring staging environments
- Balance between simplicity and control

---

### 4. Trunk-Based Development

All developers work on a single branch (trunk/main) with very short-lived feature branches.

#### The Philosophy

- Keep branches extremely short-lived (hours, not days)
- Merge to main frequently (at least daily)
- Use feature flags to hide incomplete features
- Continuous integration is essential

#### Visual Flow

```
main  ──●───●───●───●───●───●───●───●───●───●──
         \↗   \↗       \↗   \↗
          ●     ●       ●     ●
        (very short-lived branches)
```

#### Commands for Trunk-Based Development

```bash
# Start work (branch lives for hours, not days)
git checkout main
git pull origin main
git checkout -b feature/small-change

# Make small, focused changes
git add .
git commit -m "Add button component"

# Push and create PR immediately
git push -u origin feature/small-change

# Merge quickly (same day ideally)
git checkout main
git pull origin main
git merge feature/small-change
git push origin main

# Delete branch immediately
git branch -d feature/small-change
git push origin --delete feature/small-change
```

#### Feature Flags Example

```javascript
// Use feature flags to hide incomplete features
const FEATURES = {
  newCheckout: process.env.FEATURE_NEW_CHECKOUT === "true",
  darkMode: process.env.FEATURE_DARK_MODE === "true",
};

function CheckoutPage() {
  if (FEATURES.newCheckout) {
    return <NewCheckout />;
  }
  return <OldCheckout />;
}
```

#### When to Use Trunk-Based Development

✅ **Good for:**

- High-performing teams
- Continuous deployment
- Teams with strong CI/CD
- Microservices architecture

❌ **Not ideal for:**

- Junior teams
- Projects without good test coverage
- Long feature development cycles

---

## 📋 Best Practices

### 1. Branch Naming

```bash
# Use prefixes
feature/  - New features
bugfix/   - Bug fixes
hotfix/   - Urgent production fixes
release/  - Release preparation
docs/     - Documentation updates
refactor/ - Code refactoring
test/     - Test additions

# Use lowercase and hyphens
✅ feature/user-authentication
❌ Feature/UserAuthentication
❌ feature/user_authentication

# Be descriptive but concise
✅ feature/add-payment-gateway
❌ feature/payment
❌ feature/add-the-new-payment-gateway-for-processing-credit-cards
```

### 2. Commit Messages

```bash
# Format
<type>(<scope>): <subject>

<body>

<footer>

# Types
feat:     New feature
fix:      Bug fix
docs:     Documentation
style:    Formatting (no code change)
refactor: Code restructuring
test:     Adding tests
chore:    Maintenance tasks

# Examples
feat(auth): add login functionality

- Add login form component
- Implement JWT authentication
- Add remember me feature

Closes #123
```

### 3. Keep Branches Small

```bash
# Bad: Giant branch with weeks of work
feature/complete-user-module
  - 50 files changed
  - 3000 lines added
  - 3 weeks of work

# Good: Small, focused branches
feature/user-registration      # 2-3 days
feature/user-login            # 1-2 days
feature/user-profile          # 2-3 days
feature/user-password-reset   # 1 day
```

### 4. Regular Integration

```bash
# Update your branch regularly
git checkout feature-branch
git fetch origin
git rebase origin/main

# Or merge main into your branch
git merge origin/main
```

### 5. Clean Up After Yourself

```bash
# After PR is merged, delete branches
git branch -d feature/completed-feature
git push origin --delete feature/completed-feature

# Regularly prune stale branches
git fetch --prune
```

### 6. Protect Important Branches

Configure branch protection rules in GitHub/GitLab:

- ✅ Require pull request reviews
- ✅ Require status checks to pass
- ✅ Require branches to be up to date
- ✅ Restrict who can push
- ✅ Require signed commits (for sensitive projects)

---

## 🔧 Common Scenarios & Solutions

### Scenario 1: Wrong Branch

You made commits on the wrong branch:

```bash
# Save your commits
git log --oneline -n 3  # Note the commit hashes

# Switch to correct branch
git checkout correct-branch

# Cherry-pick the commits
git cherry-pick <commit-hash>

# Remove commits from wrong branch
git checkout wrong-branch
git reset --hard HEAD~3  # Remove last 3 commits
```

### Scenario 2: Need Changes from Another Branch

```bash
# Option 1: Cherry-pick specific commits
git cherry-pick <commit-hash>

# Option 2: Merge the entire branch
git merge other-branch

# Option 3: Rebase onto the branch
git rebase other-branch
```

### Scenario 3: Undo a Merge

```bash
# If not pushed yet
git reset --hard HEAD~1

# If already pushed (creates revert commit)
git revert -m 1 <merge-commit-hash>
```

### Scenario 4: Update Branch with Main (Rebase vs Merge)

```bash
# Option 1: Merge (preserves history, creates merge commit)
git checkout feature-branch
git merge main

# Option 2: Rebase (linear history, rewrites commits)
git checkout feature-branch
git rebase main

# If rebase has conflicts
git rebase --continue  # after resolving
git rebase --abort     # to cancel
```

### Scenario 5: Accidentally Deleted a Branch

```bash
# Find the last commit of the deleted branch
git reflog

# Recreate the branch
git checkout -b recovered-branch <commit-hash>
```

### Scenario 6: Work in Progress - Need to Switch Branches

```bash
# Option 1: Stash
git stash
git checkout other-branch
# ... do work ...
git checkout original-branch
git stash pop

# Option 2: WIP Commit
git add .
git commit -m "WIP: description"
git checkout other-branch
# ... do work ...
git checkout original-branch
# Continue working, then amend or squash later
```

### Scenario 7: Squash Commits Before Merge

```bash
# Interactive rebase to squash last 5 commits
git rebase -i HEAD~5

# In the editor, change 'pick' to 'squash' (or 's')
pick abc1234 First commit
squash def5678 Second commit
squash ghi9012 Third commit
squash jkl3456 Fourth commit
squash mno7890 Fifth commit

# Save and edit the combined commit message
```

---

## 📝 Cheat Sheet

### Quick Reference

```bash
# === VIEWING ===
git branch                    # List local branches
git branch -a                 # List all branches
git branch -v                 # Branches with last commit

# === CREATING ===
git branch <name>             # Create branch
git checkout -b <name>        # Create and switch
git switch -c <name>          # Create and switch (modern)

# === SWITCHING ===
git checkout <name>           # Switch to branch
git switch <name>             # Switch (modern)
git checkout -                # Switch to previous branch

# === MERGING ===
git merge <branch>            # Merge branch into current
git merge --no-ff <branch>    # Merge with commit
git merge --squash <branch>   # Squash merge
git merge --abort             # Cancel merge

# === DELETING ===
git branch -d <name>          # Delete merged branch
git branch -D <name>          # Force delete branch
git push origin --delete <n>  # Delete remote branch

# === REMOTE ===
git fetch origin              # Fetch remote branches
git push -u origin <name>     # Push new branch
git pull origin <name>        # Pull remote branch

# === REBASING ===
git rebase <branch>           # Rebase onto branch
git rebase -i HEAD~n          # Interactive rebase
git rebase --continue         # Continue after conflict
git rebase --abort            # Cancel rebase

# === STASHING ===
git stash                     # Stash changes
git stash pop                 # Apply and remove stash
git stash list                # List stashes
git stash drop                # Remove stash

# === RECOVERY ===
git reflog                    # Show reference log
git cherry-pick <hash>        # Apply specific commit
```

### Branch Strategy Decision Tree

```
Do you have scheduled releases?
├── Yes → Do you need multiple production versions?
│         ├── Yes → Use Git Flow
│         └── No → Use GitLab Flow
└── No → Do you deploy continuously?
          ├── Yes → Is your team experienced?
          │         ├── Yes → Use Trunk-Based Development
          │         └── No → Use GitHub Flow
          └── No → Use GitHub Flow
```

---

## 🎓 Learning Exercises

### Exercise 1: Basic Branching

```bash
# Create a new repository
mkdir git-practice && cd git-practice
git init

# Create initial commit
echo "# My Project" > README.md
git add README.md
git commit -m "Initial commit"

# Create and switch to a feature branch
git checkout -b feature/add-about

# Make changes
echo "## About" >> README.md
git add README.md
git commit -m "Add about section"

# Switch back and merge
git checkout main
git merge feature/add-about

# Delete the feature branch
git branch -d feature/add-about
```

### Exercise 2: Handling Conflicts

```bash
# Create two branches that will conflict
git checkout -b branch-a
echo "Hello from A" > greeting.txt
git add greeting.txt
git commit -m "Add greeting from A"

git checkout main
git checkout -b branch-b
echo "Hello from B" > greeting.txt
git add greeting.txt
git commit -m "Add greeting from B"

# Merge branch-a into main
git checkout main
git merge branch-a

# Try to merge branch-b (will conflict)
git merge branch-b

# Resolve the conflict manually, then:
git add greeting.txt
git commit -m "Merge branch-b, resolve conflict"
```

### Exercise 3: Git Flow Simulation

```bash
# Setup
git checkout -b develop

# Feature work
git checkout -b feature/user-login develop
echo "Login feature" > login.txt
git add . && git commit -m "Add login"
git checkout develop
git merge --no-ff feature/user-login

# Release
git checkout -b release/v1.0.0 develop
echo "v1.0.0" > version.txt
git add . && git commit -m "Bump version"
git checkout main
git merge --no-ff release/v1.0.0
git tag -a v1.0.0 -m "Version 1.0.0"
git checkout develop
git merge --no-ff release/v1.0.0
```

---

## 📚 Additional Resources

### Official Documentation

- [Git Documentation - Branching](https://git-scm.com/book/en/v2/Git-Branching-Branches-in-a-Nutshell)
- [GitHub Flow Guide](https://guides.github.com/introduction/flow/)
- [GitLab Flow](https://docs.gitlab.com/ee/topics/gitlab_flow.html)

### Interactive Learning

- [Learn Git Branching](https://learngitbranching.js.org/) - Visual interactive tutorial
- [Git Immersion](https://gitimmersion.com/) - Hands-on exercises
- [Atlassian Git Tutorials](https://www.atlassian.com/git/tutorials)

### Tools

- [Git Graph](https://marketplace.visualstudio.com/items?itemName=mhutchie.git-graph) - VS Code extension
- [GitKraken](https://www.gitkraken.com/) - Visual Git client
- [Sourcetree](https://www.sourcetreeapp.com/) - Free Git GUI

---

## 🏁 Conclusion

Mastering Git branches is essential for modern software development. Remember:

1. **Start simple** - Use GitHub Flow until you need more complexity
2. **Be consistent** - Pick a strategy and stick to it
3. **Communicate** - Make sure your team understands the workflow
4. **Practice** - The more you use branches, the more natural it becomes

> "The best branching strategy is the one your team actually follows."

---

**Happy Branching! 🌳**

_Created for the Upskilling JS Bootcamp - Cohort 9_
