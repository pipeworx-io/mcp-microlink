# mcp-microlink

Microlink MCP — wraps Microlink API (free tier, no auth required)

Part of [Pipeworx](https://pipeworx.io) — an MCP gateway connecting AI agents to 1394+ live data sources.

## Tools

| Tool | Description |
|------|-------------|
| `get_metadata` | Extract metadata from any URL to preview page content. Returns title, description, image, author, publisher, logo, and structured data—useful when you need to understand a webpage without visiting it directly. |
| `take_screenshot` | Capture a screenshot of any webpage. Returns image URL showing the rendered page layout and visual content—use to verify page state or design. |

## Quick Start

Add to your MCP client (Claude Desktop, Cursor, Windsurf, etc.):

```json
{
  "mcpServers": {
    "microlink": {
      "url": "https://gateway.pipeworx.io/microlink/mcp"
    }
  }
}
```

Or connect to the full Pipeworx gateway for access to all 1394+ data sources:

```json
{
  "mcpServers": {
    "pipeworx": {
      "url": "https://gateway.pipeworx.io/mcp"
    }
  }
}
```

## Using with ask_pipeworx

Instead of calling tools directly, you can ask questions in plain English:

```
ask_pipeworx({ question: "your question about Microlink data" })
```

The gateway picks the right tool and fills the arguments automatically.

## More

- [Docs and guides](https://pipeworx.io/docs)
- [pipeworx.io](https://pipeworx.io)

## License

MIT
