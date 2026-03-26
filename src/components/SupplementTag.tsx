import { X } from 'lucide-react'

interface Props {
  name: string
  onRemove: (name: string) => void
}

export default function SupplementTag({ name, onRemove }: Props) {
  return (
    <span className="inline-flex items-center gap-1 px-3.5 py-1.5 rounded-full text-sm font-semibold bg-surface-white border border-outline-soft/40 text-primary shadow-sm">
      {name}
      <button
        onClick={() => onRemove(name)}
        className="ml-0.5 rounded-full p-0.5 hover:bg-surface-high transition-colors duration-150 cursor-pointer text-outline"
        aria-label={`${name} 삭제`}
      >
        <X size={12} strokeWidth={2.5} />
      </button>
    </span>
  )
}
