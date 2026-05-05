import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

function TransactionCard(props: { description: string; category: string; formattedDate: string; formattedAmount: string; type: string }) {
    return (
        <div className="glass-card p-4 rounded-2xl flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-w-0">
                <div className={`p-2.5 rounded-xl shrink-0 ${props.type === 'income' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                    {props.type === 'income' ? <ArrowUpCircle size={20} className="text-emerald-400" /> : <ArrowDownCircle size={20} className="text-rose-400" />}
                </div>
                <div className="min-w-0">
                    <p className="font-bold text-slate-100 truncate">{props.description}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                        <span className="text-[10px] text-slate-500">{props.formattedDate}</span>
                        <span className="w-1 h-1 bg-slate-700 rounded-full"></span>
                        <span className="text-[10px] text-emerald-400/70 font-medium uppercase tracking-wider">{props.category}</span>
                    </div>
                </div>
            </div>
            <p className={`font-black whitespace-nowrap ${props.type === 'income' ? 'text-emerald-400' : 'text-slate-100'}`}>
                {props.type === 'income' ? '+' : '-'} {props.formattedAmount}
            </p>
        </div>
    );
}

export default TransactionCard;