import { useState } from 'react'
import { Sun, Moon, BedDouble, ChevronDown } from 'lucide-react'
import type { AnalysisItem } from '../types'
import { capImg, drinkImg, gelImg } from '../assets'

interface Props {
  slot: 'morning' | 'evening' | 'bedtime'
  items: AnalysisItem[]
}

const FOOD_TIMING_STYLE: Record<string, string> = {
  공복: 'bg-orange-100 text-orange-700',
  식후: 'bg-sky-100 text-sky-700',
  무관: 'bg-surface-mid text-outline',
}

const SLOT_CONFIG = {
  morning: {
    title: '아침 복용',
    gradient: 'linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%)',
    iconBg: 'bg-white/70',
    iconColor: 'text-blue-600',
    icon: <Sun size={17} />,
    char: capImg,
  },
  evening: {
    title: '저녁 복용',
    gradient: 'linear-gradient(135deg, #f0fdfa 0%, #ccfbf1 100%)',
    iconBg: 'bg-white/70',
    iconColor: 'text-teal-600',
    icon: <Moon size={17} />,
    char: drinkImg,
  },
  bedtime: {
    title: '취침 전 복용',
    gradient: 'linear-gradient(135deg, #f5f3ff 0%, #ede9fe 100%)',
    iconBg: 'bg-white/70',
    iconColor: 'text-violet-600',
    icon: <BedDouble size={17} />,
    char: gelImg,
  },
} as const

export default function TimeSlotCard({ slot, items }: Props) {
  const cfg = SLOT_CONFIG[slot]
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
    <div className="bg-surface-low rounded-3xl overflow-hidden flex flex-col">
      {/* 컬러 헤더 + 캐릭터 */}
      <div
        className="flex items-end justify-between gap-3 px-5 pt-5"
        style={{ background: cfg.gradient }}
      >
        <div className="flex items-center gap-2.5 pb-4">
          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${cfg.iconBg}`}>
            <span className={cfg.iconColor}>{cfg.icon}</span>
          </div>
          <div>
            <h3 className="text-sm font-bold text-on-surface">{cfg.title}</h3>
            <p className="text-xs text-outline">{items.length}가지</p>
          </div>
        </div>
        <img
          src={cfg.char}
          alt=""
          className="w-16 sm:w-20 shrink-0 drop-shadow-md pointer-events-none select-none"
        />
      </div>

      {/* 영양제 목록 */}
      <div className="p-4 flex flex-col gap-2">
        {items.length === 0 ? (
          <div className="border-2 border-dashed border-outline-soft/40 rounded-2xl flex justify-center items-center py-6">
            <span className="text-sm text-outline">복용할 영양제가 없습니다</span>
          </div>
        ) : (
          items.map(({ supplement, foodTimingLabel }) => {
            const isOpen = expanded.has(supplement.id)
            const showToggle = hasDetail({ supplement, foodTimingLabel })

            return (
              <div key={supplement.id} className="bg-surface-white rounded-2xl overflow-hidden">
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
                          <li key={i} className="text-xs text-red-500 flex gap-1.5">
                            <span className="shrink-0 mt-0.5">!</span>{w}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
