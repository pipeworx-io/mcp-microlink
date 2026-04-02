/**
 * Microlink MCP — wraps Microlink API (free tier, no auth required)
 *
 * Tools:
 * - get_metadata: Extract metadata (title, description, image, author, etc.) from any URL
 * - take_screenshot: Get a screenshot URL for any webpage
 */

interface McpToolDefinition {
  name: string;
  description: string;
  inputSchema: {
    type: 'object';
    properties: Record<string, unknown>;
    required?: string[];
  };
}

interface McpToolExport {
  tools: McpToolDefinition[];
  callTool: (name: string, args: Record<string, unknown>) => Promise<unknown>;
}

const BASE_URL = 'https://api.microlink.io';

type RawImage = {
  url: string;
  width?: number;
  height?: number;
  type?: string;
};

type RawLogo = {
  url: string;
  width?: number;
  height?: number;
  type?: string;
};

type RawMetadataResponse = {
  status: string;
  data: {
    title?: string;
    description?: string;
    url?: string;
    author?: string;
    publisher?: string;
    date?: string;
    lang?: string;
    image?: RawImage;
    logo?: RawLogo;
    video?: RawImage;
    iframe?: { src: string };
    screenshot?: RawImage;
  };
};

const tools: McpToolExport['tools'] = [
  {
    name: 'get_metadata',
    description:
      'Extract metadata from any URL including title, description, image, author, publisher, logo, and more.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'The URL to extract metadata from.',
        },
      },
      required: ['url'],
    },
  },
  {
    name: 'take_screenshot',
    description:
      'Take a screenshot of a webpage and return the screenshot image URL.',
    inputSchema: {
      type: 'object',
      properties: {
        url: {
          type: 'string',
          description: 'The URL of the webpage to screenshot.',
        },
      },
      required: ['url'],
    },
  },
];

async function callTool(name: string, args: Record<string, unknown>): Promise<unknown> {
  switch (name) {
    case 'get_metadata':
      return getMetadata(args.url as string);
    case 'take_screenshot':
      return takeScreenshot(args.url as string);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}

async function getMetadata(url: string) {
  const endpoint = `${BASE_URL}/?url=${encodeURIComponent(url)}`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Microlink API error: ${res.status}`);
  const data = (await res.json()) as RawMetadataResponse;
  if (data.status !== 'success') {
    throw new Error(`Microlink API returned status: ${data.status}`);
  }
  const d = data.data;
  return {
    url: d.url,
    title: d.title,
    description: d.description,
    author: d.author,
    publisher: d.publisher,
    date: d.date,
    lang: d.lang,
    image: d.image ? { url: d.image.url, width: d.image.width, height: d.image.height } : null,
    logo: d.logo ? { url: d.logo.url, width: d.logo.width, height: d.logo.height } : null,
  };
}

async function takeScreenshot(url: string) {
  const endpoint = `${BASE_URL}/?url=${encodeURIComponent(url)}&screenshot=true`;
  const res = await fetch(endpoint);
  if (!res.ok) throw new Error(`Microlink API error: ${res.status}`);
  const data = (await res.json()) as RawMetadataResponse;
  if (data.status !== 'success') {
    throw new Error(`Microlink API returned status: ${data.status}`);
  }
  const screenshot = data.data.screenshot;
  return {
    url,
    screenshot_url: screenshot?.url ?? null,
    width: screenshot?.width ?? null,
    height: screenshot?.height ?? null,
  };
}

export default { tools, callTool } satisfies McpToolExport;
