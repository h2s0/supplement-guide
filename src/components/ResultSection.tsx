import { HelpCircle } from 'lucide-react'
import type { AnalysisResult } from '../types'
import CombinationSection from './CombinationSection'
import ScheduleCard from './ScheduleCard'

interface Props {
  result: AnalysisResult
}

export default function ResultSection({ result }: Props) {
  const { morning, evening, bedtime, unrecognized, synergies, conflicts } = result

  return (
    <section className="space-y-5">

      <ScheduleCard morning={morning} evening={evening} bedtime={bedtime} />

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
