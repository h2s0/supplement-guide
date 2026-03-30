import { useState, useRef, useEffect } from 'react'
import { Search } from 'lucide-react'
import { matchSupplement } from '../utils/analyze'
import { supplementRules } from '../data/supplements'

interface Props {
  onAdd: (name: string) => void
}

function getSuggestions(input: string): string[] {
  const q = input.toLowerCase().trim()
  if (!q) return []
  return supplementRules
    .filter((r) =>
      r.name.toLowerCase().includes(q) ||
      r.aliases.some((a) => a.toLowerCase().includes(q))
    )
    .map((r) => r.name)
    .slice(0, 6)
}

export default function SupplementInput({ onAdd }: Props) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)
  const [open, setOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  const suggestions = getSuggestions(value)

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  function handleAdd(name?: string) {
    const trimmed = (name ?? value).trim()
    if (!trimmed) return

    if (!matchSupplement(trimmed)) {
      setError(true)
      return
    }

    onAdd(trimmed)
    setValue('')
    setError(false)
    setOpen(false)
  }

  function handleChange(v: string) {
    setValue(v)
    setError(false)
    setOpen(v.trim().length > 0)
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') handleAdd()
    if (e.key === 'Escape') setOpen(false)
  }

  return (
    <div className="relative space-y-1.5" ref={containerRef}>
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
          onKeyDown={handleKeyDown}
          onFocus={() => value.trim() && setOpen(true)}
          placeholder="영양제 이름을 입력하세요 (예: 비타민 C, 오메가3)"
          className="flex-1 bg-transparent border-none focus:outline-none focus:ring-0 py-2 px-2 text-sm text-on-surface placeholder:text-outline min-h-[40px]"
          autoComplete="off"
        />
        <button
          onClick={() => handleAdd()}
          className="bg-primary text-on-primary px-6 py-2 rounded-full text-sm font-semibold hover:bg-primary-dark active:scale-[0.98] transition-all duration-150 cursor-pointer min-h-[40px] shrink-0"
        >
          추가
        </button>
      </div>

      {/* 자동완성 드롭다운 */}
      {open && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 mt-2 bg-surface-white border border-outline-soft/40 rounded-2xl shadow-lg overflow-hidden z-10">
          {suggestions.map((name) => (
            <li key={name}>
              <button
                onMouseDown={(e) => { e.preventDefault(); handleAdd(name) }}
                className="w-full text-left px-5 py-3 text-sm text-on-surface hover:bg-surface-low transition-colors duration-150 cursor-pointer flex items-center gap-2"
              >
                <Search size={13} className="text-outline shrink-0" />
                {name}
              </button>
            </li>
          ))}
        </ul>
      )}

      {error && (
        <p className="text-xs text-red-500 pl-4">
          데이터베이스에 없는 영양제입니다. 다른 이름으로 시도해보세요.
        </p>
      )}
    </div>
  )
}
