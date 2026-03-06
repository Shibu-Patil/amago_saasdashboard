import type { TableProps } from "./tableTypes"

const Table = ({ headers, children }: TableProps) => {
  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-100 sticky top-0">
          <tr>
            {headers.map((header) => (
              <th
                key={header}
                className="p-3 sm:p-4 text-sm sm:text-base font-medium text-gray-700 whitespace-nowrap"
              >
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {children}
        </tbody>
      </table>
    </div>
  )
}

export default Table