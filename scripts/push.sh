#!/usr/bin/env bash
# 一次性推送脚本：token 只出现在命令行参数里，不写入 .git/config、不落盘。
#
# 用法：
#   GITHUB_TOKEN=<你的 PAT> bash scripts/push.sh
set -euo pipefail

: "${GITHUB_TOKEN:?请通过环境变量提供 GITHUB_TOKEN（需要 repo 权限的 PAT）}"

REPO="https://github.com/desthon/desthon.github.io.git"
BRANCH="${BRANCH:-main}"

git push "https://x-access-token:${GITHUB_TOKEN}@github.com/desthon/desthon.github.io.git" "${BRANCH}:${BRANCH}"
echo "✅ 已推送到 ${REPO} (${BRANCH})"
echo "→ 如果这是首次推送，请到仓库 Settings → Pages 把 Source 设为 GitHub Actions。"
