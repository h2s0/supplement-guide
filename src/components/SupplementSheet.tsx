import { useEffect } from 'react'
import { X } from 'lucide-react'
import type { SupplementRule } from '../types'

interface Props {
  supplement: SupplementRule | null
  foodTimingLabel: string
  onClose: () => void
}

const TIMING_LABEL: Record<string, string> = {
  morning: '아침 복용',
  evening: '저녁 복용',
  bedtime: '취침 전 복용',
  both: '아침·저녁 복용',
}

export default function SupplementSheet({ supplement, foodTimingLabel, onClose }: Props) {
  // 시트 열릴 때 body 스크롤 잠금 (스크롤바 너비 보정으로 움찔거림 방지)
  useEffect(() => {
    if (supplement) {
      const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth
      document.body.style.paddingRight = `${scrollbarWidth}px`
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
    return () => {
      document.body.style.overflow = ''
      document.body.style.paddingRight = ''
    }
  }, [supplement])

  return (
    <>
      {/* 백드롭 */}
      <div
        className={`fixed inset-0 bg-black/30 z-40 transition-opacity duration-200
          ${supplement ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
      />

      {/* 시트 */}
      <div
        className={`fixed bottom-0 left-0 right-0 z-50 transition-transform duration-300 ease-out
          ${supplement ? 'translate-y-0' : 'translate-y-full'}`}
      >
        <div className="bg-white rounded-t-3xl shadow-2xl max-w-2xl mx-auto">
          {/* 드래그 핸들 */}
          <div className="flex justify-center pt-3 pb-1">
            <div className="w-10 h-1 rounded-full bg-outline-soft" />
          </div>

          {/* 헤더 */}
          <div className="flex items-center justify-between px-6 pt-3 pb-4">
            <div>
              <h3 className="text-base font-extrabold text-on-surface">{supplement?.name}</h3>
              <div className="flex gap-1.5 mt-1.5">
                {supplement && (
                  <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                    {TIMING_LABEL[supplement.timing] ?? supplement.timing}
                  </span>
                )}
                <span className="text-[11px] font-semibold px-2 py-0.5 rounded-full bg-surface-low text-outline">
                  {foodTimingLabel}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-surface-low flex items-center justify-center cursor-pointer hover:bg-surface-mid transition-colors"
            >
              <X size={15} className="text-outline" />
            </button>
          </div>

          {/* 내용 */}
          <div className="px-6 pb-8 space-y-4">
            {supplement?.reason && (
              <p className="text-sm text-on-surface-muted leading-relaxed">
                {supplement.reason}
              </p>
            )}

            {(supplement?.tips?.length ?? 0) > 0 && (
              <div>
                <p className="text-xs font-bold text-on-surface mb-2">복용 팁</p>
                <ul className="space-y-1.5">
                  {supplement!.tips.map((tip, i) => (
                    <li key={i} className="text-sm text-outline flex gap-2 leading-relaxed">
                      <span className="shrink-0 text-primary mt-0.5">·</span>
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {(supplement?.warnings?.length ?? 0) > 0 && (
              <div>
                <p className="text-xs font-bold text-red-500 mb-2">주의사항</p>
                <ul className="space-y-1.5">
                  {supplement!.warnings.map((w, i) => (
                    <li key={i} className="text-sm text-red-500 flex gap-2 leading-relaxed">
                      <span className="shrink-0 mt-0.5">!</span>
                      {w}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
