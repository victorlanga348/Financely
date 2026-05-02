import { useState } from "react";
import { toast } from "sonner";
import api from "../services/api";
import { Mail, Lock, LogIn, TrendingUp, ShieldCheck, PieChart, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Link from "../components/link";

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    async function logar(e: React.FormEvent) {
        e.preventDefault();
        setIsLoading(true);
        try {

            if (!email.trim() || !password.trim()) {
                toast.error("Preencha todos os campos");
                return;
            }

            if (!email.includes('@')) {
                toast.error("Email inválido");
                return;
            }

            const response = await api.post('/user/login', { email, password });

            console.log(response.data);
            
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            toast.success("Login realizado com sucesso!");

            setEmail("");
            setPassword("");

            navigate('/dashbord');
        } catch (error: any) {
            toast.error(error.response?.data?.message || "Erro ao realizar login!");
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <div className="min-h-screen w-full flex items-center justify-center p-4 relative overflow-hidden bg-slate-950">
            {/* Background decorative elements */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/10 rounded-full blur-[120px]" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px]" />

            <div className="max-w-5xl w-full grid grid-cols-1 md:grid-cols-2 glass-card rounded-3xl overflow-hidden relative z-10">
                
                {/* Left Side: Branding/Marketing */}
                <div className="hidden md:flex flex-col justify-between p-12 bg-gradient-to-br from-emerald-600/20 to-indigo-600/20 border-r border-white/10">
                    <div>
                        <div className="flex items-center gap-2 mb-8">
                            <div className="p-2 bg-emerald-500 rounded-lg">
                                <TrendingUp className="text-white w-6 h-6" />
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">Financely</h1>
                        </div>
                        <h2 className="text-4xl font-extrabold mb-6 leading-tight">
                            Domine suas finanças <br />
                            <span className="text-emerald-400">com inteligência.</span>
                        </h2>
                        <p className="text-slate-400 text-lg leading-relaxed">
                            Organize seus gastos, planeje seu futuro e alcance sua liberdade financeira com a melhor plataforma de gestão.
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/5 rounded-full">
                                <ShieldCheck className="text-emerald-400 w-5 h-5" />
                            </div>
                            <span className="text-sm text-slate-300 font-medium">Segurança de nível bancário</span>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="p-2 bg-white/5 rounded-full">
                                <PieChart className="text-emerald-400 w-5 h-5" />
                            </div>
                            <span className="text-sm text-slate-300 font-medium">Relatórios detalhados e intuitivos</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Login Form */}
                <div className="p-8 md:p-12 flex flex-col justify-center">
                    <div className="mb-10 text-center md:text-left">
                        <h3 className="text-2xl font-bold mb-2">Bem-vindo de volta!</h3>
                        <p className="text-slate-400">Acesse sua conta para continuar.</p>
                    </div>

                    <form onSubmit={logar} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-slate-300 ml-1">E-mail</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors w-5 h-5" />
                                <input 
                                    type="email" 
                                    placeholder="seu@email.com" 
                                    value={email} 
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input-field pl-12"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-medium text-slate-300">Senha</label>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-emerald-400 transition-colors w-5 h-5" />
                                <input 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="••••••••" 
                                    value={password} 
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input-field pl-12 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-emerald-400 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                                </button>
                            </div>
                        </div>

                        <Button disabled={isLoading}>
                            {isLoading ? (
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            ) : (
                                <>
                                    <LogIn className="w-5 h-5" />
                                    <span>Entrar</span>
                                </>
                            )}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-slate-500">
                        Não tem uma conta?{" "}
                        <Link href="/register">Criar agora</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}