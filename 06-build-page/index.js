const fs = require('fs/promises');
const path = require('path');

const templatePath = path.join(__dirname, 'template.html');
const componentsPath = path.join(__dirname, 'components');
const assetsPath = path.join(__dirname, 'assets');
const stylesPath = path.join(__dirname, 'styles');

const outputPath = path.join(__dirname, 'project-dist');
const outputAssetsPath = path.join(outputPath, 'assets');

// ````````````````````````````````````````````````````` createDir
async function createDir() {
  await fs.rm(outputPath, { force: true, recursive: true });
  await fs.mkdir(outputPath, { recursive: true });
  console.log('create', outputPath);
}

// ````````````````````````````````````````````````````` createHtml
async function createHtml() {
  let templateFile = await fs.readFile(templatePath, 'utf-8');

  const templatesArr = await readComponentsName();

  for (const template of templatesArr) {
    const filePath = path.join(componentsPath, `${template}.html`);
    const componentData = await fs.readFile(filePath, 'utf-8');
    templateFile = templateFile.replace(`{{${template}}}`, componentData);
  }
  await fs.writeFile(path.join(outputPath, 'index.html'), templateFile);
  console.log('create', path.join(outputPath, 'index.html'));
}

async function readComponentsName() {
  let arr = [];
  const files = await fs.readdir(componentsPath);
  for (const file of files) {
    const filePath = path.join(componentsPath, file);
    const st = await fs.stat(filePath);
    if (st.isFile()) {
      const name = file.slice(0, file.indexOf('.'));
      arr.push(name);
    }
  }
  return arr;
}

// ````````````````````````````````````````````````````` mergeStyles
async function mergeStyles() {
  const files = await fs.readdir(stylesPath);
  let bundleCss = [];
  for (const file of files) {
    const filePath = path.join(stylesPath, file);
    const st = await fs.stat(filePath);

    if (st.isFile() && path.extname(file) === '.css') {
      const cssFile = await fs.readFile(path.join(filePath), 'utf8');
      bundleCss.push(`${cssFile}\n`);
    }
  }
  await fs.writeFile(path.join(outputPath, 'style.css'), bundleCss);
  console.log('create', path.join(outputPath, 'style.css'));
}

// ````````````````````````````````````````````````````` copyDir
async function copyDir(destPath, srcPath) {
  await fs.rm(destPath, { force: true, recursive: true });
  await fs.mkdir(destPath, { recursive: true });
  console.log('create', destPath);

  const files = await fs.readdir(srcPath);
  for (const file of files) {
    const filePath = path.join(srcPath, file);
    const outputFilePath = path.join(destPath, file);
    const st = await fs.stat(filePath);
    if (st.isDirectory()) {
      await copyDir(outputFilePath, filePath);
    } else if (st.isFile()) {
      await fs.copyFile(filePath, outputFilePath);
    }
  }
}

async function buildPage() {
  await createDir();
  await createHtml();
  await mergeStyles();
  await copyDir(outputAssetsPath, assetsPath);
}

buildPage();
