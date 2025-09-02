# htmlparser

![workflow](https://github.com/superneko160/htmlparser-backend/actions/workflows/deploy.yml/badge.svg)

A WebAPI to parse HTML and inspect attributes of elements.

Frontend App: [htmlparser-frontend](https://github.com/superneko160/htmlparser-frontend)

## Usage

| Result | Request Method | URL |
| ---- | ---- | ---- |
| Return JSON | POST | ```https://htmlparser.supernekocat31.workers.dev/parse``` |
| Download JSON | POST | ```https://htmlparser.supernekocat31.workers.dev/parse/json``` |
| Donwload CSV | POST | ```https://htmlparser.supernekocat31.workers.dev/parse/csv``` |

### Use Curl

```sh
curl \
  -F "url=https://github.com/superneko160/htmlparser-backend/blob/main/htmlparser/src/index.ts" \
  -F "elements=h1,span" \
  -F "attrs[]=id" \
  -F "attrs[]=class" \
  https://htmlparser.supernekocat31.workers.dev/parse
```

## SetUp

```bash
cd htmlparser
bun install
```

## Run

```bash
bun run dev
```

## Access

```
http://localhost:8787
```

## Test

```bash
bun test
```

## Lint

```bash
bun lint
```

## Format

```bash
bun format
```

## Stacks

| Category | Technology |
| ---- | ---- |
| Language | TypeScript |
| Package manager | Bun |
| Framework | Hono |
| Platform | Cloudflare Workers |
| CI/CD | GitHub Actions |
| Testing Framework | Vitest |
| Formatter / Linter | Biome |
| Development environment | Docker |
