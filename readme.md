# htmlparser

A WebAPI to parse HTML and inspect attributes of elements.

## Usage

| Result | Request | URL |
| ---- | ---- | ---- |
| Return JSON | POST | ```https://htmlparser.supernekocat31.workers.dev/parse``` |
| Download JSON | POST | ```https://htmlparser.supernekocat31.workers.dev/parse/json``` |
| Donwload CSV | POST | ```https://htmlparser.supernekocat31.workers.dev/parse/csv``` |

## SetUp

```bash
cd htmlparser
bun install
```

## Run

```bash
cd htmlparser
bun run dev
```

## Access

```
http://localhost:8787
```

## Test

```bash
cd htmlparser
bun test
```

## Lint
```bash
cd htmlparser
bun lint
```

## Format
```bash
cd htmlparser
bun format
```

## Tech Stacks

| Category | Technology |
| ---- | ---- |
| Language | TypeScript |
| Framework | Hono |
| Platform | Cloudflare Workers |
| CI/CD | GitHub Actions |
| Testing Framework | Vitest |
| Formatter / Linter | Biome |
| Development environment | Docker |
