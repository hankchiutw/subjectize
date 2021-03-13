#!/bin/bash
#
# Publish to npm
#
## Usage: publish.sh
## 

set -euo pipefail

usage() {
  [ "$*" ] && echo "$0: $*"
  sed -n '/^##/,/^$/s/^## \{0,1\}//p' "$0"
  exit 2
} 2>/dev/null

REPO_DIR="$(cd $(dirname $0)/..; pwd)"
DIST_DIR=${REPO_DIR}/dist

# copy non-src files for publish
FILES_TO_COPY=(
${REPO_DIR}/LICENSE
${REPO_DIR}/package.json
${REPO_DIR}/README.md
)

for file in "${FILES_TO_COPY[@]}"; do
  cp ${file} ${DIST_DIR}
done

# generate *.d.ts files
yarn tsc --emitDeclarationOnly --outDir ${DIST_DIR}

# publish to npm
cd ${DIST_DIR}
npm publish
