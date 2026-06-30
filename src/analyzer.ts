import type { Candidate } from "./types.js";

function angleDiff(a: number, b: number): number {
  let diff = a - b;

  while (diff > 180) diff -= 360;
  while (diff < -180) diff += 360;

  return Math.abs(diff);
}

export function analyzeDemo(deaths: any[], ticks: any[]): Candidate[] {
  const results: Candidate[] = [];

  for (const death of deaths) {
    if (death.weapon === "world" || death.attacker_name === death.user_name) {
      continue;
    }

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

    let yawMovement = 0;

    for (let i = 1; i < victimTicks.length; i++) {
      yawMovement += angleDiff(victimTicks[i].yaw, victimTicks[i - 1].yaw);
    }

    const dx = killer.X - victim.X;
    const dy = killer.Y - victim.Y;

    const angleToKiller = (Math.atan2(dy, dx) * 180) / Math.PI;

    let angleDifference = angleToKiller - victim.yaw;

    while (angleDifference > 180) angleDifference -= 360;

    while (angleDifference < -180) angleDifference += 360;

    angleDifference = Math.abs(angleDifference);

    const score = angleDifference * 2 - yawMovement;

    results.push({
      tick: death.tick,

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
