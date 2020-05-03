import {execSync} from 'child_process';

const PRE_COMMIT = process.env.NODE_ENV === 'pre_commit';
const EXEC_OPTIONS = {stdio: [0, 1, 2]};

const runEslint = (files = './'): Buffer =>
  execSync(`./node_modules/.bin/eslint --ext .ts,.tsx,.js ${files} && echo "eslint success"`, EXEC_OPTIONS);

const runStylint = (files = 'src'): Buffer =>
  execSync(`./node_modules/.bin/stylint ${files} && echo "stylint success"`, EXEC_OPTIONS);

if (PRE_COMMIT) {
  const changedFiles = execSync('git diff --cached --name-only --diff-filter=ACM src __tests__', {encoding: 'utf8'}).split('\n');
  const changedFilesJavascript = changedFiles.filter((item) => (/\.(tsx?|js)$/).test(item));
  const changedFilesStylus = changedFiles.filter((item) => (/\.styl$/).test(item));

  if (changedFilesJavascript.length) {
    runEslint(changedFilesJavascript.join(' '));
  }

  if (changedFilesStylus.length) {
    runStylint(changedFilesStylus.join(' '));
  }
} else {
  runEslint();
  runStylint();
}
