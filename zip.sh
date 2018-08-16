bash compile.sh

rm -rf ascii-tic-tac-toe

mkdir ascii-tic-tac-toe

mkdir ascii-tic-tac-toe/css

mkdir ascii-tic-tac-toe/img

mkdir ascii-tic-tac-toe/lib

cp index.html ascii-tic-tac-toe

cp ascii-tic-tac-toe.min.js ascii-tic-tac-toe

cp css/* ascii-tic-tac-toe/css

cp img/* ascii-tic-tac-toe/img

cp lib/*.js ascii-tic-tac-toe/lib

rm -rf ascii-tic-tac-toe.zip

7z a ascii-tic-tac-toe.zip ascii-tic-tac-toe

rm -rf ascii-tic-tac-toe