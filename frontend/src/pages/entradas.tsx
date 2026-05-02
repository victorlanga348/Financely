import { useState, useEffect } from "react";
import { 
    LayoutDashboard, 
    ArrowUpCircle, 
    ArrowDownCircle, 
    Search, 
    LogOut, 
    PieChart, 
    TrendingUp,
    ArrowLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.ts";
import NavItem from "../components/navItem";
import Link from "../components/link";

export default function Entradas() {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [transactions, setTransactions] = useState<any[]>([]);
    const [totalIncome, setTotalIncome] = useState<number>(0);
    const [searchTerm, setSearchTerm] = useState<string>('');

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/login');
        }

        fetchData();
    }, [navigate]);

    async function fetchData() {
        try {
            const [transRes, summaryRes] = await Promise.all([
                api.get('/transition/list'),
                api.get('/transition/summary')
            ]);
            
            const incomes = transRes.data.filter((t: any) => t.type === 'income');
            setTransactions(incomes);
            setTotalIncome(summaryRes.data.totalIncome || 0);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MZN'
        }).format(value);
    };

    const filteredTransactions = transactions.filter(t => 
        t.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex overflow-hidden">
            
            <aside className="w-64 border-r border-white/10 flex flex-col glass-card m-4 rounded-[2rem] hidden lg:flex">
                <div className="p-8">
                    <Link href="/dashbord">
                        <div className="p-2 bg-emerald-500 rounded-lg">
                            <TrendingUp className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Financely</h1>
                    </Link>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Visão Geral" onClick={() => navigate('/dashbord')} />
                    <NavItem icon={<ArrowUpCircle size={20} />} label="Entradas" active onClick={() => navigate('/entradas')} />
                    <NavItem icon={<ArrowDownCircle size={20} />} label="Saídas" onClick={() => navigate('/saidas')} />
                    <NavItem icon={<PieChart size={20} />} label="Relatórios" onClick={() => navigate('/relatorios')} />
                </nav>

                <div className="p-4 border-t border-white/10">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
                    >
                        <LogOut size={20} />
                        <span className="font-medium">Sair</span>
                    </button>
                </div>
            </aside>

            <main className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden custom-scrollbar">
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
                
                <header className="p-6 md:p-8 flex items-center justify-between z-10">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => navigate('/dashbord')}
                            className="p-2 bg-white/5 border border-white/10 rounded-xl hover:bg-white/10 transition-colors lg:hidden"
                        >
                            <ArrowLeft size={20} />
                        </button>
                        <div>
                            <h2 className="text-xl md:text-2xl font-bold text-emerald-400">Minhas Entradas</h2>
                            <p className="text-sm text-slate-400">Gerencie todos os seus ganhos.</p>
                        </div>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shrink-0">
                        {user?.name?.[0] || "U"}
                    </div>
                </header>

                <section className="px-6 md:px-8 pb-8 space-y-6 md:space-y-8 z-10">
                    <div className="glass-card p-6 md:p-8 rounded-[2rem] border-l-8 border-l-emerald-500 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div>
                            <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-1">Total Recebido (Mês)</p>
                            <h3 className="text-3xl md:text-4xl font-black text-white">{formatCurrency(totalIncome)}</h3>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1 flex items-center bg-white/5 border border-white/10 rounded-2xl px-4 py-3 focus-within:ring-2 focus-within:ring-emerald-500/50 transition-all">
                            <Search className="text-slate-500 mr-2" size={20} />
                            <input 
                                type="text" 
                                placeholder="Buscar por categoria ou descrição..." 
                                className="bg-transparent border-none focus:outline-none text-sm w-full"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* DESKTOP TABLE */}
                    <div className="hidden md:block glass-card rounded-[2rem] overflow-hidden">
                        <div className="p-8">
                            <div className="max-h-[50vh] overflow-y-auto custom-scrollbar">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="text-slate-500 text-sm border-b border-white/10">
                                            <th className="pb-4 font-bold uppercase">Descrição</th>
                                            <th className="pb-4 font-bold uppercase">Categoria</th>
                                            <th className="pb-4 font-bold uppercase text-center">Data</th>
                                            <th className="pb-4 font-bold uppercase text-right">Valor</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {filteredTransactions.map((transaction) => (
                                            <tr key={transaction.id} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="py-5 font-bold">{transaction.description}</td>
                                                <td className="py-5">
                                                    <span className="px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-xs font-bold text-emerald-400">
                                                        {transaction.category}
                                                    </span>
                                                </td>
                                                <td className="py-5 text-sm text-slate-500 text-center">
                                                    {new Date(transaction.date).toLocaleDateString('pt-BR')}
                                                </td>
                                                <td className="py-5 font-black text-right text-emerald-400">
                                                    + {formatCurrency(transaction.amount)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* MOBILE CARDS */}
                    <div className="md:hidden space-y-4">
                        {filteredTransactions.map((transaction) => (
                            <div key={transaction.id} className="glass-card p-5 rounded-3xl flex flex-col gap-3">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2.5 bg-emerald-500/10 rounded-xl">
                                            <ArrowUpCircle size={20} className="text-emerald-400" />
                                        </div>
                                        <p className="font-bold text-slate-100">{transaction.description}</p>
                                    </div>
                                    <p className="font-black text-emerald-400">+ {formatCurrency(transaction.amount)}</p>
                                </div>
                                <div className="flex items-center justify-between border-t border-white/5 pt-3 mt-1">
                                    <span className="text-[10px] text-slate-400 font-medium uppercase tracking-wider">{transaction.category}</span>
                                    <span className="text-[10px] text-slate-500">{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTransactions.length === 0 && (
                        <div className="py-20 text-center">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Search className="text-slate-600" size={40} />
                            </div>
                            <h4 className="text-xl font-bold text-slate-400">Nenhum resultado encontrado</h4>
                        </div>
                    )}
                </section>
            </main>
        </div>
    );
}