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

// --- ROUTES ---

app.get('/hello', (req, res) => {
  // Kendi adını yazmayı unutma!
  res.type('text/plain').send("Hello from Salih's server");
});

app.get('/robots.txt', (req, res) => {
  const robotsContent = 'User-agent: *\nDisallow: /api/admin\n';
  res.type('text/plain').send(robotsContent);
});

app.get('/old-page', (req, res) => {
  res.redirect('/hello');
});

app.get('/api/courses', (req, res) => {
  res.json(COURSES);
});

app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    nodeVersion: process.version,
    uptimeSeconds: Math.floor(process.uptime())
  });
});

app.get('/api/headers', (req, res) => {
  res.json({
    userAgent: req.get('User-Agent') || 'Unknown',
    accept: req.get('Accept') || 'Unknown'
  });
});

app.post('/api/subscribe', (req, res) => {
  res.status(201).json({ subscribed: true });
});

app.get('/api/admin', (req, res) => {
  res.status(403).json({ error: 'Forbidden' });
});

app.get('/api/stats', (req, res) => {
  res.json({ requestsServed: requestCount });
});

// --- 404 FALLBACK (Express 5 uyumlu) ---
app.use((req, res) => {
  if (req.path.startsWith('/api')) {
    return res.status(404).json({ error: 'Not found' });
  }
  res.status(404).type('text/plain').send('404 - Page not found');
});

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});