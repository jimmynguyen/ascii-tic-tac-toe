#!/bin/bash
## inspired by: https://github.com/candybox2/candybox2.github.io/blob/master/compile.sh

## Check existing commands

command -v yuicompressor >/dev/null 2>&1 || { echo >&2 "yuicompressor is not installed"; exit 1; }
command -v tsc >/dev/null 2>&1 || { echo >&2 "The typescript compiler is not installed"; exit 1; }

## Compile the game using tsc

tsc

## Minify the script with yuicompressor, we get a candybox2.js.temp script

yuicompressor ./ascii-tic-tac-toe.js.temp --type js --line-break 80 -o ascii-tic-tac-toe.min.js.temp

## Create the ascii-tic-tac-toe.min.js file from the license and the temp file

cat ascii-tic-tac-toe.min.js.temp > ascii-tic-tac-toe.min.js

## Create the ascii-tic-tac-toe.js file from the license and the temp file

cat ascii-tic-tac-toe.js.temp > ascii-tic-tac-toe.js

## Remove the temp files

rm ascii-tic-tac-toe.js.temp ascii-tic-tac-toe.min.js.temp