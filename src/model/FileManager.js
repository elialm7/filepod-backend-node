
const fs = require('fs');
const path = require('path');
const uploadsfolder = process.env.UPLOADFOLDER;

const saveFile = (uid, filename, fileData) => {
  const filePath = path.join(uploadsfolder, `${uid}-${filename}`);
  fs.writeFileSync(filePath, fileData);
}

const getFile = (uid) => {
  const files = fs.readdirSync(uploadsfolder);
  const matchingFile = files.find(file => {
    const fileName = path.basename(file);
    const fileUid = fileName.split('-')[0];
    return fileUid === uid.toString();
  });

  if (matchingFile) {
    const filePath = path.join(uploadsfolder, matchingFile);
    const fileData = fs.readFileSync(filePath);
    const fileName = getFileNameFromUidFormat(path.basename(filePath));
    return { fileName, fileData };
  } else {
    return null;
  }
}
const getFileNameFromUidFormat = (uidFilename) => {
  const parts = uidFilename.split('-');
  const fileName = parts.slice(1).join('-');
  return fileName;
};

const deleteFile = (uid) => {
  const files = fs.readdirSync(uploadsfolder);
  const matchingFile = files.find(file => {
    const filename = path.basename(file);
    const fileUid = filename.split('-')[0];
    return fileUid === uid.toString();
  });
  if (matchingFile) {
    const filePath = path.join(uploadsfolder, matchingFile);
    fs.unlinkSync(filePath);
    console.log(`File ${matchingFile} deleted successfully.`);
  }
}


module.exports = { saveFile, getFile, deleteFile };


