export const Header = () => (
  <header className="border-b border-slate-800 bg-slate-900/70 backdrop-blur">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
      <div>
        <h1 className="text-2xl font-semibold text-white">OpsGenie.AI</h1>
        <p className="text-sm text-slate-400">
          AI-powered incident and operations assistant for engineering teams.
        </p>
      </div>
      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-300">
        Live Demo
      </span>
    </div>
  </header>
);

export default Header;
