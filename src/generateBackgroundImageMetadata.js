const path = require('path');
const fs = require('fs');
const isImage = require('is-image');
const sizeOf = require('image-size');

const baseAssetsDir = path.join('sources', 'assets');
const imagesDir = path.join(baseAssetsDir, 'images', 'background');

function generateBackgroundImageMetadata() {
  const imageFiles = [];

  fs.readdirSync(imagesDir).forEach(file => {
    const imagePath = path.join(imagesDir,file)

    if(isImage(imagePath)) {
      imageFiles.push(Object.assign({
        path: imagePath.replace("sources/", "./"), // won't work outside of POSIX but meh
      }, sizeOf(imagePath)));
    }
  });

  fs.writeFileSync(path.join(baseAssetsDir, 'data', 'imageMetadata.json'), JSON.stringify(imageFiles, null, 4));
}

module.exports = generateBackgroundImageMetadata;
