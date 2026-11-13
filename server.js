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

// 1. Middleware: Request Logger
const requestLogger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
};

// 2. Middleware: Request Counter
const requestCounter = (req, res, next) => {
  requestCount += 1;
  next();
};

// Middleware'leri route'lardan ÖNCE tanımlıyoruz
app.use(requestLogger);
app.use(requestCounter);

// Statik dosyaları sunma (GET / otomatik olarak public/index.html döner)
app.use(express.static(publicDir));