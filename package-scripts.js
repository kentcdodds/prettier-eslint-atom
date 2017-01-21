/* eslint max-len:0 */
'use strict'
module.exports = {
  scripts: {
    commit: {
      description: 'This uses commitizen to help us generate well formatted commit messages',
      script: 'git-cz'
    },
    lint: {description: 'lint the entire project', script: 'eslint .'},
    validate: {
      description: 'This runs several scripts to make sure things look good before committing or on clean install',
      script: 'nps format && nps lint'
    },
    format: 'prettier-eslint lib/*.js *.js --write',
    addContributor: {
      description: 'When new people contribute to the project, run this',
      script: 'all-contributors add'
    },
    generateContributors: {
      description: 'Update the badge and contributors table',
      script: 'all-contributors generate'
    }
  },
  options: {silent: false}
}
