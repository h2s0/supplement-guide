import { useState } from 'react'
import type { AnalysisResult } from './types'
import { analyzeSupplements } from './utils/analyze'
import InputSection from './components/InputSection'
import ResultSection from './components/ResultSection'
import { capImg, drinkImg, gummyImg, gelImg, vitamincImg } from './assets'

export default function App() {
  const [supplements, setSupplements] = useState<string[]>([])
  const [result, setResult] = useState<AnalysisResult | null>(null)

  function handleAdd(name: string) {
    if (!supplements.includes(name)) {
      setSupplements((prev) => [...prev, name])
      setResult(null)
    }
  }

  function handleRemove(name: string) {
    setSupplements((prev) => prev.filter((s) => s !== name))
    setResult(null)
  }

  function handleAnalyze() {
    const analysis = analyzeSupplements(supplements)
    setResult(analysis)
    setTimeout(() => {
      document.getElementById('result')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 50)
  }

  return (
    <div className="min-h-screen bg-page">
      <main className="pb-20 max-w-5xl mx-auto px-4 sm:px-6">

        {/* ── Hero ── */}
        <section className="mt-6 mb-10">
          <div
            className="rounded-3xl overflow-hidden mb-8"
            style={{ background: 'linear-gradient(150deg, #fff7ed 0%, #fefce8 45%, #fdf4ff 100%)' }}
          >
            {/* 캐릭터 무대 */}
            <div className="flex justify-center items-end gap-1 sm:gap-3 pt-8 px-4 pointer-events-none select-none">
              {/* 작은 캐릭터들 — 모바일에서 숨김 */}
              <img
                src={gelImg} alt=""
                className="hidden sm:block w-28 drop-shadow-xl -rotate-12 translate-y-2 mb-1"
              />
              <img
                src={gummyImg} alt=""
                className="w-28 sm:w-36 drop-shadow-xl -rotate-3"
              />
              {/* 중앙 주인공 */}
              <img
                src={capImg} alt=""
                className="w-40 sm:w-52 drop-shadow-2xl"
              />
              <img
                src={vitamincImg} alt=""
                className="w-28 sm:w-36 drop-shadow-xl rotate-3"
              />
              <img
                src={drinkImg} alt=""
                className="hidden sm:block w-28 drop-shadow-xl rotate-12 translate-y-2 mb-1"
              />
            </div>

            {/* 텍스트 */}
            <div className="px-6 sm:px-12 pb-10 pt-5 text-center">
              <p className="text-xs font-bold tracking-widest text-primary/60 uppercase mb-3">
                영양제 복용 가이드
              </p>
              <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-on-surface leading-tight mb-3">
                내가 먹는 영양제,<br />
                <span className="text-primary">언제 먹어야 할까요?</span>
              </h1>
              <p className="text-sm sm:text-base text-on-surface-muted">
                복용 중인 영양제를 입력하면 최적의 복용 스케줄을 알려드릴게요
              </p>
            </div>
          </div>

          {/* 입력 영역 */}
          <div className="max-w-2xl mx-auto space-y-4">
            <InputSection
              supplements={supplements}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onAnalyze={handleAnalyze}
              result={result}
            />
          </div>
        </section>

        {/* ── 결과 ── */}
        {result && (
          <div id="result">
            <ResultSection result={result} />
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="text-center pb-8 pt-4">
        <div className="flex justify-center items-end gap-4 mb-2 pointer-events-none select-none">
          <img src={gelImg}   alt="" className="w-9 opacity-50 rotate-12" />
          <img src={drinkImg} alt="" className="w-10 opacity-60" />
          <img src={gummyImg} alt="" className="w-9 opacity-50 -rotate-6" />
        </div>
        <p className="text-xs text-outline">하드코딩된 규칙 기반 · 의학적 조언을 대체하지 않습니다</p>
      </footer>
    </div>
  )
}
