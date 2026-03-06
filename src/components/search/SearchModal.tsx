type Props = {
  item: any
  onClose: () => void
}

const SearchModal = ({ item, onClose }: Props) => {

  if (!item) return null

  return (

    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

      <div className="bg-white p-6 rounded-lg w-96 text-black">

        <h2 className="text-xl font-bold mb-4">
          {item.title}
        </h2>

        <p>
          <strong>Type:</strong> {item.type}
        </p>

        <p>
          <strong>ID:</strong> {item.id}
        </p>

        <button
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
          onClick={onClose}
        >
          Close
        </button>

      </div>

    </div>
  )
}

export default SearchModal