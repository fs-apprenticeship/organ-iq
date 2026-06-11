import Navbar from "./components/nav-bar";

export default async function Lobby() {
  return (
    <div>
      Welcome to Lobby
      <div className="px-6 pt-8 pb-4">
        <Navbar />
        <p className="text-xs tracking-[0.3em] uppercase text-gray-600 mb-1">
          Screen 2{" "}
        </p>
        <h1 className="text-xl sm:text-2xl font-bold tracking-widest uppercase text-gray-100">
          Lobby / Game Setup
        </h1>
      </div>
      <main className="px-4 pb-4 grid grid-cols-1 lg:grid-cols-3 gap-4 h-[calc(100vh-6.5rem)]">
        <section className="border border-gray-700 rounded-xl bg-[#111827] p-5 space-y-5">
          <h2 className="text-xs tracking-[0.25em] uppercase text-gray-500 pb-2 border-b border-gray-800">
            Panel A: Game Settings
          </h2>
        </section>
        <section className="border border-gray-700 rounded-xl bg-[#111827] p-5 space-y-4">
          <h2 className="text-xs tracking-[0.25em] uppercase text-gray-500 pb-2 border-b border-gray-800">
            Panel B: Players
          </h2>
        </section>
        <section className="border border-gray-700 rounded-xl bg-[#111827] p-5 space-y-4">
          <h2 className="text-xs tracking-[0.25em] uppercase text-gray-500 pb-2 border-b border-gray-800">
            Panel C: Goal Molecule Preview
          </h2>
        </section>
      </main>
    </div>
  );
}
