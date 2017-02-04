#!/bin/bash
set -ev

if [[ "$TRAVIS_BRANCH" == "master" && "$TRAVIS_PULL_REQUEST" == "false" ]]; then
    rsync -arzO --delete --stats --rsh="sshpass -p $DEPLOY_PASSWORD ssh -l $DEPLOY_USER" dist/ cwking.com:$DEPLOY_PATH;
fi
