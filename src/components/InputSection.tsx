import { Sparkles } from 'lucide-react'
import type { AnalysisResult } from '../types'
import QuickAddChips from './QuickAddChips'
import SupplementInput from './SupplementInput'
import SupplementTag from './SupplementTag'

interface Props {
  supplements: string[]
  onAdd: (name: string) => void
  onRemove: (name: string) => void
  onAnalyze: () => void
  result: AnalysisResult | null
}

export default function InputSection({ supplements, onAdd, onRemove, onAnalyze, result }: Props) {
  function handleAdd(name: string) {
    if (!supplements.includes(name)) onAdd(name)
  }

  return (
    <section className="space-y-5">
      <SupplementInput onAdd={handleAdd} />
      <QuickAddChips added={supplements} onAdd={handleAdd} onRemove={onRemove} />

      {supplements.length > 0 && (
        <div className="space-y-3">
          <p className="text-xs font-semibold text-outline uppercase tracking-wider">
            추가된 영양제 ({supplements.length}개)
          </p>
          <div className="flex flex-wrap gap-2">
            {supplements.map((name) => (
              <SupplementTag key={name} name={name} onRemove={onRemove} />
            ))}
          </div>
        </div>
      )}

      <button
        onClick={onAnalyze}
        disabled={supplements.length === 0}
        className={`w-full flex items-center justify-center gap-2 min-h-[48px] rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer
          ${supplements.length === 0
            ? 'bg-surface-high text-outline cursor-not-allowed'
            : 'bg-primary text-on-primary hover:bg-primary-dark shadow-md active:scale-[0.98]'
          }`}
      >
        <Sparkles size={16} />
        {result ? '다시 분석하기' : '복용 스케줄 분석하기'}
      </button>
    </section>
  )
}
