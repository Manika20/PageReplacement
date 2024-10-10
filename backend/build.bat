@echo off
setlocal

REM Compile C++ files
g++ -o fifo cpp/fifo.cpp
g++ -o lru cpp/lru.cpp
g++ -o mru cpp/mru.cpp
g++ -o optimal cpp/optimal.cpp
g++ -o lfu cpp/lfu.cpp

REM Move executables to the backend folder
move fifo.exe .\
move lru.exe .\
move mru.exe .\
move optimal.exe .\
move lfu.exe .\

endlocal

