function NavItem({ icon, label, active = false, onClick }: { icon: any; label: string; active?: boolean; onClick?: () => void }) {
    return (
        <button 
            onClick={onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                active 
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40" 
                : "text-slate-400 hover:text-white hover:bg-white/5"
            }`}
        >
            {icon}
            <span className="font-medium">{label}</span>
        </button>
    );
}

export default NavItem;