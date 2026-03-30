import { useState } from 'react'
import { Sun, Moon, BedDouble, ChevronDown } from 'lucide-react'
import type { AnalysisItem } from '../types'

interface Props {
  slot: 'morning' | 'evening' | 'bedtime'
  items: AnalysisItem[]
}

const FOOD_TIMING_STYLE: Record<string, string> = {
  공복:      'bg-orange-100 text-orange-700',
  식후:      'bg-sky-100    text-sky-700',
  무관:      'bg-surface-mid text-outline',
}

export default function TimeSlotCard({ slot, items }: Props) {
  const isMorning = slot === 'morning'
  const isBedtime = slot === 'bedtime'
  const [expanded, setExpanded] = useState<Set<string>>(new Set())

  function toggle(id: string) {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const hasDetail = (item: AnalysisItem) =>
    item.supplement.reason || item.supplement.tips.length > 0 || item.supplement.warnings.length > 0

  return (
    <div className="bg-surface-low rounded-3xl p-6 flex flex-col gap-5">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isMorning ? 'bg-tertiary-light' : isBedtime ? 'bg-bedtime-icon-bg' : 'bg-evening-icon-bg'}`}>
          {isMorning
            ? <Sun      size={18} className="text-on-tertiary-light" />
            : isBedtime
              ? <BedDouble size={18} className="text-bedtime-icon" />
              : <Moon     size={18} className="text-evening-icon" />
          }
        </div>
        <div>
          <h3 className="text-base font-bold text-on-surface">
            {isMorning ? '아침 복용' : isBedtime ? '취침 전 복용' : '저녁 복용'}
          </h3>
          <p className="text-xs text-outline">{items.length}가지</p>
        </div>
      </div>

      {/* 영양제 목록 */}
      {items.length === 0 ? (
        <div className="border-2 border-dashed border-outline-soft/40 rounded-2xl flex justify-center items-center py-6">
          <span className="text-sm text-outline">복용할 영양제가 없습니다</span>
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {items.map(({ supplement, foodTimingLabel }) => {
            const isOpen = expanded.has(supplement.id)
            const showToggle = hasDetail({ supplement, foodTimingLabel })

            return (
              <div key={supplement.id} className="bg-surface-white rounded-2xl overflow-hidden">
                {/* 항상 보이는 행 */}
                <button
                  onClick={() => showToggle && toggle(supplement.id)}
                  className={`w-full flex items-center justify-between gap-2 px-4 py-3 transition-colors duration-150
                    ${showToggle ? 'cursor-pointer hover:bg-surface-low' : 'cursor-default'}`}
                >
                  <span className="text-sm font-semibold text-on-surface">{supplement.name}</span>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${FOOD_TIMING_STYLE[foodTimingLabel] ?? 'bg-surface-mid text-outline'}`}>
                      {foodTimingLabel}
                    </span>
                    {showToggle && (
                      <ChevronDown
                        size={15}
                        className={`text-outline transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                      />
                    )}
                  </div>
                </button>

                {/* 아코디언 상세 */}
                {isOpen && (
                  <div className="px-4 pb-3.5 space-y-2 border-t border-surface-low">
                    {supplement.reason && (
                      <p className="text-xs text-on-surface-muted leading-relaxed pt-2.5">{supplement.reason}</p>
                    )}
                    {supplement.tips.length > 0 && (
                      <ul className="space-y-0.5">
                        {supplement.tips.map((tip, i) => (
                          <li key={i} className="text-xs text-outline flex gap-1.5">
                            <span className="shrink-0 mt-0.5">·</span>{tip}
                          </li>
                        ))}
                      </ul>
                    )}
                    {supplement.warnings.length > 0 && (
                      <ul className="space-y-0.5">
                        {supplement.warnings.map((w, i) => (
                          <li key={i} className="text-xs text-red-600 flex gap-1.5">
                            <span className="shrink-0 mt-0.5">!</span>{w}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
