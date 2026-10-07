import type { Scenario } from './types'

const esc = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

/** Chọn ngẫu nhiên một biến thể và thay chuỗi trong toàn bộ kịch bản (một lượt, không thay chồng). */
export function pickVariant(sc: Scenario): { scenario: Scenario; variantId: number } {
  const variantId = Math.floor(Math.random() * sc.variants.length)
  const map = sc.variants[variantId]
  const keys = Object.keys(map).sort((a, b) => b.length - a.length)
  if (keys.length === 0) return { scenario: sc, variantId }
  const re = new RegExp(keys.map(esc).join('|'), 'g')
  const json = JSON.stringify(sc).replace(re, (m) => map[m])
  return { scenario: JSON.parse(json) as Scenario, variantId }
}
