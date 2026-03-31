import { useState } from 'react'
import { Sun, Moon, BedDouble, Camera } from 'lucide-react'
import type { AnalysisResult, SupplementRule } from '../types'
import { capImg, drinkImg, gelImg } from '../assets'
import SupplementSheet from './SupplementSheet'

type Props = Pick<AnalysisResult, 'morning' | 'evening' | 'bedtime'>

const TIMING_BADGE: Record<string, string> = {
  공복: 'bg-orange-200 text-orange-700',
  식후: 'bg-sky-100 text-sky-600',
  무관: 'bg-white/60 text-stone-400',
}

const SLOTS = [
  {
    key: 'morning' as const,
    label: '아침 복용',
    icon: <Sun size={14} />,
    char: capImg,
  },
  {
    key: 'evening' as const,
    label: '저녁 복용',
    icon: <Moon size={14} />,
    char: drinkImg,
  },
  {
    key: 'bedtime' as const,
    label: '취침 전 복용',
    icon: <BedDouble size={14} />,
    char: gelImg,
  },
]

export default function ScheduleCard({ morning, evening, bedtime }: Props) {
  const data = { morning, evening, bedtime }
  const [selected, setSelected] = useState<{ supplement: SupplementRule; foodTimingLabel: string } | null>(null)

  return (
    <>
    <div
      className="rounded-3xl overflow-hidden shadow-sm border border-orange-100"
      style={{ background: 'linear-gradient(150deg, #fff7ed 0%, #fefce8 45%, #fdf4ff 100%)' }}
    >
      {/* 카드 헤더 */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-orange-100/60">
        <h2 className="text-sm font-extrabold text-on-surface tracking-tight">나의 복용 스케줄</h2>
        <span className="text-[11px] text-outline font-medium">오늘의 영양제</span>
      </div>

      {/* 슬롯 3개 — 영양제 없는 슬롯은 숨김 */}
      {SLOTS.filter((slot) => data[slot.key].length > 0).map((slot, i, arr) => {
        const items = data[slot.key]
        const isLast = i === arr.length - 1

        return (
          <div key={slot.key} className={!isLast ? 'border-b border-orange-100/60' : ''}>

            {/* 슬롯 헤더 */}
            <div className="flex items-end justify-between px-4 pt-3">
              <div className="flex items-center gap-2 pb-2.5">
                <div className="w-6 h-6 rounded-full flex items-center justify-center bg-white/70 shrink-0 text-primary">
                  {slot.icon}
                </div>
                <span className="text-xs font-bold text-on-surface">{slot.label}</span>
                <span className="text-[11px] text-outline">{items.length}가지</span>
              </div>
              <img
                src={slot.char}
                alt=""
                className="w-10 shrink-0 pointer-events-none select-none drop-shadow-sm"
              />
            </div>

            {/* 영양제 칩 */}
            <div className="px-4 pb-4 flex flex-wrap gap-1.5 min-h-[48px] items-center">
              {items.map(({ supplement, foodTimingLabel }) => (
                  <button
                    key={supplement.id}
                    onClick={() => setSelected({ supplement, foodTimingLabel })}
                    className="flex items-center gap-1 pl-2.5 pr-1 py-1 rounded-full bg-white/70 border border-orange-100 text-stone-800 cursor-pointer hover:bg-white transition-colors duration-150 active:scale-[0.97]"
                  >
                    <span className="text-xs font-semibold">{supplement.name}</span>
                    <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${TIMING_BADGE[foodTimingLabel] ?? 'bg-white/60 text-stone-400'}`}>
                      {foodTimingLabel}
                    </span>
                  </button>
              ))}
            </div>

          </div>
        )
      })}

      {/* 캡처 안내 */}
      <div className="flex items-center justify-center gap-1.5 py-2.5 border-t border-orange-100/60">
        <Camera size={12} className="text-primary/60" />
        <p className="text-[11px] text-primary/60 font-medium">스크린샷으로 저장해서 활용하세요</p>
      </div>

    </div>

    <SupplementSheet
      supplement={selected?.supplement ?? null}
      foodTimingLabel={selected?.foodTimingLabel ?? ''}
      onClose={() => setSelected(null)}
    />
    </>
  )
}
