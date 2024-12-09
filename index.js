const fs = require('fs');
const path = require('path');

// 获取当前目录的路径
const dirPath = path.resolve(__dirname);

// 用于存储文件名的数组
const filesArray = [];

// 读取目录中的文件
fs.readdir(dirPath, (err, files) => {
  if (err) {
    console.error('无法读取目录:', err);
    return;
  }

  // 使用Promise.all来并行处理文件检查
  Promise.all(files.map(file => {
    return new Promise((resolve) => {
      const filePath = path.join(dirPath, file);
      fs.stat(filePath, (err, stats) => {
        if (err) {
          console.error('无法获取文件信息:', err);
          resolve(); // 错误时不添加到数组，继续处理下一个文件
        } else if (stats.isFile()) {
          filesArray.push(filePath); // 如果是文件，添加到数组
        }
        resolve();
      });
    });
  })).then(() => {
    // 所有文件处理完成后，输出数组
    console.log(filesArray);
  });
});