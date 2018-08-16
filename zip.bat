call compile

rmdir /s /q ascii-tic-tac-toe

mkdir "ascii-tic-tac-toe"

mkdir "ascii-tic-tac-toe\css"

mkdir "ascii-tic-tac-toe\img"

mkdir "ascii-tic-tac-toe\lib"

copy "index.html" "ascii-tic-tac-toe"

copy "ascii-tic-tac-toe.min.js" "ascii-tic-tac-toe"

copy "css\*" "ascii-tic-tac-toe\css"

copy "img\*" "ascii-tic-tac-toe\img"

copy "lib\*.js" "ascii-tic-tac-toe\lib"

del ascii-tic-tac-toe.zip

7z a ascii-tic-tac-toe.zip ascii-tic-tac-toe

rmdir /s /q ascii-tic-tac-toe