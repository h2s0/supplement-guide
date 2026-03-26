import { Sun, Moon } from 'lucide-react'
import type { AnalysisItem } from '../types'

interface Props {
  slot: 'morning' | 'evening'
  items: AnalysisItem[]
}

const FOOD_TIMING_STYLE: Record<string, string> = {
  공복:      'bg-orange-100 text-orange-700',
  '식사 중': 'bg-green-100  text-green-700',
  식후:      'bg-sky-100    text-sky-700',
  무관:      'bg-surface-mid text-outline',
}

export default function TimeSlotCard({ slot, items }: Props) {
  const isMorning = slot === 'morning'

  return (
    <div className="bg-surface-low rounded-3xl p-6 flex flex-col gap-5">
      {/* 헤더 */}
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isMorning ? 'bg-tertiary-light' : 'bg-primary-light'}`}>
          {isMorning
            ? <Sun  size={18} className="text-on-tertiary-light" />
            : <Moon size={18} className="text-evening-icon" />
          }
        </div>
        <div>
          <h3 className="text-base font-bold text-on-surface">
            {isMorning ? '아침 복용' : '저녁 복용'}
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
        <div className="flex flex-col gap-2.5">
          {items.map(({ supplement, foodTimingLabel }) => (
            <div
              key={supplement.id}
              className="bg-surface-white rounded-2xl p-4 flex flex-col gap-2 transition-all duration-200 hover:translate-x-0.5"
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-on-surface">{supplement.name}</span>
                <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full shrink-0 ${FOOD_TIMING_STYLE[foodTimingLabel] ?? 'bg-surface-mid text-outline'}`}>
                  {foodTimingLabel}
                </span>
              </div>
              <p className="text-xs text-on-surface-muted leading-relaxed">{supplement.reason}</p>
              {supplement.tips.length > 0 && (
                <ul className="space-y-0.5 mt-0.5">
                  {supplement.tips.map((tip, i) => (
                    <li key={i} className="text-xs text-outline flex gap-1.5">
                      <span className="shrink-0 mt-0.5">·</span>{tip}
                    </li>
                  ))}
                </ul>
              )}
              {supplement.warnings.length > 0 && (
                <ul className="space-y-0.5 mt-0.5">
                  {supplement.warnings.map((w, i) => (
                    <li key={i} className="text-xs text-red-600 flex gap-1.5">
                      <span className="shrink-0 mt-0.5">!</span>{w}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
