const express = require("express");
const cors = require("cors");
const { PythonShell } = require("python-shell");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/predict", (req, res) => {
    console.log("Request received:", req.body);
    const inputData = JSON.stringify(req.body);

    let options = {
        mode: "text",
        pythonOptions: ["-u"],
        pythonPath: "python", // ✅ FIXED
        scriptPath: __dirname // ✅ FIXED (current folder)
    };

    const shell = new PythonShell("predict.py", options);

    shell.send(inputData);

    shell.on("message", (message) => {
        console.log("Python output:", message);
        res.json({ prediction: message });
    });

    shell.on("error", (err) => {
        console.error("Python error:", err);
        res.status(500).json({ error: err.message });
    });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});