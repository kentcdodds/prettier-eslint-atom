/* eslint max-len:0 */
const {concurrent, series} = require('nps-utils')

module.exports = {
  scripts: {
    commit: {
      description: 'This uses commitizen to help us generate well formatted commit messages',
      script: 'git-cz',
    },
    build: {
      description: 'delete the dist directory and run babel to build the files',
      script: 'rimraf dist && babel --copy-files --out-dir dist src',
    },
    lint: {description: 'lint the entire project', script: 'eslint .'},
    validate: {
      description: 'This runs several scripts to make sure things look good before committing or on clean install',
      script: series('nps format', concurrent.nps('lint', 'build')),
    },
    format: 'prettier-eslint src/*.js *.js --write',
    addContributor: {
      description: 'When new people contribute to the project, run this',
      script: 'all-contributors add',
    },
    generateContributors: {
      description: 'Update the badge and contributors table',
      script: 'all-contributors generate',
    },
  },
  options: {silent: false},
}
