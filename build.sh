rm -rf build
mkdir build
cp -R libs build/libs
./node_modules/.bin/webpack --progress --colors