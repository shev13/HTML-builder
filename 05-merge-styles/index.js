const fs = require('fs/promises');
const path = require('path');

(async () => {
  const files = await fs.readdir(path.join(__dirname, 'styles'));
  let allCss = [];
  for (const file of files) {
    const st = await fs.stat(path.join(__dirname, 'styles', file));

    if (st.isFile() && path.extname(file) === '.css') {
      const cssFile = await fs.readFile(
        path.join(__dirname, 'styles', file),
        'utf8',
      );
      allCss.push(cssFile);
      console.log(file, 'copy');
    }
  }

  await fs.writeFile(
    path.join(__dirname, 'project-dist', 'bundle.css'),
    allCss,
  );
  console.log('bundle.css create');
})();
