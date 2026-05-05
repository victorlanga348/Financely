import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

function TransactionRow(props: { description: string; category: string; formattedDate: string; formattedAmount: string; type: string }) {
    return (
        <tr className="group hover:bg-white/[0.02] transition-colors">
            <td className="p-6">
                <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg shrink-0 ${props.type === 'income' ? 'bg-emerald-500/10' : 'bg-rose-500/10'}`}>
                        {props.type === 'income' ? <ArrowUpCircle size={16} className="text-emerald-400" /> : <ArrowDownCircle size={16} className="text-rose-400" />}
                    </div>
                    <span className="font-medium">{props.description}</span>
                </div>
            </td>
            <td className="p-6">
                <span className="px-3 py-1 bg-white/5 rounded-full text-xs text-slate-400">{props.category}</span>
            </td>
            <td className="p-6 text-sm text-slate-500">{props.formattedDate}</td>
            <td className={`p-6 font-bold text-right ${props.type === 'income' ? 'text-emerald-400' : 'text-slate-200'}`}>
                {props.formattedAmount}
            </td>
        </tr>
    );
}

export default TransactionRow;
