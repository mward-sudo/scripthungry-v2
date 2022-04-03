export const StarsCount = ({ count = 0 }) => (
  <section className="p-2 px-4 text-center bg-orange-700 rounded-lg">
    <h1 className="text-xl font-bold">Stars</h1>
    <p className="text-7xl text-bold">{count}</p>
  </section>
)