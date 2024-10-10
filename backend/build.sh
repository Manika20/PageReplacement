@echo off
setlocal

REM Compile C++ files
g++ -o fifo cpp/fifo.cpp
g++ -o lru cpp/lru.cpp
g++ -o mru cpp/mru.cpp
g++ -o optimal cpp/optimal.cpp
g++ -o lfu cpp/lfu.cpp

REM Check if the executables exist and move them if they don't
if not exist fifo.exe (
    move fifo.exe .\
)
if not exist lru.exe (
    move lru.exe .\
)
if not exist mru.exe (
    move mru.exe .\
)
if not exist optimal.exe (
    move optimal.exe .\
)
if not exist lfu.exe (
    move lfu.exe .\
)

endlocal
