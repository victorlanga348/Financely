import { useState, useEffect } from "react";
import { 
    LayoutDashboard, 
    ArrowUpCircle, 
    ArrowDownCircle, 
    Wallet, 
    Plus, 
    LogOut, 
    PieChart, 
    TrendingUp,
    X,
    Check
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import api from "../services/api.ts";
import { toast } from "sonner";
import TransactionRow from "../components/transactionRow";
import NavItem from "../components/navItem";
import TransactionCard from "../components/transitionCard";
import StatCard from "../components/startCard";
import Input from "../components/input.tsx";

export default function Dashbord() {
    const navigate = useNavigate();
    const [user, setUser] = useState<{ name: string; email: string } | null>(null);
    const [totalValue, setTotalValue] = useState<number>(0);
    const [entradas, setEntradas] = useState<number>(0);
    const [saidas, setSaidas] = useState<number>(0);
    const [transactions, setTransactions] = useState<Array<{ id: string, description: string, amount: number, type: string, category: string, date: string }>>([]);
    
    // Modal state
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        description: '',
        amount: '',
        type: 'expense' as 'income' | 'expense',
        category: '',
        date: new Date().toISOString().split('T')[0]
    });

    // use effect to get the user
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            navigate('/login');
        }
    }, [navigate]);

    // function to get the total value, income and expense
    async function totalvalue() {
        try {
            const response = await api.get('/transition/summary');
            setTotalValue(response.data.balance || 0);
            setEntradas(response.data.totalIncome || 0);
            setSaidas(response.data.totalExpenses || 0);
        } catch (error) {
            console.error('Error fetching total value:', error);
        }
    }

    // function to format the currency
    const formatCurrency = (value: number) => {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'MZN'
        }).format(value);
    };

    // function to get the list of transactions
    async function listTransactions() {
        try {
            const response = await api.get('/transition/list');
            setTransactions(response.data);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    }

    // handle form submission
    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        
        if (!formData.description || !formData.amount || !formData.category) {
            toast.error("Preencha todos os campos");
            return;
        }

        setIsLoading(true);
        try {
            await api.post('/transition/create', formData);
            
            toast.success("Transação adicionada!");
            setIsModalOpen(false);
            setFormData({
                description: '',
                amount: '',
                type: 'expense',
                category: '',
                date: new Date().toISOString().split('T')[0]
            });
            
            // Refresh data
            totalvalue();
            listTransactions();
        } catch (error: any) {
            toast.error("Erro ao adicionar transação");
        } finally {
            setIsLoading(false);
        }
    }

    // use effect to get the transactions
    useEffect(() => {
        listTransactions();
        totalvalue();
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50 flex overflow-hidden">
            
            {/* Sidebar - Hidden on mobile */}
            <aside className="w-64 border-r border-white/10 flex flex-col glass-card m-4 rounded-[2rem] hidden lg:flex">
                <div className="p-8">
                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-500 rounded-lg">
                            <TrendingUp className="text-white w-6 h-6" />
                        </div>
                        <h1 className="text-xl font-bold tracking-tight">Financely</h1>
                    </div>
                </div>

                <nav className="flex-1 px-4 space-y-2">
                    <NavItem icon={<LayoutDashboard size={20} />} label="Visão Geral" active onClick={() => navigate('/dashbord')} />
                    <NavItem icon={<ArrowUpCircle size={20} />} label="Entradas" onClick={() => navigate('/entradas')} />
                    <NavItem icon={<ArrowDownCircle size={20} />} label="Saídas" onClick={() => navigate('/saidas')}/>
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

            {/* Main Content */}
            <main className="flex-1 flex flex-col relative overflow-y-auto overflow-x-hidden custom-scrollbar">
                {/* Background decorative elements */}
                <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />
                
                {/* Header */}
                <header className="p-4 md:p-6 lg:p-8 flex items-center justify-between z-10 flex-wrap gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-bold">Olá, {user?.name || "Usuário"} 👋</h2>
                        <p className="text-xs md:text-sm text-slate-400">Aqui está o resumo das suas finanças hoje.</p>
                    </div>

                    <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shrink-0">
                            {user?.name?.[0] || "U"}
                        </div>
                    </div>
                </header>

                {/* Dashboard Grid */}
                <section className="px-4 md:px-8 pb-8 space-y-4 md:space-y-6 lg:space-y-8 z-10">
                    
                    {/* Stat Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        <StatCard 
                            title="Saldo Total" 
                            amount={formatCurrency(totalValue)}
                            icon={<Wallet className="text-white" />} 
                            color="bg-emerald-600"
                        />
                        <StatCard 
                            title="Entradas (Mês)" 
                            amount={formatCurrency(entradas)}
                            icon={<ArrowUpCircle className="text-emerald-400" />} 
                            glass
                        />
                        <StatCard 
                            title="Saídas (Mês)" 
                            amount={formatCurrency(saidas)} 
                            icon={<ArrowDownCircle className="text-rose-400" />} 
                            glass
                        />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                        {/* Recent Transactions */}
                        <div className="lg:col-span-2 space-y-4">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg md:text-xl font-bold">Transações Recentes</h3>
                                <button className="text-sm font-medium text-emerald-400 hover:text-emerald-300" onClick={() => navigate('/relatorios')}>
                                    Ver todas
                                </button>
                            </div>

                            {/* TABLE: Hidden on mobile, visible on MD and up */}
                            <div className="hidden md:block glass-card rounded-[2rem] overflow-hidden">
                                <div className="p-6">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="text-slate-500 text-sm border-b border-white/5">
                                                <th className="pb-4 font-medium">Descrição</th>
                                                <th className="pb-4 font-medium">Categoria</th>
                                                <th className="pb-4 font-medium">Data</th>
                                                <th className="pb-4 font-medium text-right">Valor</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {transactions.slice(0, 6).map((transaction) => (
                                                <TransactionRow 
                                                    key={transaction.id}
                                                    {...transaction}
                                                    formattedAmount={formatCurrency(transaction.amount)}
                                                    formattedDate={new Date(transaction.date).toLocaleDateString('pt-BR')}
                                                />
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>

                            {/* CARDS: Visible on mobile, hidden on MD and up */}
                            <div className="md:hidden space-y-3">
                                {transactions.slice(0, 5).map((transaction) => (
                                    <TransactionCard 
                                        key={transaction.id}
                                        {...transaction}
                                        formattedAmount={formatCurrency(transaction.amount)}
                                        formattedDate={new Date(transaction.date).toLocaleDateString('pt-BR')}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        <div className="space-y-4 md:space-y-6">
                            <h3 className="text-lg md:text-xl font-bold">Ações Rápidas</h3>
                            <button 
                                onClick={() => setIsModalOpen(true)}
                                className="w-full bg-emerald-600 hover:bg-emerald-500 py-6 md:py-10 lg:py-14 rounded-[2rem] flex flex-col items-center justify-center gap-4 transition-all active:scale-95 shadow-xl shadow-emerald-900/20 group"
                            >
                                <div className="p-3 bg-white/20 rounded-2xl group-hover:scale-110 transition-transform">
                                    <Plus className="text-white" size={28} strokeWidth={3} />
                                </div>
                                <span className="font-bold text-lg">Nova Transação</span>
                            </button>
                        </div>
                    </div>
                </section>
            </main>

            {/* Modal */}
            {isModalOpen && (
                <div 
                    className="fixed inset-0 bg-slate-950/80 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-auto animate-in fade-in duration-300"
                    onClick={() => setIsModalOpen(false)} 
                >
                    <div 
                        className="glass-card max-w-md w-full p-6 md:p-8 rounded-[2rem] relative animate-in zoom-in duration-300 my-8"
                        onClick={(e) => e.stopPropagation()} 
                    >
                        <button 
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-6 right-6 p-2 text-slate-500 hover:text-white transition-colors"
                        >
                            <X size={20} />
                        </button>

                        <div className="mb-6 md:mb-8 text-center md:text-left">
                            <h3 className="text-xl md:text-2xl font-bold mb-1">Nova Transação</h3>
                            <p className="text-slate-400 text-sm">Registre suas entradas e saídas.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
                            <div className="flex p-1 bg-white/5 rounded-2xl border border-white/5">
                                <button
                                    type="button"
                                    onClick={() => setFormData({...formData, type: 'expense'})}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all text-sm md:text-base ${
                                        formData.type === 'expense' 
                                        ? 'bg-rose-500 text-white shadow-lg shadow-rose-900/20' 
                                        : 'text-slate-500 hover:text-slate-300'
                                    }`}
                                >
                                    <ArrowDownCircle size={18} />
                                    <span>Despesa</span>
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setFormData({...formData, type: 'income'})}
                                    className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl font-semibold transition-all text-sm md:text-base ${
                                        formData.type === 'income' 
                                        ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-900/20' 
                                        : 'text-slate-500 hover:text-slate-300'
                                    }`}
                                >
                                    <ArrowUpCircle size={18} />
                                    <span>Receita</span>
                                </button>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-1.5">
                                    <label className="text-xs md:text-sm font-medium text-slate-400 ml-1">Descrição</label>
                                    <Input 
                                        type="text" 
                                        placeholder="Ex: Aluguel, Salário..." 
                                        value={formData.description}
                                        onChange={(e) => setFormData({...formData, description: e.target.value})}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <label className="text-xs md:text-sm font-medium text-slate-400 ml-1">Valor (MZN)</label>
                                        <Input
                                            type="number"
                                            value={formData.amount}
                                            onChange={(e) => setFormData({...formData, amount: e.target.value})}
                                            placeholder="0,00"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-xs md:text-sm font-medium text-slate-400 ml-1">Data</label>
                                        <Input
                                            type="date"
                                            value={formData.date}
                                            onChange={(e) => setFormData({...formData, date: e.target.value})}
                                            placeholder="0,00"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="text-xs md:text-sm font-medium text-slate-400 ml-1">Categoria</label>
                                    <Input
                                        type="text"
                                        value={formData.category}
                                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                                        placeholder="Ex: Alimentação, Freelance..."
                                    />
                                </div>
                            </div>

                            <button 
                                type="submit"
                                disabled={isLoading}
                                className={`w-full py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95 shadow-xl text-sm md:text-base ${
                                    formData.type === 'income' 
                                    ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-900/20' 
                                    : 'bg-rose-500 hover:bg-rose-400 shadow-rose-900/20'
                                }`}
                            >
                                {isLoading ? (
                                    <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                ) : (
                                    <>
                                        <Check size={20} strokeWidth={3} />
                                        <span>Confirmar Transação</span>
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
