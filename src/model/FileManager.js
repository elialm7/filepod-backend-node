
const fs = require('fs');
const path = require('path');

const saveFile = (uid, filename, fileData)=>{
  const filePath = path.join('uploads', `${uid}-${filename}`);
  fs.writeFileSync(filePath, fileData);
}

const getFile = (uid) =>{
  const files = fs.readdirSync('uploads');
  const matchingFile = files.find(file => {
    const fileName = path.basename(file); 
    const fileUid = fileName.split('-')[0];
    return fileUid === uid.toString(); 
  });

  if (matchingFile) {
    const filePath = path.join('uploads', matchingFile);
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

module.exports = {saveFile, getFile};


