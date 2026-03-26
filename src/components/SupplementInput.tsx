import { useState } from 'react'
import { Search } from 'lucide-react'
import { matchSupplement } from '../utils/analyze'

interface Props {
  onAdd: (name: string) => void
}

export default function SupplementInput({ onAdd }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  function handleAdd() {
    const trimmed = value.trim()
    if (!trimmed) return

    if (!matchSupplement(trimmed)) {
      setError(true)
      return
    }

    onAdd(trimmed)
    setValue('')
    setError(false)
  }

  function handleChange(v: string) {
    setValue(v)
    if (error) setError(false)
  }

  return (
    <div className="space-y-1.5">
      <div className={`flex items-center bg-surface-white rounded-full p-1.5 border shadow-sm gap-1 transition-colors duration-200
        ${error ? 'border-red-400' : 'border-outline-soft/40'}`}
      >
        <label htmlFor="supplement-input" className="sr-only">영양제 이름</label>
        <Search size={18} className={`ml-3 shrink-0 ${error ? 'text-red-400' : 'text-outline'}`} />
        <input
          id="supplement-input"
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
          placeholder="영양제 이름을 입력하세요 (예: 비타민 C, 오메가3)"
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 py-2 px-2 text-sm text-on-surface placeholder:text-outline min-h-[40px]"
        />
        <button
          onClick={handleAdd}
          className="bg-primary text-on-primary px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark active:scale-[0.98] transition-all duration-150 cursor-pointer min-h-[40px] shrink-0"
        >
          추가
        </button>
      </div>
      {error && (
        <p className="text-xs text-red-500 pl-4">
          데이터베이스에 없는 영양제입니다. 다른 이름으로 시도해보세요.
        </p>
      )}
    </div>
  )
}
