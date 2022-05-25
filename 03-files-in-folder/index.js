const fs = require('fs/promises');
const path = require('path');

(async () => {
  const files = await fs.readdir(path.join(__dirname, 'secret-folder'));
  for (const file of files) {
    const st = await fs.stat(path.join(__dirname, 'secret-folder', file));
    if (st.isFile()) {
      const name = file.slice(0, file.indexOf('.'));
      const ext = path.extname(file).slice(1);
      const size = (st.size / 1024).toFixed(2) + 'kb';
      console.log(`${name} - ${ext} - ${size}`);
    }
  }
})();
