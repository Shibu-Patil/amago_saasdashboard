import type { LabelProps } from "./labelTypes"


const Label = ({ text, type = "info" }: LabelProps) => {

  const styles = {
    success: "bg-green-100 text-green-600",
    warning: "bg-yellow-100 text-yellow-600",
    info: "bg-blue-100 text-blue-600",
    danger: "bg-red-100 text-red-600"
  }

  return (
    <span
      className={`px-3 py-1 rounded-full text-sm font-medium ${styles[type]}`}
    >
      {text}
    </span>
  )
}

export default Label