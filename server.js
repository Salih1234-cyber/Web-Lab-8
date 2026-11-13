import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 3000;

// Her klasörden çalıştırıldığında public klasörünü doğru bulmak için:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const publicDir = path.join(__dirname, 'public');

// Sabit veriler (Hard-coded data)
const COURSES = [
  { id: 'CS101', title: 'Introduction to Web Architecture', credits: 6 },
  { id: 'CS102', title: 'Back-End Systems with Node.js', credits: 6 },
  { id: 'CS103', title: 'HTTP Protocols & RESTful APIs', credits: 5 }
];

let requestCount = 0;

