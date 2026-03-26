import { QUICK_ADD_SUPPLEMENTS } from '../data/supplements'

interface Props {
  added: string[]
  onAdd: (name: string) => void
  onRemove: (name: string) => void
}

export default function QuickAddChips({ added, onAdd, onRemove }: Props) {
  return (
    <div className="flex flex-wrap gap-2 items-center">
      <span className="text-xs text-outline font-medium mr-1 shrink-0">자주 찾는 영양제:</span>
      {QUICK_ADD_SUPPLEMENTS.map((name) => {
        const isAdded = added.includes(name)
        return (
          <button
            key={name}
            onClick={() => isAdded ? onRemove(name) : onAdd(name)}
            className={`px-4 py-1.5 rounded-full text-sm font-semibold transition-colors duration-200 cursor-pointer
              ${isAdded
                ? 'bg-primary text-on-primary hover:bg-primary-dark'
                : 'bg-chip text-on-chip hover:bg-chip-dark'
              }`}
          >
            {name}
          </button>
        )
      })}
    </div>
  )
}
