#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status

# Compile C++ files
g++ -o fifo cpp/fifo.cpp
g++ -o lru cpp/lru.cpp
g++ -o mru cpp/mru.cpp
g++ -o optimal cpp/optimal.cpp
g++ -o lfu cpp/lfu.cpp

# Move executables to the backend folder
mv fifo ./fifo || echo "fifo already exists"
mv lru ./lru || echo "lru already exists"
mv mru ./mru || echo "mru already exists"
mv optimal ./optimal || echo "optimal already exists"
mv lfu ./lfu || echo "lfu already exists"
