#!/bin/bash

npx prisma generate
npx prisma db push
node ./dist/src/main.js