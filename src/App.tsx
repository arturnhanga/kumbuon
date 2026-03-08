import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Store,
  TrendingUp, 
  Users, 
  ShieldCheck, 
  ArrowRight, 
  Wallet, 
  Percent, 
  X, 
  CheckCircle2,
  ShoppingCart,
  Star,
  Search,
  LayoutDashboard,
  LogOut,
  User,
  Lock,
  Mail,
  Briefcase,
  Cpu,
  MessageCircle,
  Share2,
  Sparkles,
  Heart
} from 'lucide-react';

const MARKETING_TITLES = [
  "Curso Completo de Tráfego Pago", "Guia Completo de Marketing Digital", "Tráfego Pago do Zero ao Avançado",
  "Manual Completo de Facebook Ads", "Curso de Instagram para Negócios", "Guia de Google Ads para Iniciantes",
  "Marketing Digital para Iniciantes", "Curso Completo de Afiliados", "Manual de Copywriting para Vendas",
  "Curso de Vendas Online pelo WhatsApp", "Guia de Funil de Vendas", "Curso de Dropshipping Completo",
  "Guia de Criação de Loja Online", "Curso de Monetização no Instagram", "Manual de Estratégias de Marketing Digital",
  "Curso de SEO do Zero ao Avançado", "Guia de Criação de Anúncios que Vendem"
];

const BELEZA_TITLES = [
  "Guia Completo de Cuidados com a Pele", "Curso de Skincare para Iniciantes", "Manual de Tratamento de Acne Natural",
  "Guia de Clareamento de Manchas na Pele", "Curso de Maquiagem Profissional", "Guia de Maquiagem para Iniciantes",
  "Manual de Cuidados com o Cabelo Natural", "Curso de Crescimento Capilar", "Guia de Hidratação Capilar Caseira",
  "Manual de Tratamento de Queda de Cabelo", "Curso de Design de Sobrancelhas", "Guia de Alongamento de Unhas",
  "Manual de Cuidados com Unhas Naturais", "Curso de Estética Facial Básica", "Guia de Limpeza de Pele Profunda",
  "Manual de Beleza Natural"
];

const SAUDE_TITLES = [
  "Guia Completo de Emagrecimento Saudável", "Curso de Alimentação Saudável", "Manual de Dieta para Perda de Peso",
  "Guia de Exercícios para Emagrecer em Casa", "Curso de Fitness para Iniciantes", "Manual de Vida Saudável",
  "Guia de Detox Natural", "Curso de Nutrição Básica", "Manual de Fortalecimento do Sistema Imunológico",
  "Guia de Hábitos Saudáveis", "Curso de Treino em Casa Sem Equipamentos", "Manual de Saúde e Bem-Estar",
  "Guia de Controle do Estresse", "Curso de Rotina Saudável", "Manual de Sono e Recuperação para Saúde"
];

const EBOOKS = [
  ...MARKETING_TITLES.map((title, i) => ({
    id: `m-${i}`,
    title,
    category: "Marketing",
    rating: (4.5 + Math.random() * 0.5).toFixed(1),
    description: "Aprenda estratégias avançadas de marketing digital e vendas online para escalar o seu negócio.",
    icon: Briefcase
  })),
  ...BELEZA_TITLES.map((title, i) => ({
    id: `b-${i}`,
    title,
    category: "Beleza",
    rating: (4.5 + Math.random() * 0.5).toFixed(1),
    description: "Descubra os segredos da beleza e cuidados pessoais com guias práticos e profissionais.",
    icon: Sparkles
  })),
  ...SAUDE_TITLES.map((title, i) => ({
    id: `s-${i}`,
    title,
    category: "Saúde",
    rating: (4.5 + Math.random() * 0.5).toFixed(1),
    description: "Melhore a sua qualidade de vida com orientações sobre nutrição, exercícios e bem-estar.",
    icon: Heart
  }))
];

const WHATSAPP_NUMBER = "244900000000"; // Placeholder Angolan number

