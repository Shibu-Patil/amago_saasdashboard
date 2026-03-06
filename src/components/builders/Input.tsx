
import type { InputProps } from "./inputTypes"


const Input = ({ label, ...props }: InputProps) => {
  return (
    <div className="flex flex-col gap-1 w-full">

      {label && (
        <label className="text-sm font-medium text-gray-600">
          {label}
        </label>
      )}

      <input
        {...props}
        className="w-full px-3 py-2 border rounded-lg outline-none
        focus:ring-2 focus:ring-blue-500
        border-gray-300"
      />

    </div>
  )
}

export default Input