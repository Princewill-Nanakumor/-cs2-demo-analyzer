const { parseEvent } = require("@laihoe/demoparser2");

export function getDeaths(path: string) {
  return parseEvent(path, "player_death", [], []);
}
