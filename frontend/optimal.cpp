#include <iostream>
#include <vector>
#include <unordered_map>
#include <algorithm>

using namespace std;

class OptimalCache {
public:
    vector<int> cache; // Current pages in the cache
    vector<vector<int>> cacheStates; // Cache states after each operation
    unordered_map<int, int> pageMap; // Maps page number to its index in the cache
    int capacity;
    int hits;
    int misses;

    OptimalCache(int capacity) {
        this->capacity = capacity;
        hits = 0;
        misses = 0;
    }

    // Refer page and update the cache
    void refer(int page, const vector<int>& futureRequests) {
        if (pageMap.find(page) != pageMap.end()) {
            // Page hit
            hits++;
        } else {
            // Page miss
            misses++;

            if (cache.size() < capacity) {
                // If cache is not full, simply add the page
                cache.push_back(page);
                pageMap[page] = cache.size() - 1; // Store the index of the page
            } else {
                // If cache is full, find the optimal page to replace
                int indexToReplace = findPageToReplace(futureRequests);

                // Remove the page that will be replaced from the pageMap
                pageMap.erase(cache[indexToReplace]);

                // Replace the page in the cache
                cache[indexToReplace] = page;

                // Update the pageMap with the new page
                pageMap[page] = indexToReplace;
            }
        }

        // Capture the cache state after each operation
        captureCacheState();
    }

    // Function to determine the next usage of a page
    int getNextUsage(int page, const vector<int>& futureRequests) {
        auto it = find(futureRequests.begin(), futureRequests.end(), page);
        if (it == futureRequests.end()) return -1; // If page is not used again
        return distance(futureRequests.begin(), it); // Return the distance (index) from the current position
    }

    // Find the optimal page to replace
    int findPageToReplace(const vector<int>& futureRequests) {
        int farthestIndex = -1;
        int indexToReplace = -1;

        for (int i = 0; i < cache.size(); ++i) {
            int nextUsage = getNextUsage(cache[i], futureRequests);
            if (nextUsage == -1) {
                return i; // Replace this page immediately if it's never used again
            }
            if (nextUsage > farthestIndex) {
                farthestIndex = nextUsage;
                indexToReplace = i;
            }
        }

        return indexToReplace; // Return the index of the page to replace
    }

    // Capture the current state of the cache
    void captureCacheState() {
        cacheStates.push_back(cache); // Push the current cache state to cacheStates
    }

    // Print the cache states and the hit/miss statistics
    void printCacheStates() {
        cout << "{\"cacheStates\":[";

        for (size_t i = 0; i < cacheStates.size(); ++i) {
            cout << "[";
            for (size_t j = 0; j < cacheStates[i].size(); ++j) {
                cout << cacheStates[i][j];
                if (j != cacheStates[i].size() - 1) cout << ", ";
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

    // Initialize the optimal cache with the given capacity
    OptimalCache cache(capacity);

    // Refer each page and calculate hits/misses
    for (int i = 0; i < pages.size(); ++i) {
        cache.refer(pages[i], vector<int>(pages.begin() + i + 1, pages.end()));
    }

    // Print the cache states and hit/miss statistics
    cache.printCacheStates();

    return 0;
}