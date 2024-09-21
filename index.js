import express from "express"; // Change to import
import { execFile } from "child_process";
import cors from "cors";
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBarSG0Cj0WE7wvnN12NJPmw1hDW18udks",
  authDomain: "pagereplacement-db582.firebaseapp.com",
  projectId: "pagereplacement-db582",
  storageBucket: "pagereplacement-db582.appspot.com",
  messagingSenderId: "305391360502",
  appId: "1:305391360502:web:a1314ad382f3b2874e4fd7",
};
const app = express();
const firebaseApp = initializeApp(firebaseConfig);

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
// Handle LRU Algorithm
app.post("/run-lru", (req, res) => {
  const { capacity, pages } = req.body;

  console.log("capacity:", capacity, "pages:", pages);

  execFile(
    "./public/lru",
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

  console.log("capacity:", capacity, "pages:", pages);

  execFile(
    "./public/fifo",
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

  console.log("capacity:", capacity, "pages:", pages);

  execFile(
    "./public/lfu",
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

  console.log("capacity:", capacity, "pages:", pages);

  execFile(
    "./public/mru",
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

  console.log("capacity:", capacity, "pages:", pages);

  execFile(
    "./public/optimal",
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
