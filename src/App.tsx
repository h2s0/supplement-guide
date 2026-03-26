import { useState } from 'react'
import type { AnalysisResult } from './types'
import { analyzeSupplements } from './utils/analyze'
import Navbar from './components/Navbar'
import InputSection from './components/InputSection'
import ResultSection from './components/ResultSection'

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
      <main className="pb-20 max-w-5xl mx-auto px-6">
        {/* Hero */}
        <section className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-primary mb-8">
            
          </h1>
          <div className="max-w-2xl space-y-4">
            <InputSection
              supplements={supplements}
              onAdd={handleAdd}
              onRemove={handleRemove}
              onAnalyze={handleAnalyze}
              result={result}
            />
          </div>
        </section>

        {/* 결과 */}
        {result && (
          <div id="result">
            <ResultSection result={result} />
          </div>
        )}
      </main>

      <footer className="text-center text-xs text-outline pb-8">
        하드코딩된 규칙 기반 · 의학적 조언을 대체하지 않습니다
      </footer>
    </div>
  )
}
