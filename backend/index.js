import cors from "cors";
import express from "express";
import path from "path";
import { execFile } from "child_process";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));

app.use(express.static(path.join(__dirname, "../frontend")));
// Serve the index.html file when the root URL is accessed
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

// Handle LRU Algorithm
app.post("/run-lru", (req, res) => {
  const { capacity, pages } = req.body;

  //console.log("capacity:", capacity, "pages:", pages);

  execFile(
    "./lru",
    [capacity, ...pages.map(String)],
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Algorithm execution failed" });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }

      try {
        const result = JSON.parse(stdout);
        res.json({
          cache: result.cacheStates,
          hits: result.hits,
          misses: result.misses,
        });
      } catch (e) {
        console.error(`Error parsing JSON: ${e.message}`);
        res.status(500).json({ error: "Failed to parse algorithm output" });
      }
    }
  );
});

// Handle FIFO Algorithm
app.post("/run-fifo", (req, res) => {
  const { capacity, pages } = req.body;

  //console.log("capacity:", capacity, "pages:", pages);

  execFile(
    "./fifo",
    [capacity, ...pages.map(String)],
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Algorithm execution failed" });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }

      try {
        const result = JSON.parse(stdout);
        res.json({
          cache: result.cacheStates,
          hits: result.hits,
          misses: result.misses,
        });
      } catch (e) {
        console.error(`Error parsing JSON: ${e.message}`);
        res.status(500).json({ error: "Failed to parse algorithm output" });
      }
    }
  );
});
//LFU algo

app.post("/run-lfu", (req, res) => {
  const { capacity, pages } = req.body;

  //console.log("capacity:", capacity, "pages:", pages);

  execFile(
    "./lfu",
    [capacity, ...pages.map(String)],
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Algorithm execution failed" });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }

      try {
        const result = JSON.parse(stdout);
        res.json({
          cache: result.cacheStates,
          hits: result.hits,
          misses: result.misses,
        });
      } catch (e) {
        console.error(`Error parsing JSON: ${e.message}`);
        res.status(500).json({ error: "Failed to parse algorithm output" });
      }
    }
  );
});
app.post("/run-mru", (req, res) => {
  const { capacity, pages } = req.body;

  //console.log("capacity:", capacity, "pages:", pages);

  execFile(
    "./mru",
    [capacity, ...pages.map(String)],
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Algorithm execution failed" });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }

      try {
        const result = JSON.parse(stdout);
        res.json({
          cache: result.cacheStates,
          hits: result.hits,
          misses: result.misses,
        });
      } catch (e) {
        console.error(`Error parsing JSON: ${e.message}`);
        res.status(500).json({ error: "Failed to parse algorithm output" });
      }
    }
  );
});
app.post("/run-optimal", (req, res) => {
  const { capacity, pages } = req.body;

  //console.log("capacity:", capacity, "pages:", pages);

  execFile(
    "./optimal",
    [capacity, ...pages.map(String)],
    (error, stdout, stderr) => {
      if (error) {
        console.error(`Error: ${error.message}`);
        return res.status(500).json({ error: "Algorithm execution failed" });
      }
      if (stderr) {
        console.error(`Stderr: ${stderr}`);
      }

      try {
        const result = JSON.parse(stdout);
        res.json({
          cache: result.cacheStates,
          hits: result.hits,
          misses: result.misses,
        });
      } catch (e) {
        console.error(`Error parsing JSON: ${e.message}`);
        res.status(500).json({ error: "Failed to parse algorithm output" });
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
