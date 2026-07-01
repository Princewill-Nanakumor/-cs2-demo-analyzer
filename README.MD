# CS2 Demo Analyzer

A TypeScript tool that analyzes Counter-Strike 2 demo files using `@laihoe/demoparser2`.

## Features

- Parses player death events
- Tracks player positions and view angles
- Calculates mouse movement before death
- Measures the victim's viewing angle relative to the killer
- Scores deaths based on surprise
- Outputs ranked results to `analysis.json`
- Includes `startTick` and `endTick` to simplify video rendering

## Run

```bash
npm install
npm start
```
