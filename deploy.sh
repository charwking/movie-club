#!/bin/bash
set -ev

if [[ "$TRAVIS_BRANCH" == "master" && "$TRAVIS_PULL_REQUEST" == "false" ]]; then
    sshpass -p $DEPLOY_PASSWORD rsync -arz0 --delete --stats dist/ $DEPLOY_USER@cwking.com:$DEPLOY_PATH;
fi
