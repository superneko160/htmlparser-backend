# htmlparser

A WebAPI to parse HTML and inspect attributes of elements.

![workflow](https://github.com/superneko160/htmlparser-backend/actions/workflows/deploy.yml/badge.svg)
[![Open in Visual Studio Code](https://img.shields.io/static/v1?logo=visualstudiocode&label=&message=Open%20in%20Visual%20Studio%20Code&labelColor=2c2c32&color=007acc&logoColor=007acc)](https://open.vscode.dev/superneko160/htmlparser-backend)


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
