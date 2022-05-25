const fs = require('fs/promises');
const path = require('path');

async function copyDir() {
  const rmDir = await fs.rm(path.join(__dirname, 'files-copy'), {
    force: true,
    recursive: true,
  });

  const newDir = await fs.mkdir(path.join(__dirname, 'files-copy'), {
    recursive: true,
  });
  const files = await fs.readdir(path.join(__dirname, 'files'));
  for (const file of files) {
    const st = await fs.stat(path.join(__dirname, 'files', file));
    if (st.isFile()) {
      const newFile = await fs.copyFile(
        path.join(__dirname, 'files', file),
        path.join(__dirname, 'files-copy', file),
      );
    }
  }
}

copyDir();
