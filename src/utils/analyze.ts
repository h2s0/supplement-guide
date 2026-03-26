import { supplementRules, combinationRules } from '../data/supplements'
import type { AnalysisResult, FoodTimingType, SupplementRule } from '../types'

const FOOD_TIMING_LABELS: Record<FoodTimingType, string> = {
  empty_stomach: '공복',
  with_food: '식사 중',
  after_meal: '식후',
  either: '무관',
}

function normalize(str: string): string {
  return str.toLowerCase().trim().replace(/\s+/g, '')
}

export function matchSupplement(input: string): SupplementRule | null {
  const n = normalize(input)
  for (const rule of supplementRules) {
    if (normalize(rule.name) === n) return rule
    if (rule.aliases.some((alias) => normalize(alias) === n)) return rule
  }
  return null
}

export function analyzeSupplements(inputs: string[]): AnalysisResult {
  const matched = new Map<string, SupplementRule>()
  const unrecognized: string[] = []

  for (const input of inputs) {
    const rule = matchSupplement(input)
    if (rule) {
      matched.set(rule.id, rule)
    } else {
      unrecognized.push(input)
    }
  }

  const morning: AnalysisResult['morning'] = []
  const evening: AnalysisResult['evening'] = []

  for (const rule of matched.values()) {
    const item = { supplement: rule, foodTimingLabel: FOOD_TIMING_LABELS[rule.withFood] }
    if (rule.timing === 'morning') morning.push(item)
    else if (rule.timing === 'evening') evening.push(item)
    else {
      morning.push(item)
      evening.push(item)
    }
  }

  const matchedIds = [...matched.keys()]
  const synergies: AnalysisResult['synergies'] = []
  const conflicts: AnalysisResult['conflicts'] = []

  for (const combo of combinationRules) {
    const [a, b] = combo.ids
    if (matchedIds.includes(a) && matchedIds.includes(b)) {
      const names = [matched.get(a)!.name, matched.get(b)!.name]
      if (combo.type === 'synergy') {
        synergies.push({ names, reason: combo.reason })
      } else {
        conflicts.push({ names, reason: combo.reason })
      }
    }
  }

  return { morning, evening, unrecognized, synergies, conflicts }
}
