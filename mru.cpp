#include <iostream>
#include <vector>
#include <unordered_map>

using namespace std;

class MRUCache {
public:
    class Node {
    public:
        int key;
        int val;
        Node* next;
        Node* prev;
        Node(int key, int val) {
            this->key = key;
            this->val = val;
            next = NULL;
            prev = NULL;
        }
    };

    unordered_map<int, Node*> map; // Maps key to Node
    Node* head = new Node(-1, -1);  // Dummy head
    Node* tail = new Node(-1, -1);  // Dummy tail
    vector<vector<int>> cacheStates; // To store cache states after each operation
    int size;
    int capacity;
    int hits ;
    int misses ;

    MRUCache(int capacity) {
        this->capacity = capacity;
        size = 0;
        head->next = tail;
        tail->prev = head;
        hits = 0;
        misses = 0;
    }

    void addNode(Node* node) {
        Node* next = head->next;
        head->next = node;
        node->prev = head;
        node->next = next;
        next->prev = node;
    }

    void deleteNode(Node* node) {
        node->prev->next = node->next;
        node->next->prev = node->prev;
    }

    void put(int key, int value) {
        if (map.find(key) != map.end()) {
            Node* node = map[key];
            map.erase(node->key);
            deleteNode(node);
            size--;
            hits++;
        }
        else{
            misses++;
        }

        if (size == capacity) {
            map.erase(head->next->key);
            deleteNode(head->next);
            size--;
        }

        Node* temp = new Node(key, value);
        addNode(temp);
        map[key] = head->next; // Update map with the new node
        size++;
        captureCacheState();
    }

    void captureCacheState() {
        vector<int> currentState;
        Node* temp = head->next;
        while (temp != tail) {
            currentState.push_back(temp->key); // Store keys for MRU state
            temp = temp->next;
        }
        cacheStates.push_back(currentState); // Store the current cache state
    }

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
        return 1; // Exit with error code
    }

    int capacity;
    try {
        capacity = stoi(argv[1]); // Convert capacity to integer
    } catch (const invalid_argument& e) {
        cerr << "Invalid capacity value: " << e.what() << endl;
        return 1; // Exit with error code
    }

    vector<int> pages;
    for (int i = 2; i < argc; i++) {
        try {
            pages.push_back(stoi(argv[i])); // Convert each page to integer
        } catch (const invalid_argument& e) {
            cerr << "Invalid page value: " << e.what() << endl;
            return 1; // Exit with error code
        }
    }

    MRUCache cache(capacity);
    for (int page : pages) {
        cache.put(page, page);  // Access the page and store cache state
    }

    // Print the cache states after all operations
    cache.printCacheStates();
    return 0;
}
