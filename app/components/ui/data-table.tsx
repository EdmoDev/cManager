import { Label } from "@/app/components/ui/label"

function getRowLabel(row: any): string {
  // Try to find a meaningful label from common field names
  const labelFields = ['name', 'title', 'label', 'id']
  for (const field of labelFields) {
    if (row[field]) {
      return row[field].toString()
    }
  }
  return 'row'
}

export function DataTable<T extends { id: string }>({
  // ... existing props ...
}) {
  // ... existing state ...

  // Add keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, row: T) => {
    switch (e.key) {
      case ' ':
      case 'Enter':
        e.preventDefault()
        handleSelectRow(row.id)
        break
      case 'ArrowUp':
        e.preventDefault()
        const prevRow = document.getElementById(`row-${row.id}`)?.previousElementSibling
        if (prevRow) {
          (prevRow as HTMLElement).focus()
        }
        break
      case 'ArrowDown':
        e.preventDefault()
        const nextRow = document.getElementById(`row-${row.id}`)?.nextElementSibling
        if (nextRow) {
          (nextRow as HTMLElement).focus()
        }
        break
    }
  }

  // Update the TableRow to be focusable and handle keyboard events
  return (
    // ... existing JSX until TableRow ...
    <TableRow
      key={row.id}
      id={`row-${row.id}`}
      tabIndex={0}
      onKeyDown={(e) => handleKeyDown(e, row)}
      className={`focus:outline-none focus:ring-2 focus:ring-blue-500 ${
        selectedRows.has(row.id)
          ? isDarkMode
            ? 'bg-gray-800'
            : 'bg-gray-100'
          : ''
      }`}
    >
      {/* ... rest of the row content ... */}
    </TableRow>
  )
} 