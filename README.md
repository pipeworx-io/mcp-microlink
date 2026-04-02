# @pipeworx/mcp-microlink

MCP server for URL metadata extraction and screenshots via the [Microlink API](https://microlink.io/). Free tier, no authentication required.

## Tools

| Tool | Description |
|------|-------------|
| `get_metadata` | Extract metadata from any URL (title, description, image, author, publisher, logo) |
| `take_screenshot` | Take a screenshot of a webpage and return the image URL |

## Quickstart via Pipeworx Gateway

```bash
curl -X POST https://gateway.pipeworx.io/mcp \
  -H "Content-Type: application/json" \
  -d '{
    "jsonrpc": "2.0",
    "method": "tools/call",
    "params": {
      "name": "microlink__get_metadata",
      "arguments": { "url": "https://github.com" }
    },
    "id": 1
  }'
```

## License

MIT
