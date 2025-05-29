import express, { Express } from "express";
import connectToDataBase from "./DBConnection";
import configMiddlewares from "./middlewares/config.middleware";
import { Routes } from "./routes/all.routes";
import path from "path";

const app: Express = express();

connectToDataBase();
app.use("/uploads", express.static(path.join(process.cwd(), "uploads")));

configMiddlewares.forEach((middlewares) => app.use(middlewares));

app.use("/api", Routes);

export default app;


// const express = require('express');
// const multer = require('multer');
// const sharp = require('sharp');
// const path = require('path');
// const fs = require('fs');
 
// const app = express();
// const PORT = 7000;
 
// // Setup multer for uploading files
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => cb(null, 'uploads/'),
//   filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname),
// });
// const upload = multer({ storage });
 
// // Upload endpoint
// app.post('/upload', upload.single('image'), (req, res) => {
//   const tempPath = req.file.path;
//   const targetPath = path.join(__dirname, 'public', req.file.filename);
 
//   // Move file from "uploads" to "public"
//   fs.rename(tempPath, targetPath, (err) => {
//     if (err) return res.status(500).send('File move error');
//     res.send({
//       message: 'Upload successful',
//       url: `http://localhost:${PORT}/image/${req.file.filename}`,
//     });
//   });
// });
 
// // Resize + serve image
// app.get('/image/:filename', async (req, res) => {
//   const { filename } = req.params;
//   const width = parseInt(req.query.w);
//   const height = parseInt(req.query.h);
 
//   const imagePath = path.join(__dirname, 'public', filename);
 
//   if (!fs.existsSync(imagePath)) {
//     return res.status(404).send('Image not found');
//   }
 
//   try {
//     let image = sharp(imagePath);
 
//     // Apply resizing if either width or height is given
//     if ((!isNaN(width) || !isNaN(height))) {
//       image = image.resize({
//         width: isNaN(width) ? undefined : width,
//         height: isNaN(height) ? undefined : height,
//         fit: 'inside', // keep aspect ratio, fit inside the box
//       });
//     }
 
//     const buffer = await image.toBuffer();
//     res.set('Content-Type', 'image/jpeg');
//     res.send(buffer);
//   } catch (err) {
//     res.status(500).send('Error processing image');
//   }
// });
 
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });
 