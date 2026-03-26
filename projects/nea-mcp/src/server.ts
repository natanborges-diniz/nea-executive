import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const WORKSPACE = path.resolve(__dirname, '../../');
const LENS_ROOT = path.resolve(WORKSPACE, 'projects/json-lens-wizard');

function readTextSafe(p: string) {
  try {
    return fs.readFileSync(p, 'utf8');
  } catch {
    return null;
  }
}

function readJsonSafe(p: string) {
  try {
    return JSON.parse(fs.readFileSync(p, 'utf8'));
  } catch {
    return null;
  }
}

const server = http.createServer((req, res) => {
  const url = new URL(req.url || '/', `http://${req.headers.host}`);
  res.setHeader('Content-Type', 'application/json; charset=utf-8');

  if (url.pathname === '/health') {
    res.end(JSON.stringify({ ok: true, service: 'nea-mcp', mode: 'central' }));
    return;
  }

  if (url.pathname === '/domains') {
    res.end(JSON.stringify({ ok: true, domains: ['executive', 'projects', 'lovable', 'json-lens-wizard'] }));
    return;
  }

  if (url.pathname === '/executive/status') {
    const projectStatus = readTextSafe(path.join(LENS_ROOT, 'docs/PROJECT_STATUS.md'));
    const executivePlan = readTextSafe(path.join(LENS_ROOT, 'docs/EXECUTIVE_PLAN.md'));
    res.end(JSON.stringify({ ok: true, projectStatus, executivePlan }));
    return;
  }

  if (url.pathname === '/projects/json-lens-wizard/normalized') {
    const families = readJsonSafe(path.join(LENS_ROOT, 'data/normalized/families-comparison-table.json'));
    const materials = readJsonSafe(path.join(LENS_ROOT, 'data/normalized/materials-canonical-map.json'));
    const treatments = readJsonSafe(path.join(LENS_ROOT, 'data/normalized/treatments-canonical-map.json'));
    const benefits = readJsonSafe(path.join(LENS_ROOT, 'data/normalized/family-benefits-table.json'));
    res.end(JSON.stringify({ ok: true, families, materials, treatments, benefits }));
    return;
  }

  if (url.pathname === '/projects/json-lens-wizard/docs') {
    const comparison = readTextSafe(path.join(LENS_ROOT, 'docs/extraction/ESSILOR_HOYA_ZEISS_COMPARISON.md'));
    const backlog = readTextSafe(path.join(LENS_ROOT, 'docs/LOVABLE_EXECUTION_BACKLOG.md'));
    const visual = readTextSafe(path.join(LENS_ROOT, 'docs/VISUAL_COMPARISON_REQUIREMENTS.md'));
    res.end(JSON.stringify({ ok: true, comparison, backlog, visual }));
    return;
  }

  res.statusCode = 404;
  res.end(JSON.stringify({ ok: false, error: 'not_found' }));
});

server.listen(PORT, () => {
  console.log(`nea-mcp listening on ${PORT}`);
});
