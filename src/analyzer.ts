import type { Candidate } from "./types.js";

const TICKS_PER_SECOND = 64;
const PRE_ROLL_SECONDS = 5;
const POST_ROLL_SECONDS = 2;

function angleDiff(a: number, b: number): number {
  let diff = a - b;

  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;

  return Math.abs(diff);
}

export function analyzeDemo(deaths: any[], ticks: any[]): Candidate[] {
  const results: Candidate[] = [];

  for (const death of deaths) {
    // Ignore suicides and world damage
    if (death.weapon === "world" || death.attacker_name === death.user_name) {
      continue;
    }

    // Analyze just before the kill
    const analysisTick = death.tick - 8;

    const victim = ticks.find(
      (t) => t.steamid === death.user_steamid && t.tick === analysisTick,
    );

    const killer = ticks.find(
      (t) => t.steamid === death.attacker_steamid && t.tick === analysisTick,
    );

    if (!victim || !killer) continue;

    const victimTicks = ticks.filter(
      (t) =>
        t.steamid === death.user_steamid &&
        t.tick >= analysisTick - 128 &&
        t.tick <= analysisTick,
    );

    if (victimTicks.length < 2) continue;

    // Calculate total mouse movement
    let yawMovement = 0;

    for (let i = 1; i < victimTicks.length; i++) {
      yawMovement += angleDiff(victimTicks[i].yaw, victimTicks[i - 1].yaw);
    }

    // Direction from victim to killer
    const dx = killer.X - victim.X;
    const dy = killer.Y - victim.Y;

    const angleToKiller = (Math.atan2(dy, dx) * 180) / Math.PI;

    let angleDifference = angleToKiller - victim.yaw;

    while (angleDifference > 180) angleDifference -= 360;
    while (angleDifference < -180) angleDifference += 360;

    angleDifference = Math.abs(angleDifference);

    // Higher score = more likely the victim never saw the killer
    const score = angleDifference * 2 - yawMovement;

    // Clip boundaries for rendering
    const startTick = Math.max(
      0,
      death.tick - PRE_ROLL_SECONDS * TICKS_PER_SECOND,
    );

    const endTick = death.tick + POST_ROLL_SECONDS * TICKS_PER_SECOND;

    results.push({
      startTick,
      tick: death.tick,
      endTick,

      victim: death.user_name,
      killer: death.attacker_name,

      weapon: death.weapon,

      yawMovement: Number(yawMovement.toFixed(2)),
      angleDifference: Number(angleDifference.toFixed(2)),
      score: Number(score.toFixed(2)),
    });
  }

  return results.sort((a, b) => b.score - a.score);
}
