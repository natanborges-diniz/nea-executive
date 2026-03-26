import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { createMcpExpressApp } from '@modelcontextprotocol/sdk/server/express.js';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as z from 'zod';

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

function buildServer() {
  const server = new McpServer({
    name: 'nea-mcp',
    version: '0.1.0'
  });

  server.registerTool('domains', {
    description: 'Lista os domínios disponíveis no MCP da Nea',
    inputSchema: {}
  }, async () => ({
    content: [{ type: 'text', text: JSON.stringify(['executive', 'projects', 'lovable', 'json-lens-wizard']) }]
  }));

  server.registerTool('executive_status', {
    description: 'Retorna status executivo consolidado do projeto de lentes',
    inputSchema: {}
  }, async () => {
    const projectStatus = readTextSafe(path.join(LENS_ROOT, 'docs/PROJECT_STATUS.md'));
    const executivePlan = readTextSafe(path.join(LENS_ROOT, 'docs/EXECUTIVE_PLAN.md'));
    return {
      content: [{ type: 'text', text: JSON.stringify({ projectStatus, executivePlan }) }]
    };
  });

  server.registerTool('json_lens_wizard_normalized', {
    description: 'Retorna os dados normalizados do projeto json-lens-wizard',
    inputSchema: {}
  }, async () => {
    const families = readJsonSafe(path.join(LENS_ROOT, 'data/normalized/families-comparison-table.json'));
    const materials = readJsonSafe(path.join(LENS_ROOT, 'data/normalized/materials-canonical-map.json'));
    const treatments = readJsonSafe(path.join(LENS_ROOT, 'data/normalized/treatments-canonical-map.json'));
    const benefits = readJsonSafe(path.join(LENS_ROOT, 'data/normalized/family-benefits-table.json'));
    return {
      content: [{ type: 'text', text: JSON.stringify({ families, materials, treatments, benefits }) }]
    };
  });

  server.registerTool('json_lens_wizard_docs', {
    description: 'Retorna documentos centrais do projeto json-lens-wizard',
    inputSchema: {
      kind: z.enum(['comparison', 'backlog', 'visual', 'all']).optional()
    }
  }, async ({ kind }) => {
    const comparison = readTextSafe(path.join(LENS_ROOT, 'docs/extraction/ESSILOR_HOYA_ZEISS_COMPARISON.md'));
    const backlog = readTextSafe(path.join(LENS_ROOT, 'docs/LOVABLE_EXECUTION_BACKLOG.md'));
    const visual = readTextSafe(path.join(LENS_ROOT, 'docs/VISUAL_COMPARISON_REQUIREMENTS.md'));
    const payload = { comparison, backlog, visual } as Record<string, string | null>;
    if (!kind || kind === 'all') {
      return { content: [{ type: 'text', text: JSON.stringify(payload) }] };
    }
    return { content: [{ type: 'text', text: JSON.stringify({ [kind]: payload[kind] }) }] };
  });

  return server;
}

const app = createMcpExpressApp({ host: '0.0.0.0' });

app.post('/mcp', async (req: any, res: any) => {
  const server = buildServer();
  try {
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
    res.on('close', () => {
      transport.close();
      server.close();
    });
  } catch (error) {
    console.error('MCP error:', error);
    if (!res.headersSent) {
      res.status(500).json({ jsonrpc: '2.0', error: { code: -32603, message: 'Internal server error' }, id: null });
    }
  }
});

app.get('/health', (_req: any, res: any) => {
  res.json({ ok: true, service: 'nea-mcp', mode: 'central', transport: 'streamable-http' });
});

app.get('/', (_req: any, res: any) => {
  res.json({ ok: true, service: 'nea-mcp', endpoint: '/mcp' });
});

app.listen(PORT, () => {
  console.log(`nea-mcp listening on ${PORT}`);
});
