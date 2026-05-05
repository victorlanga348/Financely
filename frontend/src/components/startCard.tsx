function StatCard(props: { title: string; amount: string; icon: React.ReactNode; color?: string; glass?: boolean }) {
    return (
        <div className={`p-4 md:p-5 rounded-[2rem] flex flex-col justify-between h-32 lg:h-36 transition-transform hover:scale-[1.02] ${props.glass ? "glass-card" : props.color + " shadow-xl shadow-emerald-900/20"
            }`}>
            <div className={`p-2 rounded-xl w-fit ${props.glass ? "bg-white/5" : "bg-white/20"}`}>
                {props.icon}
            </div>
            <div>
                <p className={`text-xs font-medium mb-1 ${props.glass ? "text-slate-400" : "text-white/80"}`}>{props.title}</p>
                <h4 className="text-lg md:text-2xl font-bold truncate">{props.amount}</h4>
            </div>
        </div>
    );
}

export default StatCard;
