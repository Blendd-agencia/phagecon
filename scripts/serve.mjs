import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
const root = path.resolve(process.argv[2] || 'out');
const port = Number(process.argv[3] || 3001);
const types = { '.html': 'text/html; charset=utf-8', '.css': 'text/css', '.js': 'application/javascript', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.mp4': 'video/mp4', '.ttf': 'font/ttf', '.ico': 'image/x-icon' };
http.createServer((req, res) => {
 let file;
 try { const urlPath = decodeURIComponent(new URL(req.url, 'http://localhost').pathname); file = path.resolve(root, '.' + urlPath); } catch { res.writeHead(400).end(); return; }
 if (file !== root && !file.startsWith(root + path.sep)) { res.writeHead(403).end(); return; }
 if (fs.existsSync(file) && fs.statSync(file).isDirectory()) file = path.join(file, 'index.html');
 if (!fs.existsSync(file) || !fs.statSync(file).isFile()) { res.writeHead(404).end('Not found'); return; }
 const size = fs.statSync(file).size;
 const headers = { 'Content-Type': types[path.extname(file)] || 'application/octet-stream', 'Accept-Ranges': 'bytes' };
 const range = req.headers.range?.match(/^bytes=(\d+)-(\d*)$/);
 if (range) { const start = Number(range[1]); const end = Math.min(range[2] ? Number(range[2]) : size - 1, size - 1); if (start > end || start >= size) { res.writeHead(416, {'Content-Range': `bytes */${size}`}).end(); return; } res.writeHead(206, {...headers, 'Content-Range': `bytes ${start}-${end}/${size}`, 'Content-Length': end-start+1}); if (req.method === 'HEAD') res.end(); else fs.createReadStream(file, {start,end}).pipe(res); }
 else { res.writeHead(200, {...headers,'Content-Length':size}); if(req.method==='HEAD')res.end();else fs.createReadStream(file).pipe(res); }
}).listen(port, '127.0.0.1', () => console.log(`Phagecon preview: http://localhost:${port}`));
