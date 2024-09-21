#include <iostream>
#include <unordered_map>
#include <list>
#include <vector>

using namespace std;

class LFUCache {
    class Node {
    public:
        int key, val, fre;
        Node *prev, *next;
        Node(int _key, int _val, int _fre) {
            key = _key;
            val = _val;
            fre = _fre;
            prev = next = nullptr;
        }
    };

    class NodeList {
    public:
        Node *head, *tail;
        int len;
        NodeList() {
            head = new Node(-1, -1, 0); // dummy head
            tail = new Node(-1, -1, 0); // dummy tail
            head->next = tail;
            tail->prev = head;
            len = 0;
        }

        // Add a node just after the dummy head
        void addNode(Node *node) {
            Node *next = head->next;
            head->next = node;
            node->prev = head;
            node->next = next;
            next->prev = node;
            len++;
        }

        // Remove a specific node
        void removeNode(Node *node) {
            Node *prev = node->prev;
            Node *next = node->next;
            prev->next = next;
            next->prev = prev;
            len--;
        }
    };

    int minFre, capacity, size;
    unordered_map<int, Node*> keyNode;              // key to node
    unordered_map<int, NodeList*> freqList;         // frequency to list of nodes
    vector<vector<int>> cacheStates;                // To store cache states after each operation
    int hits ;
    int misses ;
public:
    LFUCache(int _capacity) {
        capacity = _capacity;
        size = 0;
        minFre = 0;
        hits = 0;
        misses = 0;
    }

    int get(int key) {
        if (keyNode.find(key) == keyNode.end())
            return -1; // Key not found

        Node *node = keyNode[key];
        int val = node->val;
        int freq = node->fre;

        // Remove node from current frequency list
        freqList[freq]->removeNode(node);
        if (freqList[freq]->len == 0 && minFre == freq)
            minFre++; // If the list was the min freq, increment min frequency

        // Add the node to the next frequency list
        node->fre++;
        if (freqList.find(node->fre) == freqList.end())
            freqList[node->fre] = new NodeList();
        freqList[node->fre]->addNode(node);

        return val;
    }

    void put(int key, int value) {
        if (capacity == 0)
            return; // No capacity to add new elements

        // If the key exists, update the value and frequency
        if (keyNode.find(key) != keyNode.end()) {
            Node *node = keyNode[key];
            node->val = value; // Update the value
            get(key);          // Update the frequency
            captureCacheState();
            hits++;
            return;
        }
        else{
            misses++;
        }

        // If the cache is full, remove the least frequently used node
        if (size == capacity) {
            NodeList *minList = freqList[minFre];
            Node *toRemove = minList->tail->prev;
            keyNode.erase(toRemove->key);
            minList->removeNode(toRemove);
            size--;
        }

        // Add the new node with frequency 1
        minFre = 1;
        Node *newNode = new Node(key, value, 1);
        keyNode[key] = newNode;
        if (freqList.find(1) == freqList.end())
            freqList[1] = new NodeList();
        freqList[1]->addNode(newNode);
        size++;
        captureCacheState();
    }

    // Capture the current cache state in a vector
      // Capture the current cache state in a vector
    void captureCacheState() {
        vector<int> currentState;
        for (auto it = freqList.begin(); it != freqList.end(); ++it) {
            NodeList* nodeList = it->second;
            Node* current = nodeList->head->next;
            while (current != nodeList->tail) {
                currentState.push_back(current->key);
                current = current->next;
            }
        }
        cacheStates.push_back(currentState); // Store the current cache state
    }


    // Print the cache states (vector of vectors)
    void printCacheStates() {
       cout << "{\"cacheStates\":"; // Start JSON response
    cout << "[";
    for (size_t i = 0; i < cacheStates.size(); ++i) {
        cout << "[";
        for (long j =  cacheStates[i].size() -1; j >=0; j--) {
            cout << cacheStates[i][j];
            if (j != 0) cout << ", ";
        }
        cout << "]";
        if (i != cacheStates.size() - 1) cout << ", ";
    }
    cout << "], \"hits\":" << hits << ", \"misses\":" << misses << "}" << endl;
    }
};

int main(int argc, char* argv[]) {
    if (argc < 3) {
        cerr << "Usage: " << argv[0] << " <capacity> <page1> <page2> ... <pageN>" << endl;
        return 1;
    }

    int capacity;
    try {
        capacity = stoi(argv[1]);
    } catch (const invalid_argument& e) {
        cerr << "Invalid capacity value: " << e.what() << endl;
        return 1;
    }

    vector<int> pages;
    for (int i = 2; i < argc; i++) {
        try {
            pages.push_back(stoi(argv[i]));
        } catch (const invalid_argument& e) {
            cerr << "Invalid page value: " << e.what() << endl;
            return 1;
        }
    }

    LFUCache cache(capacity);
    for (int page : pages) {
        cache.put(page, page);  // Access the page and store cache state
    }

    // Print the cache states after all operations
    cache.printCacheStates();

    return 0;
}
