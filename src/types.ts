export interface DeathEvent {
  tick: number;
  user_name: string;
  user_steamid: string;
  attacker_name: string;
  attacker_steamid: string;
  weapon: string;
}

export interface TickData {
  tick: number;

  X: number;
  Y: number;
  Z: number;

  pitch: number;
  yaw: number;

  steamid: string;
  name: string;
}

export interface Candidate {
  tick: number;

  victim: string;
  killer: string;

  weapon: string;

  yawMovement: number;
  angleDifference: number;

  score: number;
}
