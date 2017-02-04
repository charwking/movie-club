#!/bin/bash
set -ev

if [[ "$TRAVIS_BRANCH" == "master" && "$TRAVIS_PULL_REQUEST" == "false" ]]; then
    rsync -arzO --delete --stats --rsh="sshpass -p $DEPLOY_PASSWORD" dist/ $DEPLOY_USER@cwking.com:$DEPLOY_PATH;
fi
