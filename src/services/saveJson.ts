import fs from 'fs';
import path from 'path';

const filePathName = (fileName: string) => {
  return path.join('src', 'data', fileName);
};

const saveJsonToFile = (fileName: string, data: any): void => {
  try {
    let existingData: any[] = [];
    const existfile = fs.existsSync(filePathName(fileName));
    if (existfile) {
      const fileContent = fs.readFileSync(filePathName(fileName), 'utf8');
      existingData = fileContent ? JSON.parse(fileContent) : [];
    }
    existingData.push(data);
    const insertData = JSON.stringify(existingData, null, 2);
    fs.writeFileSync(filePathName(fileName), insertData, 'utf8');
  } catch (errorMessage) {
    console.error('Error writing to file:', errorMessage);
  }
};

export default saveJsonToFile;
