# CS2 Demo Analyzer

A Node.js + TypeScript project that analyzes Counter-Strike 2 demo files and detects potential "false confidence" deaths, where a player dies after failing to properly clear an angle.

## Features

- Parse CS2 `.dem` files
- Extract player death events
- Extract player positions and view angles
- Score suspicious deaths based on:
  - victim view direction
  - mouse movement before death
  - angle to attacker
- Export results to `analysis.json`

## Installation

```bash
npm install
```

## Run

```bash
npm start
```

## Output

The analyzer creates:

```
analysis.json
```

containing ranked candidate moments for manual review.
