import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Loader2, Sparkles, Download } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

type Step = "form" | "wheel" | "result";

// Alternating Win/Lose
const PRIZES = [
    { label: "Ganhou!", value: "win", color: "#E8A0BF" },
    { label: "Não Ganhou", value: "lose", color: "#FDF2F8" },
    { label: "Ganhou!", value: "win", color: "#E8A0BF" },
    { label: "Não Ganhou", value: "lose", color: "#FDF2F8" },
    { label: "Ganhou!", value: "win", color: "#E8A0BF" },
    { label: "Não Ganhou", value: "lose", color: "#FDF2F8" },
];

const LuckyWheel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<Step>("form");
    const [loading, setLoading] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [prize, setPrize] = useState<typeof PRIZES[0] | null>(null);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp: "",
    });

    const { toast } = useToast();

    useEffect(() => {
        const wonBefore = localStorage.getItem("areum_wheel_won");
        if (wonBefore) return;

        const lastPlayed = localStorage.getItem("areum_wheel_date");
        const today = new Date().toDateString();

        if (lastPlayed !== today) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem("areum_wheel_date", new Date().toDateString());
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase.from('leads').insert([{
                name: formData.name,
                email: formData.email,
                whatsapp: formData.whatsapp
            }]);

            if (error) {
                console.error('Supabase error:', error);
            } else {
                console.log('Lead saved successfully!');
            }
        } catch (err) {
            console.error('Error:', err);
        }

        setLoading(false);
        setStep("wheel");
    };

    const spinWheel = () => {
        const randomIndex = Math.floor(Math.random() * PRIZES.length);
        const targetSegment = randomIndex;

        const spins = 8;
        const segmentAngle = 360 / PRIZES.length;
        const extraDegrees = 360 * spins;
        const winningAngle = extraDegrees + (360 - (targetSegment * segmentAngle)) - (segmentAngle / 2);
        const randomOffset = (Math.random() * 10) - 5;

        setRotation(winningAngle + randomOffset);

        setTimeout(async () => {
            const wonPrize = PRIZES[targetSegment];
            setPrize(wonPrize);
            setStep("result");

            // Update prize in Supabase
            try {
                if (formData.email) {
                    await supabase.from('leads')
                        .update({ prize_won: wonPrize.value === "win" ? "Ebook Segredos" : "Não ganhou" })
                        .eq('email', formData.email);
                }
            } catch (e) {
                console.error(e);
            }

            if (wonPrize.value === "win") {
                localStorage.setItem("areum_wheel_won", "true");
            } else {
                localStorage.setItem("areum_wheel_date", new Date().toDateString());
            }
        }, 5500);
    };

    const handleDownloadEbook = () => {
        // Direct download from public folder
        const link = document.createElement('a');
        link.href = '/AREUM - EBOOK.pdf';
        link.download = 'AREUM - EBOOK.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        toast({
            title: "Download iniciado!",
            description: "Seu ebook está sendo baixado.",
        });
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                    onClick={handleClose}
                />

                {/* Modal */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-[420px] bg-gradient-to-br from-white to-pink-50 rounded-[32px] shadow-2xl overflow-hidden z-50 border-2 border-pink-100"
                >
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-gray-100 rounded-full z-10 transition-colors shadow-sm"
                    >
                        <X size={18} className="text-gray-500" />
                    </button>

                    {/* Header with sparkles */}
                    <div className="bg-gradient-to-br from-pink-100 via-rose-50 to-pink-100 pt-8 pb-6 px-6 text-center relative overflow-hidden">
                        {/* Sparkle decorations */}
                        <div className="absolute top-2 left-4 text-yellow-400 animate-pulse">✨</div>
                        <div className="absolute top-6 right-8 text-yellow-300 animate-pulse delay-100">✨</div>
                        <div className="absolute top-4 left-1/3 text-yellow-200 animate-pulse delay-150">⭐</div>
                        <div className="absolute top-3 right-1/4 text-yellow-400 animate-pulse delay-300">✨</div>

                        <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-pink-400 to-rose-500 rounded-2xl shadow-lg mb-4">
                            <Gift className="text-white w-7 h-7" />
                        </div>

                        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-1 flex items-center justify-center gap-2">
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                            Queremos te dar um presente!
                            <Sparkles className="w-5 h-5 text-yellow-500" />
                        </h3>
                        <p className="text-sm text-gray-600 font-medium">
                            Rode a roleta e tente a sorte!
                        </p>
                    </div>

                    <div className="p-6">
                        {step === "form" && (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <Input
                                    placeholder="Seu Nome"
                                    required
                                    className="bg-white border-pink-100 focus:border-pink-300 h-12 rounded-xl"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <Input
                                    type="email"
                                    placeholder="Seu Melhor E-mail"
                                    required
                                    className="bg-white border-pink-100 focus:border-pink-300 h-12 rounded-xl"
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <Input
                                    type="tel"
                                    placeholder="WhatsApp (DDD + Número)"
                                    required
                                    className="bg-white border-pink-100 focus:border-pink-300 h-12 rounded-xl"
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                />

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white h-12 rounded-xl shadow-lg font-semibold text-base"
                                    disabled={loading}
                                >
                                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                                    Quero Girar a Roleta!
                                </Button>
                            </form>
                        )}

                        {step === "wheel" && (
                            <div className="flex flex-col items-center">
                                <div className="relative w-[260px] h-[260px] mb-6">
                                    {/* Sparkle border effect */}
                                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-yellow-200 via-pink-200 to-yellow-200 animate-spin-slow opacity-50 blur-sm" style={{ animationDuration: '8s' }} />

                                    {/* Outer glow */}
                                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-pink-300 to-rose-400 shadow-xl" />

                                    {/* Pointer */}
                                    <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-30">
                                        <div className="w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[20px] border-t-pink-500 drop-shadow-lg" />
                                    </div>

                                    {/* Wheel */}
                                    <div
                                        className="absolute inset-1 rounded-full overflow-hidden shadow-inner"
                                        style={{
                                            transform: `rotate(${rotation}deg)`,
                                            transition: "transform 5.5s cubic-bezier(0.15, 0, 0.15, 1)"
                                        }}
                                    >
                                        {PRIZES.map((p, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-[50%] h-[50%] top-0 right-0 origin-bottom-left flex items-center justify-center"
                                                style={{
                                                    transform: `rotate(${i * 60}deg) skewY(-30deg)`,
                                                    background: p.color,
                                                    borderRight: '1px solid rgba(255,255,255,0.3)',
                                                }}
                                            >
                                                <span
                                                    className={`text-[11px] font-bold ${p.value === 'win' ? 'text-white' : 'text-gray-500'}`}
                                                    style={{
                                                        transform: 'skewY(30deg) rotate(30deg)',
                                                        textShadow: p.value === 'win' ? '0 1px 2px rgba(0,0,0,0.3)' : 'none',
                                                    }}
                                                >
                                                    {p.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Center hub */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-14 h-14 bg-white rounded-full shadow-lg z-20 flex items-center justify-center border-4 border-pink-200">
                                        <span className="text-2xl">🎀</span>
                                    </div>
                                </div>

                                <Button
                                    onClick={spinWheel}
                                    disabled={rotation > 0}
                                    className="w-full bg-gradient-to-r from-pink-500 to-rose-500 text-white h-12 rounded-xl shadow-lg font-bold"
                                >
                                    {rotation > 0 ? "Girando... ✨" : "GIRAR AGORA! 🎉"}
                                </Button>
                            </div>
                        )}

                        {step === "result" && prize && (
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    className={`w-20 h-20 ${prize.value === 'win' ? 'bg-gradient-to-br from-green-400 to-emerald-500' : 'bg-gradient-to-br from-gray-300 to-gray-400'} rounded-2xl mx-auto flex items-center justify-center shadow-lg mb-6`}
                                >
                                    <span className="text-4xl">{prize.value === "win" ? "🎉" : "😢"}</span>
                                </motion.div>

                                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                                    {prize.value === "win" ? "PARABÉNS! 🎊" : "Não foi dessa vez..."}
                                </h4>

                                <p className="text-gray-500 mb-6 leading-relaxed">
                                    {prize.value === "win" ? (
                                        <>
                                            Você ganhou nosso ebook exclusivo<br />
                                            <strong className="text-pink-600">"Segredos para a Pele de Protagonista"</strong>
                                        </>
                                    ) : (
                                        "Infelizmente você não ganhou hoje. Tente novamente amanhã!"
                                    )}
                                </p>

                                {prize.value === "win" ? (
                                    <Button
                                        className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white h-14 rounded-xl shadow-lg font-bold text-lg"
                                        onClick={handleDownloadEbook}
                                    >
                                        <Download className="w-5 h-5 mr-2" />
                                        BAIXAR EBOOK AGORA
                                    </Button>
                                ) : (
                                    <Button variant="outline" className="w-full h-12 rounded-xl border-2" onClick={handleClose}>
                                        Voltar ao site
                                    </Button>
                                )}
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LuckyWheel;
