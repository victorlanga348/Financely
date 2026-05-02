import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

function TransactionRow({ description, category, formattedDate, formattedAmount, type }: any) {
    return (
        <tr className="group hover:bg-white/[0.02] transition-colors">
            <td className="p-6">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${type === 'income' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                        {type === 'income' ? <ArrowUpCircle size={16} className="text-emerald-400" /> : <ArrowDownCircle size={16} className="text-rose-400" />}
                    </div>
                    <span className="font-medium">{description}</span>
                </div>
            </td>
            <td className="p-6">
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-400">{category}</span>
            </td>
            <td className="p-6 text-sm text-slate-500">{formattedDate}</td>
            <td className={`p-6 font-bold text-right ${type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                {formattedAmount}
            </td>
        </tr>
    );
}

export default TransactionRow;
