:: Windows version of compile.sh
:: inspired by: https://github.com/candybox2/candybox2.github.io/blob/master/compile.bat

@echo off

:: Check if all required programs are installed

call yuicompressor >nul 2>&1 && (echo yuicompressor ok) || (echo yuicompressor is not installed ! && goto end)

call tsc >nul 2>&1 && (echo typescript compiler ok) || (echo The typescript compiler is not installed ! && goto end)

:: Compile the game using tsc

call tsc

:: Minify the script with yuicompressor, we get a ascii-tic-tac-toe.min.js.temp script

call yuicompressor ./ascii-tic-tac-toe.js.temp --type js --line-break 80 -o ascii-tic-tac-toe.min.js.temp

:: Create the ascii-tic-tac-toe.min.js file from the license and the temp file

type ascii-tic-tac-toe.min.js.temp > ascii-tic-tac-toe.min.js

:: Create the ascii-tic-tac-toe.js file from the license and the temp file

type ascii-tic-tac-toe.js.temp > ascii-tic-tac-toe.js

:: Remove the temp files

del ascii-tic-tac-toe.js.temp
del ascii-tic-tac-toe.min.js.temp

:end
pause