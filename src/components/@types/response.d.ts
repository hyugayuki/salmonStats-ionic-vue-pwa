export interface LegacyStats {
  job_results: {
    is_clear: number;
    is_failure: number;
    failure_waves: FailureWave[];
  };
  wave_results: WaveResult[][];
  boss_results: BossResult[];
  weapon_results: WeaponResult[];
  grade_results: GradeResult[];
}

export interface WeaponResult {
  nsaid: string;
  name: string;
  shifts_worked: number;
  supplied_weapon_counts: number;
  rank: number;
  thumbnail_url?: string;
}

export interface BossResult {
  boss_counts: number;
  boss_kill_counts: number;
  boss_counts_max: number;
  boss_kill_counts_max: number;
}

interface WaveResult {
  golden_ikura_num: number;
  ikura_num: number;
  count: number;
  event_type?: number;
  water_level?: number;
  rank?: number;
  names?: string[];
}

interface FailureWave {
  failure_wave: number;
  time_limit: number;
  wipe_out: number;
}

export interface Schedule {
  start_time: string;
  stage_id: number;
  end_time: string;
  rare_weapon?: number;
  weapon_list: number[];
}

interface JobResult {
  is_clear: number;
  is_failure: number;
  failure_waves: FailureWave[];
}

interface Player {
  nsaid: string;
  name: string;
  grade_point?: number;
}

interface Wave {
  event_type: number;
  water_level: number;
  golden_ikura_num: number;
  golden_ikura_pop_num: number;
  ikura_num: number;
  quota_num: number;
}

interface Result {
  salmon_id: number;
  job_result: JobResult;
  golden_ikura_num: number;
  ikura_num: number;
  no_night_waves: boolean;
  danger_rate: number;
  play_time: string;
  waves: Wave[];
}

interface TotalRank {
  golden_ikura_num: number;
  rank: number;
  members: string[];
  names: string[];
}

interface WeaponRank {
  rank: number;
  shifts_worked: number;
  supplied_weapon_counts: number;
  nsaid: string;
  name: string;
  thumbnail_url?: string;
}

export interface GradeResult {
  rank: number;
  shifts_worked: number;
  grade_point_max: number;
  nsaid: string;
  name: string;
  thumbnail_url?: string;
}

interface Ranking {
  total: TotalRank[][];
  waves: TotalRank[][][];
  weapons?: WeaponRank[];
}
