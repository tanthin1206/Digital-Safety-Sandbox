import type { Choice, Scenario } from '../scenarios/types'

export type ScenarioResult = {
  outcome: 'trap' | 'safe'
  score: number
  checks: number
}

/**
 * Điểm mỗi tình huống (0-100):
 * 60 nếu quyết định cuối an toàn; 25 nếu có xác minh/kiểm tra đúng cách trước khi quyết định;
 * 15 nếu không dùng sai cách (vd gọi vào số của kẻ lừa đảo).
 */
export function computeScore(sc: Scenario, used: string[], final: Choice): ScenarioResult {
  const usedChecks = sc.checks.filter((c) => used.includes(c.id))
  const goodUsed = usedChecks.some((c) => !c.risky) || !!final.verifies
  const riskyUsed = usedChecks.some((c) => c.risky)
  const outcome = final.outcome === 'safe' ? 'safe' : 'trap'
  const score = (outcome === 'safe' ? 60 : 0) + (goodUsed ? 25 : 0) + (goodUsed && !riskyUsed ? 15 : 0)
  return { outcome, score, checks: used.length }
}
