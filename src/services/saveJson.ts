import fs from 'fs';
import path from 'path';
import { Usertype } from './type';
import { v4 as uuid } from 'uuid';

const filePathName = (fileName: string) => {
  return path.join('src', 'data', fileName);
};

const saveJsonToFile = (fileName: string, data: Usertype): void => {
  try {
    let existingData: Usertype[] = [];
    const ReqData = data;
    ReqData.id = uuid();
    ReqData.createdAt = new Date().toISOString();
    ReqData.updatedAt = ReqData.createdAt;
    const existfile = fs.existsSync(filePathName(fileName));
    if (existfile) {
      const fileContent = fs.readFileSync(filePathName(fileName), 'utf8');
      existingData = fileContent ? JSON.parse(fileContent) : [];
    }
    existingData.push(ReqData);
    const insertData = JSON.stringify(existingData, null, 2);
    fs.writeFileSync(filePathName(fileName), insertData, 'utf8');
  } catch (errorMessage) {
    console.error('Error writing to file:', errorMessage);
  }
};

export const updateJsonFile = (
  fileName: string,
  id: string,
  fieldName: string,
  fieldvalue: string | boolean
): void => {
  fs.readFile(filePathName(fileName), 'utf-8', (err, data) => {
    if (err) {
      console.error('Error reading users data:', err);
      return;
    }

    try {
      let findData = JSON.parse(data); // Parse JSON file

      // Find the user index in the array
      const userIndex = findData.findIndex(
        (user: { id: string }) => user.id === id
      );

      if (userIndex !== -1) {
        findData[userIndex][fieldName] = fieldvalue; // Update value

        // Write the updated array back to the JSON file asynchronously
        fs.writeFile(
          filePathName(fileName),
          JSON.stringify(findData, null, 2),
          'utf-8',
          (err) => {
            if (err) {
              console.error('Error updating Lastlogin:', err);
            }
          }
        );
      }
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  });
};

export default saveJsonToFile;
