export type TimingType = 'morning' | 'evening' | 'both'
export type FoodTimingType = 'empty_stomach' | 'with_food' | 'after_meal' | 'either'
export type CombinationType = 'synergy' | 'avoid'

export interface SupplementRule {
  id: string
  name: string
  aliases: string[]
  timing: TimingType
  withFood: FoodTimingType
  reason: string
  tips: string[]
  warnings: string[]
}

export interface CombinationRule {
  ids: [string, string]
  type: CombinationType
  reason: string
}

export interface AnalysisItem {
  supplement: SupplementRule
  foodTimingLabel: string
}

export interface CombinationResult {
  names: string[]
  reason: string
}

export interface AnalysisResult {
  morning: AnalysisItem[]
  evening: AnalysisItem[]
  unrecognized: string[]
  synergies: CombinationResult[]
  conflicts: CombinationResult[]
}
