const dotenv = require('dotenv');
dotenv.config({ path: './.env.deploy' });

const { SSH_USERNAME, SSH_HOSTMACHINE, GIT_REF, GIT_REPOSITORY, DESTINATION_PATH } = process.env;

module.exports = {
  apps: [],

  deploy: {
    production: {
      user: `${SSH_USERNAME}`,
      host: `${SSH_HOSTMACHINE}`,
      ref: `${GIT_REF}`,
      repo: `${GIT_REPOSITORY}`,
      path: `${DESTINATION_PATH}`,
      'post-deploy': 'cd frontend && npm i && npm run build '
    }
  }
};
