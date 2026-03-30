import { BookOpen, HelpCircle } from 'lucide-react'
import type { AnalysisResult } from '../types'
import CombinationSection from './CombinationSection'
import TimeSlotCard from './TimeSlotCard'

interface Props {
  result: AnalysisResult
}

export default function ResultSection({ result }: Props) {
  const { morning, evening, bedtime, unrecognized, synergies, conflicts } = result

  return (
    <section className="space-y-5">
      <div className="flex items-center gap-2 px-1">
        <BookOpen size={16} className="text-outline" />
        <h2 className="text-sm font-semibold text-on-surface-muted">복용 스케줄</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <TimeSlotCard slot="morning" items={morning} />
        <TimeSlotCard slot="evening" items={evening} />
        <TimeSlotCard slot="bedtime" items={bedtime} />
      </div>

      <CombinationSection synergies={synergies} conflicts={conflicts} />

      {unrecognized.length > 0 && (
        <div className="bg-surface-low rounded-2xl p-4 flex gap-3 border border-outline-soft/30">
          <HelpCircle size={16} className="text-outline shrink-0 mt-0.5" />
          <div>
            <p className="text-xs font-semibold text-on-surface-muted mb-1">데이터베이스에 없는 영양제</p>
            <p className="text-xs text-outline leading-relaxed">
              <span className="font-medium text-on-surface-muted">{unrecognized.join(', ')}</span>에 대한 규칙 정보가 없습니다.
            </p>
          </div>
        </div>
      )}
    </section>
  )
}
