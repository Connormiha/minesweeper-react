# /usr/bin/env bash

npm run build:gh
git checkout gh-pages
rm -fr static index.html 404.html
cp build/index.html ./
cp index.html 404.html
name="${PWD##*/}"
cp -R build/"${name}"/* ./
git add .
git commit -m "Update build :arrow_up:" --no-verify
git push origin gh-pages --no-verify