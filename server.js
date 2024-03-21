import express from 'express'; // Import express module
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import app from "./app.js";
import cloudinary from "cloudinary";
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLIENT_NAME,
  api_key: process.env.CLOUDINARY_CLIENT_API,
  api_secret: process.env.CLOUDINARY_CLIENT_SECRET,
});
const PORT = process.env.PORT || 4000;

//const app = express(); // Create an instance of Express app

app.use(express.static(path.join(__dirname, "./frontend/dist")));
app.get("*", (req, res) => {
  res.sendFile(
    path.join(__dirname, "./frontend/dist/index.html"),
    function (err) {
      res.status(500).send(err);
    }
  );
});

app.listen(PORT, () => { // Use the PORT variable
  console.log(`Server running at port ${PORT}`);
});
