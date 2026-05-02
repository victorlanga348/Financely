function StatCard({ title, amount, icon, color, glass }: { title: string; amount: string; icon: any; color?: string; glass?: boolean }) {
    return (
        <div className={`p-4 md:p-6 rounded-[2rem] flex flex-col justify-between h-32 md:h-40 transition-transform hover:scale-[1.02] ${
            glass ? "glass-card" : color + " shadow-xl shadow-emerald-900/20"
        }`}>
            <div className={`p-2 rounded-xl w-fit ${glass ? "bg-white/5" : "bg-white/20"}`}>
                {icon}
            </div>
            <div>
                <p className={`text-xs md:text-sm font-medium mb-1 ${glass ? "text-slate-400" : "text-white/80"}`}>{title}</p>
                <h4 className="text-xl md:text-2xl font-bold truncate">{amount}</h4>
            </div>
        </div>
    );
}

export default StatCard;
