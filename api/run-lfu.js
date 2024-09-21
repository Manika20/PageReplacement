import { execFile } from "child_process";

export default (req, res) => {
  if (req.method === "POST") {
    const { capacity, pages } = req.body;

    console.log("capacity:", capacity, "pages:", pages);

    execFile(
      "../lfu", // Make sure this executable is accessible
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
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};
