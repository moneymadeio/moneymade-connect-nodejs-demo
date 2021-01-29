yarn --cwd web build
rm -dr ./server/public
cp -R ./web/build ./server/public

