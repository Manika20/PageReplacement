const { execFile } = require("child_process");

// Promisified execFile
const execFilePromise = (file, args) => {
  return new Promise((resolve, reject) => {
    execFile(file, args, (error, stdout, stderr) => {
      if (error) {
        return reject(error);
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }
      resolve(stdout);
    });
  });
};

// Handle LRU Algorithm
module.exports.lru = async (req, res) => {
  const { capacity, pages } = req.body;

  console.log("capacity:", capacity, "pages:", pages);

  try {
    const stdout = await execFilePromise("./lru", [
      capacity,
      ...pages.map(String),
    ]);
    const result = JSON.parse(stdout);
    res.json({
      cache: result.cacheStates,
      hits: result.hits,
      misses: result.misses,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Algorithm execution failed" });
  }
};

// Handle FIFO Algorithm
module.exports.fifo = async (req, res) => {
  const { capacity, pages } = req.body;

  console.log("capacity:", capacity, "pages:", pages);

  try {
    const stdout = await execFilePromise("./fifo", [
      capacity,
      ...pages.map(String),
    ]);
    const result = JSON.parse(stdout);
    res.json({
      cache: result.cacheStates,
      hits: result.hits,
      misses: result.misses,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Algorithm execution failed" });
  }
};

// Handle LFU Algorithm
module.exports.lfu = async (req, res) => {
  const { capacity, pages } = req.body;

  console.log("capacity:", capacity, "pages:", pages);

  try {
    const stdout = await execFilePromise("./lfu", [
      capacity,
      ...pages.map(String),
    ]);
    const result = JSON.parse(stdout);
    res.json({
      cache: result.cacheStates,
      hits: result.hits,
      misses: result.misses,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Algorithm execution failed" });
  }
};

// Handle MRU Algorithm
module.exports.mru = async (req, res) => {
  const { capacity, pages } = req.body;

  console.log("capacity:", capacity, "pages:", pages);

  try {
    const stdout = await execFilePromise("./mru", [
      capacity,
      ...pages.map(String),
    ]);
    const result = JSON.parse(stdout);
    res.json({
      cache: result.cacheStates,
      hits: result.hits,
      misses: result.misses,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Algorithm execution failed" });
  }
};

// Handle Optimal Algorithm
module.exports.optimal = async (req, res) => {
  const { capacity, pages } = req.body;

  console.log("capacity:", capacity, "pages:", pages);

  try {
    const stdout = await execFilePromise("./optimal", [
      capacity,
      ...pages.map(String),
    ]);
    const result = JSON.parse(stdout);
    res.json({
      cache: result.cacheStates,
      hits: result.hits,
      misses: result.misses,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ error: "Algorithm execution failed" });
  }
};
