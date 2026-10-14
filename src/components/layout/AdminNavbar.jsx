const AdminNavbar = () => {
  return (
    <header className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-stone-200/80 shadow-2xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Brand identity */}
        <div className="flex items-center gap-4">
          <img
            src="/baps-logo.png"
            alt="BAPS.STORE Swaminarayan Aksharpith"
            className="h-9 sm:h-11 w-auto max-w-[220px] sm:max-w-[260px] object-contain rounded-lg shadow-2xs"
          />
          <div className="hidden sm:block border-l border-stone-200 pl-3.5">
            <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
              Admin Portal
            </span>
            <p className="text-[11px] text-stone-500 font-medium mt-0.5">
              Catalog Management
            </p>
          </div>
        </div>

        {/* Right: Store information & Admin badge */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-50 border border-stone-200 text-xs text-stone-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            <span className="font-medium">Live Catalog</span>
            <span className="text-stone-300">|</span>
            <span className="text-stone-500">Akshardham HQ</span>
          </div>

          <div className="flex items-center gap-2.5 pl-2">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-100 to-orange-100 border border-amber-200 flex items-center justify-center font-bold text-xs text-amber-900 shadow-2xs">
              AD
            </div>
            <div className="hidden md:block text-left">
              <p className="text-xs font-bold text-stone-900 leading-tight">Catalog Admin</p>
              <p className="text-[11px] text-stone-400">baps.store</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default AdminNavbar;
