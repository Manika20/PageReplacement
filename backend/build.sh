#!/bin/bash

# Compile C++ files
g++ -o fifo cpp/fifo.cpp
g++ -o lru cpp/lru.cpp
g++ -o mru cpp/mru.cpp
g++ -o optimal cpp/optimal.cpp
g++ -o lfu cpp/lfu.cpp

# Move executables to the backend folder
mv fifo lru mru optimal lfu ./
