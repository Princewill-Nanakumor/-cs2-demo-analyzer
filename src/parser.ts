import { parseEvent, parseTicks } from "@laihoe/demoparser2";

const wantedProps = ["X", "Y", "Z", "pitch", "yaw", "steamid", "name"];

export function loadDemo(path: string) {
  const deaths = parseEvent(path, "player_death");

  const ticks = parseTicks(path, wantedProps);

  return {
    deaths,
    ticks,
  };
}
