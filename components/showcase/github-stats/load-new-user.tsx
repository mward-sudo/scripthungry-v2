export const LoadNewUser = ({
  login,
  reloadData,
}: {
  login?: string
  reloadData: VoidFunction
}) => (
  <div className="my-8 text-2xl text-center">
    <input
      className="p-2 mr-4 text-gray-800 rounded border-2 border-black"
      id="username"
      type="text"
      placeholder={login}
    />
    <button
      className="p-2 px-4 rounded-lg cursor-pointer bg-primary"
      onClick={() => reloadData()}
      id="load-button"
    >
      Load GitHub user stats
    </button>
  </div>
)
