import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Loader2, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

type Step = "form" | "wheel" | "result";

// Colors: Rose Gold, Champagne, Soft White
const COLORS = [
    "#E8A0BF", // Rose Gold (Win)
    "#FDF2F8", // Soft Pink (Lose)
    "#E8A0BF", // Rose Gold (Win)
    "#FDF2F8", // Soft Pink (Lose)
    "#E8A0BF", // Rose Gold (Win)
    "#FDF2F8", // Soft Pink (Lose)
];

const PRIZES = [
    { label: "Ebook Segredos para a pele de protagonista", value: "win", color: COLORS[0] },
    { label: "Tente de novo amanhã", value: "lose", color: COLORS[1] },
    { label: "Ebook Segredos para a pele de protagonista", value: "win", color: COLORS[2] },
    { label: "Tente de novo amanhã", value: "lose", color: COLORS[3] },
    { label: "Ebook Segredos para a pele de protagonista", value: "win", color: COLORS[4] },
    { label: "Tente de novo amanhã", value: "lose", color: COLORS[5] },
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
        // Persistence Check
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
        // If closed without playing, we treat as played for today to avoid spam
        // Unless we want to be aggressive. Let's be polite.
        localStorage.setItem("areum_wheel_date", new Date().toDateString());
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (formData.email) {
                await supabase.from('leads').insert([{
                    name: formData.name,
                    email: formData.email,
                    whatsapp: formData.whatsapp
                }]);
            }
        } catch (err) {
            console.error(err);
        }

        setLoading(false);
        setStep("wheel");
    };

    const spinWheel = () => {
        const spins = 8; // More spins for dramatic effect
        // Logic: 50% chance perfectly alternating
        const randomIndex = Math.floor(Math.random() * PRIZES.length);
        const targetSegment = randomIndex;

        const segmentAngle = 360 / PRIZES.length;
        const extraDegrees = 360 * spins;

        // Center of the segment
        const winningAngle = extraDegrees + (360 - (targetSegment * segmentAngle)) - (segmentAngle / 2);
        // Add small random flutter (+/- 5 deg) for realism
        const randomOffset = (Math.random() * 10) - 5;

        setRotation(winningAngle + randomOffset);

        setTimeout(async () => {
            const wonPrize = PRIZES[targetSegment];
            setPrize(wonPrize);
            setStep("result");

            try {
                if (formData.email) {
                    await supabase.from('leads').update({ prize_won: wonPrize.label }).eq('email', formData.email);
                }
            } catch (e) {
                console.error(e);
            }

            if (wonPrize.value === "win") {
                localStorage.setItem("areum_wheel_won", "true");
                // Confetti effect could go here
            } else {
                localStorage.setItem("areum_wheel_date", new Date().toDateString());
            }
        }, 5500); // 5.5s spin time
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
                    className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-all"
                    onClick={handleClose}
                />

                {/* Modal Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="relative w-full max-w-[420px] bg-white rounded-[32px] shadow-2xl overflow-hidden z-50 ring-4 ring-white/50"
                >
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 bg-white/80 hover:bg-gray-100 rounded-full z-10 transition-colors shadow-sm"
                    >
                        <X size={18} className="text-gray-500" />
                    </button>

                    {/* Decorative Header */}
                    <div className="bg-gradient-to-br from-[#FFF5F7] to-[#FFF0F5] pt-8 pb-6 px-6 text-center relative overflow-hidden">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
                        <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/5 rounded-full blur-3xl" />
                        <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl" />

                        <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-2xl shadow-md mb-4 rotate-3">
                            <Gift className="text-primary w-6 h-6" />
                        </div>

                        <h3 className="font-heading text-2xl font-bold text-gray-800 mb-1">
                            Sorteio Exclusivo
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                            Você tem uma chance de ganhar hoje!
                        </p>
                    </div>

                    <div className="p-8 pt-4">
                        {step === "form" && (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <div className="space-y-3">
                                    <Input
                                        placeholder="Seu Nome"
                                        required
                                        className="bg-gray-50 border-gray-100 focus:bg-white transition-all h-12 rounded-xl"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    />
                                    <Input
                                        type="email"
                                        placeholder="Seu Melhor E-mail"
                                        required
                                        className="bg-gray-50 border-gray-100 focus:bg-white transition-all h-12 rounded-xl"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    <Input
                                        type="tel"
                                        placeholder="WhatsApp (DDD + Número)"
                                        required
                                        className="bg-gray-50 border-gray-100 focus:bg-white transition-all h-12 rounded-xl"
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                    />
                                </div>

                                <Button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-primary to-rose-400 hover:from-primary/90 hover:to-rose-500 text-white h-12 rounded-xl shadow-lg shadow-primary/25 font-semibold text-base transition-all hover:scale-[1.02] active:scale-[0.98]"
                                    disabled={loading}
                                >
                                    {loading ? <Loader2 className="animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
                                    Quero testar minha sorte
                                </Button>
                            </form>
                        )}

                        {step === "wheel" && (
                            <div className="flex flex-col items-center">
                                <div className="relative w-[280px] h-[280px] mb-8">
                                    {/* Outer Ring */}
                                    <div className="absolute inset-0 rounded-full border-[10px] border-white shadow-xl z-20 pointer-events-none" />
                                    <div className="absolute -inset-1 rounded-full bg-gradient-to-br from-gold/50 to-primary/50 -z-10 blur-sm" />

                                    {/* Pointer */}
                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-30 drop-shadow-md">
                                        <div className="w-8 h-10 bg-white clip-path-polygon-[50%_100%,_0_0,_100%_0] flex items-center justify-center">
                                            <div className="w-6 h-8 bg-primary clip-path-polygon-[50%_100%,_0_0,_100%_0]" />
                                        </div>
                                    </div>

                                    {/* Wheel */}
                                    <div
                                        className="w-full h-full rounded-full overflow-hidden relative shadow-inner"
                                        style={{
                                            transform: `rotate(${rotation}deg)`,
                                            transition: "transform 5.5s cubic-bezier(0.15, 0, 0.15, 1)"
                                        }}
                                    >
                                        {PRIZES.map((p, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-[50%] h-[50%] top-0 right-0 origin-bottom-left"
                                                style={{
                                                    transform: `rotate(${i * 60}deg) skewY(-30deg)`, // 6 segments = 60deg slices
                                                    background: p.color,
                                                }}
                                            >
                                                <div
                                                    className="absolute left-0 bottom-0 w-full h-full flex items-center justify-center p-4 text-center"
                                                    style={{
                                                        transform: 'skewY(30deg) rotate(30deg) translate(20px, -60px)', // Center text in slice
                                                    }}
                                                >
                                                    <span className={`text-[10px] font-bold leading-tight ${p.value === 'win' ? 'text-white drop-shadow-sm' : 'text-gray-400'}`}>
                                                        {p.label.length > 20 ? "Ebook Glass Skin" : p.label}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {/* Center Hub */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg z-30 flex items-center justify-center">
                                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-rose-300" />
                                    </div>
                                </div>

                                <Button
                                    onClick={spinWheel}
                                    disabled={rotation > 0}
                                    className="w-full bg-gradient-to-r from-primary to-rose-400 text-white h-12 rounded-xl shadow-lg shadow-primary/25 font-bold tracking-wide"
                                >
                                    {rotation > 0 ? "TORCENDO..." : "GIRAR AGORA!"}
                                </Button>
                            </div>
                        )}

                        {step === "result" && prize && (
                            <div className="text-center">
                                <motion.div
                                    initial={{ scale: 0, rotate: -180 }}
                                    animate={{ scale: 1, rotate: 0 }}
                                    type="spring"
                                    className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-green-200 mb-6"
                                >
                                    {prize.value === "win" ? (
                                        <span className="text-4xl">📚</span>
                                    ) : (
                                        <span className="text-4xl">😢</span>
                                    )}
                                </motion.div>

                                <h4 className="text-2xl font-bold text-gray-800 mb-2">
                                    {prize.value === "win" ? "VOCÊ GANHOU!" : "Não foi dessa vez..."}
                                </h4>

                                <p className="text-gray-500 mb-8 leading-relaxed">
                                    {prize.value === "win" ? (
                                        <>
                                            Parabéns! Você ganhou nosso ebook exclusivo<br />
                                            <strong className="text-primary">"Segredos para a pele de protagonista"</strong>
                                        </>
                                    ) : (
                                        "Infelizmente você não ganhou hoje. Mas não desanime, amanhã você pode tentar de novo!"
                                    )}
                                </p>

                                {prize.value === "win" ? (
                                    <Button className="w-full bg-green-500 hover:bg-green-600 text-white h-12 rounded-xl shadow-lg shadow-green-200 font-semibold text-lg animate-pulse"
                                        onClick={() => window.open("/ebook-areum-glass-skin.pdf", "_blank")} // Assuming ebook is public
                                    >
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
