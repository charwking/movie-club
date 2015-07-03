#!/bin/bash
set -ev

export TRAVIS_BRANCH=master
export TRAVIS_PULL_REQUEST=false

if ["${TRAVIS_BRANCH}" == "master"] && ["${TRAVIS_PULL_REQUEST}" == "false"]; then
    sudo apt-get -y -qq install sshpass;
    rsync -arz --delete --stats --rsh="sshpass -p $DEPLOY_PASSWORD ssh -l $DEPLOY_USER" dist/ cwking.com:$DEPLOY_PATH;
fi