export default function App() {
  const [view, setView] = useState<'landing' | 'catalog' | 'dashboard'>('landing');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleAuth = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const name = formData.get('name') as string || 'Utilizador';
    const email = formData.get('email') as string;
    
    setUser({ name, email });
    setShowAuthModal(false);
    setView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setView('landing');
  };

  const openWhatsApp = (type: 'buy' | 'affiliate', title: string) => {
    const message = type === 'buy' 
      ? `Olá! Quero comprar o produto digital: ${title}`
      : `Olá! Quero me afiliar ao produto digital: ${title}`;
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const filteredEbooks = EBOOKS.filter(ebook => 
    ebook.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    ebook.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-neutral-50 font-sans text-neutral-900">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-neutral-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div 
            className="flex items-center gap-2 cursor-pointer" 
            onClick={() => setView('landing')}
          >
            <Store className="w-6 h-6 text-emerald-600" />
            <span className="font-bold text-xl tracking-tight">KumbuOnline</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-600">
            {user ? (
              <>
                <button 
                  onClick={() => setView('dashboard')}
                  className={`flex items-center gap-2 hover:text-emerald-600 transition-colors ${view === 'dashboard' ? 'text-emerald-600' : ''}`}
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Painel
                </button>
                <button 
                  onClick={() => setView('catalog')}
                  className={`hover:text-emerald-600 transition-colors ${view === 'catalog' ? 'text-emerald-600' : ''}`}
                >
                  Catálogo
                </button>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-red-500 hover:text-red-600 transition-colors"
                >
                  <LogOut className="w-4 h-4" />
                  Sair
                </button>
              </>
            ) : (
              <button 
                onClick={() => {
                  setAuthMode('login');
                  setShowAuthModal(true);
                }}
                className="bg-emerald-600 text-white px-5 py-2 rounded-full hover:bg-emerald-700 transition-all shadow-sm"
              >
                Entrar / Criar Conta
              </button>
            )}
          </div>
        </div>
      </nav>

      {view === 'landing' && (
        <>
          {/* Hero Section */}
          <section className="pt-32 pb-20 px-4">
            <div className="max-w-7xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <span className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-widest text-emerald-700 uppercase bg-emerald-100 rounded-full">
                  Programa de Afiliados
                </span>
                <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
                  Venda Produtos Digitais e Ganhe <br />
                  <span className="text-emerald-600">50% de Comissão</span>
                </h1>
                <p className="max-w-2xl mx-auto text-lg text-neutral-600 mb-10">
                  Junte-se à nossa rede de afiliados e comece a lucrar com a venda de infoprodutos exclusivos. Receba metade do valor em cada venda realizada.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button 
                    onClick={() => {
                      if (user) setView('dashboard');
                      else {
                        setAuthMode('register');
                        setShowAuthModal(true);
                      }
                    }}
                    className="w-full sm:w-auto px-8 py-4 bg-neutral-900 text-white rounded-2xl font-semibold flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all shadow-lg group"
                  >
                    Quero ser afiliado
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <button 
                    onClick={() => setView('catalog')}
                    className="w-full sm:w-auto px-8 py-4 bg-white border border-neutral-200 text-neutral-900 rounded-2xl font-semibold hover:bg-neutral-50 transition-all"
                  >
                    Ver Catálogo
                  </button>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Developer Section */}
          <section className="py-12 px-4">
            <div className="max-w-5xl mx-auto text-center">
              <motion.div 
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                className="bg-white p-10 rounded-[40px] border border-neutral-200 shadow-sm"
              >
                <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                  <ShieldCheck className="w-8 h-8 text-emerald-600" />
                </div>
                <h3 className="text-2xl font-bold mb-4">Desenvolvido por ARM Tecnologia</h3>
                <p className="text-neutral-600 mb-6 max-w-lg mx-auto">
                  Garantimos que todos os pagamentos são seguros e processados com a mais alta tecnologia de proteção de dados.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <CheckCircle2 className="w-4 h-4" />
                    Pagamentos 100% Seguros
                  </span>
                  <button 
                    onClick={() => setShowTermsModal(true)}
                    className="text-sm font-medium text-neutral-400 hover:text-neutral-900 underline underline-offset-4 transition-colors"
                  >
                    Ver termos de uso
                  </button>
                </div>
              </motion.div>
            </div>
          </section>
        </>
      )}

      {view === 'catalog' && (
        /* Catalog View */
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
              <div>
                <h2 className="text-4xl font-bold mb-2">Catálogo de Produtos</h2>
                <p className="text-neutral-500">Explore os nossos {EBOOKS.length} produtos digitais premium</p>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                <input 
                  type="text" 
                  placeholder="Pesquisar produto..." 
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-12 pr-6 py-3 bg-white border border-neutral-200 rounded-2xl w-full md:w-80 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredEbooks.map((ebook) => (
                <motion.div 
                  key={ebook.id}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  whileHover={{ y: -8 }}
                  className="bg-white rounded-3xl border border-neutral-200 overflow-hidden shadow-sm group"
                >
                  <div className="relative aspect-[4/5] bg-neutral-100 flex items-center justify-center">
                    <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                      <ebook.icon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-neutral-900 text-xs font-bold rounded-full shadow-sm">
                        {ebook.category}
                      </span>
                    </div>
                    <div className="absolute bottom-4 right-4">
                      <div className="flex items-center gap-1 px-2 py-1 bg-neutral-900/80 backdrop-blur-sm text-white text-xs font-bold rounded-lg shadow-sm">
                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                        {ebook.rating}
                      </div>
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl mb-2 line-clamp-1">{ebook.title}</h3>
                    <p className="text-neutral-500 text-sm mb-6 line-clamp-2">
                      {ebook.description}
                    </p>
                    <div className="flex flex-col gap-3 pt-4 border-t border-neutral-100">
                      <div className="flex items-center justify-between mb-2">
                        <div>
                          <span className="block text-[10px] font-bold text-neutral-400 uppercase tracking-wider">Preço</span>
                          <span className="text-lg font-bold text-neutral-900">2.000 Kz</span>
                        </div>
                        <div className="text-right">
                          <span className="block text-[10px] font-bold text-emerald-400 uppercase tracking-wider">Comissão</span>
                          <span className="text-lg font-bold text-emerald-600">1.000 Kz</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <button 
                          onClick={() => openWhatsApp('affiliate', ebook.title)}
                          className="flex items-center justify-center gap-2 bg-neutral-900 text-white px-4 py-3 rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors"
                        >
                          <Share2 className="w-4 h-4" />
                          Afiliar
                        </button>
                        <button 
                          onClick={() => openWhatsApp('buy', ebook.title)}
                          className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                        >
                          <MessageCircle className="w-4 h-4" />
                          Comprar
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            {filteredEbooks.length === 0 && (
              <div className="text-center py-20">
                <p className="text-neutral-500">Nenhum produto encontrado para sua busca.</p>
              </div>
            )}
          </div>
        </section>
      )}

      {view === 'dashboard' && user && (
        /* Dashboard View */
        <section className="pt-32 pb-20 px-4">
          <div className="max-w-7xl mx-auto">
            <div className="mb-12">
              <h2 className="text-4xl font-bold mb-2 text-neutral-900">Olá, {user.name}!</h2>
              <p className="text-neutral-500">Bem-vindo ao seu painel de afiliado KumbuOnline.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Saldo Disponível</span>
                <div className="text-3xl font-bold mt-2">0 Kz</div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Vendas Totais</span>
                <div className="text-3xl font-bold mt-2">0</div>
              </div>
              <div className="bg-white p-8 rounded-3xl border border-neutral-200 shadow-sm">
                <span className="text-xs font-bold text-neutral-400 uppercase tracking-wider">Cliques no Link</span>
                <div className="text-3xl font-bold mt-2">0</div>
              </div>
            </div>

            <div className="bg-white rounded-3xl border border-neutral-200 p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
                <h3 className="text-xl font-bold">Seus Produtos Digitais</h3>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
                  <input 
                    type="text" 
                    placeholder="Pesquisar no painel..." 
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 bg-neutral-50 border border-neutral-200 rounded-xl text-sm w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
              </div>
              <div className="space-y-4">
                {filteredEbooks.map(ebook => (
                  <div key={ebook.id} className="flex flex-col md:flex-row md:items-center justify-between p-4 bg-neutral-50 rounded-2xl border border-neutral-100 gap-4">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center border border-neutral-100">
                        <ebook.icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{ebook.title}</h4>
                        <p className="text-xs text-neutral-500">Comissão: 1.000 Kz</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => openWhatsApp('affiliate', ebook.title)}
                        className="flex items-center justify-center gap-2 bg-neutral-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-neutral-800 transition-colors"
                      >
                        <Share2 className="w-3 h-3" />
                        Afiliar
                      </button>
                      <button 
                        onClick={() => openWhatsApp('buy', ebook.title)}
                        className="flex items-center justify-center gap-2 bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-700 transition-colors"
                      >
                        <MessageCircle className="w-3 h-3" />
                        Comprar
                      </button>
                    </div>
                  </div>
                ))}
                {filteredEbooks.length === 0 && (
                  <p className="text-center py-8 text-neutral-500 text-sm">Nenhum produto encontrado.</p>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Auth Modal */}
      <AnimatePresence>
        {showAuthModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAuthModal(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-md rounded-[32px] shadow-2xl overflow-hidden p-8"
            >
              <button 
                onClick={() => setShowAuthModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">
                  {authMode === 'login' ? 'Bem-vindo de volta' : 'Crie sua conta'}
                </h3>
                <p className="text-neutral-500 text-sm">
                  {authMode === 'login' 
                    ? 'Aceda ao seu painel de afiliado KumbuOnline.' 
                    : 'Comece a lucrar com produtos digitais hoje mesmo.'}
                </p>
              </div>

              <form onSubmit={handleAuth} className="space-y-4">
                {authMode === 'register' && (
                  <div className="relative">
                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                    <input 
                      required
                      name="name"
                      type="text" 
                      placeholder="Nome Completo" 
                      className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                    />
                  </div>
                )}
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    required
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
                  <input 
                    required
                    type="password" 
                    placeholder="Palavra-passe" 
                    className="w-full pl-12 pr-4 py-3 bg-neutral-50 border border-neutral-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
                  />
                </div>
                
                <button 
                  type="submit"
                  className="w-full py-4 bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition-all mt-4"
                >
                  {authMode === 'login' ? 'Entrar' : 'Criar Conta'}
                </button>

                <div className="text-center mt-6">
                  <button 
                    type="button"
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    className="text-sm font-medium text-emerald-600 hover:text-emerald-700 transition-colors"
                  >
                    {authMode === 'login' 
                      ? 'Não tem uma conta? Registe-se' 
                      : 'Já tem uma conta? Entre aqui'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Terms of Use Modal */}
      <AnimatePresence>
        {showTermsModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTermsModal(false)}
              className="absolute inset-0 bg-neutral-900/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative bg-white w-full max-w-2xl rounded-[32px] shadow-2xl overflow-hidden p-8 max-h-[80vh] overflow-y-auto"
            >
              <button 
                onClick={() => setShowTermsModal(false)}
                className="absolute top-6 right-6 p-2 hover:bg-neutral-100 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-2">Termos de Uso - KumbuOnline</h3>
                <p className="text-neutral-500 text-sm">Leia atentamente as nossas diretrizes de operação.</p>
              </div>

              <div className="space-y-6 text-neutral-600 text-sm leading-relaxed">
                <section>
                  <h4 className="font-bold text-neutral-900 mb-2">1. Gestão de Contas e Motivação</h4>
                  <p>
                    Para manter o dinamismo e a motivação da nossa rede de vendas, novas contas de afiliados são processadas e validadas diariamente. Acreditamos que o sucesso individual contribui para o sucesso coletivo, por isso incentivamos todos os nossos parceiros a partilharem a plataforma com o maior número possível de pessoas. Quanto maior a rede, maior o potencial de ganhos para todos.
                  </p>
                </section>

                <section>
                  <h4 className="font-bold text-neutral-900 mb-2">2. Material de Divulgação (Fotos e Capas)</h4>
                  <p>
                    Prezamos pela qualidade visual da nossa marca. Por isso, todas as fotos oficiais, capas de ebooks e materiais criativos para divulgação são enviados diretamente através do nosso <strong>WhatsApp Empresarial</strong> oficial após a afiliação. Isso garante que todos os parceiros utilizem materiais atualizados e de alta conversão.
                  </p>
                </section>

                <section>
                  <h4 className="font-bold text-neutral-900 mb-2">3. Pagamentos e Segurança</h4>
                  <p>
                    A KumbuOnline utiliza tecnologia da ARM Tecnologia para garantir que todas as transações sejam 100% seguras. As comissões de 50% são garantidas para cada venda validada através do seu link de afiliado.
                  </p>
                </section>

                <section>
                  <h4 className="font-bold text-neutral-900 mb-2">4. Conduta do Afiliado</h4>
                  <p>
                    É proibido o uso de spam ou práticas enganosas para realizar vendas. O afiliado deve agir com transparência e ética ao apresentar os produtos digitais aos potenciais clientes.
                  </p>
                </section>
              </div>

              <button 
                onClick={() => setShowTermsModal(false)}
                className="w-full py-4 bg-neutral-900 text-white font-bold rounded-2xl mt-8 hover:bg-neutral-800 transition-all"
              >
                Entendi e Aceito
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Footer */}
      <footer className="py-12 border-t border-neutral-200 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Store className="w-5 h-5 text-emerald-600" />
            <span className="font-bold text-lg">KumbuOnline</span>
          </div>
          <p className="text-neutral-500 text-sm">
            &copy; {new Date().getFullYear()} KumbuOnline. Todos os direitos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
}
