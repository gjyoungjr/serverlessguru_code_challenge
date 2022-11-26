#! /bin/bash

npm install -g serverless
serverless deploy --verbose --stage $STAGE_NAME --package \   $CODEBUILD_SRC_DIR/target/$STAGE_NAME -r us-east-1 