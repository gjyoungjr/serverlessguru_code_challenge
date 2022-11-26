#! /bin/bash

npm install -g serverless
serverless deploy --stage $STAGE_NAME --package \   $CODEBUILD_SRC_DIR/target/$STAGE_NAME -v -r us-east-1 --verbose