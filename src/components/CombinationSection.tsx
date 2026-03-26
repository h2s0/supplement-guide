import { Zap, AlertTriangle } from 'lucide-react'
import type { CombinationResult } from '../types'

interface Props {
  synergies: CombinationResult[]
  conflicts: CombinationResult[]
}

export default function CombinationSection({ synergies, conflicts }: Props) {
  if (synergies.length === 0 && conflicts.length === 0) return null

  return (
    <div className="space-y-3">
      {synergies.length > 0 && (
        <div className="bg-synergy-bg border border-synergy-border rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-synergy-icon-bg flex items-center justify-center shrink-0">
              <Zap size={16} className="text-synergy-icon" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-synergy-text">함께 먹으면 좋은 조합</h3>
              <p className="text-xs text-synergy-icon">{synergies.length}가지 시너지</p>
            </div>
          </div>
          <div className="space-y-2">
            {synergies.map((combo, i) => (
              <div key={i} className="bg-white/80 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {combo.names.map((name, j) => (
                    <span key={j} className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold bg-synergy-pill text-synergy-text px-2.5 py-0.5 rounded-full">
                        {name}
                      </span>
                      {j < combo.names.length - 1 && (
                        <span className="text-synergy-plus text-xs font-bold">+</span>
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-on-surface-muted leading-relaxed">{combo.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {conflicts.length > 0 && (
        <div className="bg-conflict-bg border border-conflict-border rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-conflict-icon-bg flex items-center justify-center shrink-0">
              <AlertTriangle size={16} className="text-conflict-icon" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-conflict-text">함께 먹으면 안 좋은 조합</h3>
              <p className="text-xs text-conflict-icon">{conflicts.length}가지 주의</p>
            </div>
          </div>
          <div className="space-y-2">
            {conflicts.map((combo, i) => (
              <div key={i} className="bg-white/80 rounded-xl p-3.5 space-y-1.5">
                <div className="flex items-center gap-1.5 flex-wrap">
                  {combo.names.map((name, j) => (
                    <span key={j} className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold bg-conflict-pill text-conflict-text px-2.5 py-0.5 rounded-full">
                        {name}
                      </span>
                      {j < combo.names.length - 1 && (
                        <span className="text-conflict-x text-xs font-bold">×</span>
                      )}
                    </span>
                  ))}
                </div>
                <p className="text-xs text-on-surface-muted leading-relaxed">{combo.reason}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
