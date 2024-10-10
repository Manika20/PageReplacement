#include <iostream>
#include <unordered_set>
#include <deque>
#include <vector>

using namespace std;

void FIFO(int capacity, const vector<int>& pages) {
    vector<vector<int>> cache_states;
    deque<int> cache;
    unordered_set<int> pageSet;  // To track which pages are in the cache
    int hits = 0;
    int misses = 0;

    for (int page : pages) {
        if (pageSet.find(page) == pageSet.end()) {
            // Page not found, it's a miss
            misses++;
            if (cache.size() == static_cast<size_t>(capacity)) {
                // Remove the oldest page
                int oldest = cache.front();
                cache.pop_front();
                pageSet.erase(oldest); // Remove from the set as well
            }
            // Add the new page to the cache
            cache.push_back(page);
            pageSet.insert(page); // Add to the set for fast lookup
        } else {
            // Page found, it's a hit
            hits++;
        }
        cache_states.push_back(vector<int>(cache.begin(), cache.end()));
    }

    // Output the cache states and the total hits and misses
    cout << "{\"cacheStates\":"; // Start JSON response
    cout << "[";
    for (size_t i = 0; i < cache_states.size(); ++i) {
        cout << "[";
        for (size_t j = 0; j < cache_states[i].size(); ++j) {
            cout << cache_states[i][j];
            if (j != cache_states[i].size() - 1) cout << ", ";
        }
        cout << "]";
        if (i != cache_states.size() - 1) cout << ", ";
    }
    cout << "], \"hits\":" << hits << ", \"misses\":" << misses << "}" << endl;
}

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

    FIFO(capacity, pages);
    return 0;
}
