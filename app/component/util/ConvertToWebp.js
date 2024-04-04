const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const convertToWebp = async () => {
  const inputDirectory = path.join(__dirname, '..', '..', '..', 'public');
  const outputDirectory = path.join(__dirname, '..', '..', '..', 'public', "imageWebp");
  const outputThumbnailDirectory = path.join(
    __dirname, '..', '..', '..', 'public',
    "thumbnailWebp"
  );

  const fileNames = fs.readdirSync(inputDirectory);

  const supportedFormats = ['.jpg', '.jpeg', '.png'];

  const supportedFileNames = fileNames.filter(fileName => {
      const ext = path.extname(fileName).toLowerCase();
      return supportedFormats.includes(ext);
  });


  await Promise.all(
    supportedFileNames.map(async (fileName) => {
      const inputPath = path.join(inputDirectory, fileName);
      const outputPath = path.join(
        outputDirectory,
        `${fileName.replace(/\.(jpe?g|png)$/, ".webp")}`
      );
      const outputThumbnailPath = path.join(
        outputThumbnailDirectory,
        `${fileName.replace(/\.(jpe?g|png)$/, ".webp")}`
      );

      await sharp(inputPath).webp({ quality: 80 }).toFile(outputPath);

      await sharp(inputPath)
        .resize({ width: 300 })
        .webp({ quality: 80 })
        .toFile(outputThumbnailPath);
    })
  );

  console.log("画像をwebpに変換しました");
};

convertToWebp();
