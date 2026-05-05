function NavItem(props: { icon: React.ReactNode; label: string; active?: boolean; onClick?: () => void }) {
    return (
        <button
            onClick={props.onClick}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${props.active
                ? "bg-emerald-600 text-white shadow-lg shadow-emerald-900/40"
                : "text-slate-400 hover:text-white hover:bg-white/5"
                }`}
        >
            {props.icon}
            <span className="font-medium">{props.label}</span>
        </button>
    );
}

export default NavItem;