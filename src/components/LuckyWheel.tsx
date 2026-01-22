import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/lib/supabase";

type Step = "form" | "wheel" | "result";

const PRIZES = [
    { label: "Tente de novo", color: "#F3F4F6" },
    { label: "Ebook Glass Skin", color: "#E8A0BF" }, // Primary Pink (Winner)
    { label: "Tente de novo", color: "#F3F4F6" },
    { label: "Tente de novo", color: "#F3F4F6" },
    { label: "Tente de novo", color: "#F3F4F6" },
    { label: "Ebook Glass Skin", color: "#E8A0BF" }, // Primary Pink (Winner)
];

const LuckyWheel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [step, setStep] = useState<Step>("form");
    const [loading, setLoading] = useState(false);
    const [rotation, setRotation] = useState(0);
    const [prize, setPrize] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        whatsapp: "",
    });

    const { toast } = useToast();

    useEffect(() => {
        // Check persistence
        const wonBefore = localStorage.getItem("areum_wheel_won");
        if (wonBefore) return; // Never show if won

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
        // User logic: "se nao ganhou pode tentar dnv amanha". 
        // If they just close without playing, we can let them see it again? 
        // Or assume they saw it today. Let's assume saw it today.
        localStorage.setItem("areum_wheel_date", new Date().toDateString());
    };

    const handleFormSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Save to Supabase
        try {
            const { error } = await supabase
                .from('leads')
                .insert([
                    {
                        name: formData.name,
                        email: formData.email,
                        whatsapp: formData.whatsapp
                    }
                ]);

            if (error) {
                console.error('Supabase error:', error);
            }
        } catch (err) {
            console.error('Error submitting:', err);
        }

        setLoading(false);
        setStep("wheel");
    };

    const spinWheel = async () => {
        // Determine winner
        // Prizes: 0(Lose), 1(Win), 2(Lose), 3(Lose), 4(Lose), 5(Win)
        // Indexes 1 and 5 are winners.

        const randomIndex = Math.floor(Math.random() * PRIZES.length);
        const targetSegment = randomIndex;
        const isWin = PRIZES[targetSegment].label.includes("Ebook");

        const spins = 5;
        const segmentAngle = 360 / PRIZES.length;

        const extraDegrees = 360 * spins;
        // Calculate winning angle to center the segment
        const winningAngle = extraDegrees + (360 - (targetSegment * segmentAngle)) - (segmentAngle / 2);
        // Add randomness within segment (+/- 15 degrees)
        const randomOffset = (Math.random() * 30) - 15;

        setRotation(winningAngle + randomOffset);

        setTimeout(async () => {
            setPrize(PRIZES[targetSegment].label);
            setStep("result");

            // Update Supabase with prize result
            if (formData.email) {
                await supabase
                    .from('leads')
                    .update({ prize_won: PRIZES[targetSegment].label })
                    .eq('email', formData.email);
            }

            // Persistence Logic
            if (isWin) {
                localStorage.setItem("areum_wheel_won", "true");
                toast({
                    title: "Parabéns!",
                    description: "Você ganhou o Ebook Glass Skin!",
                });
            } else {
                localStorage.setItem("areum_wheel_date", new Date().toDateString());
                toast({
                    title: "Que pena!",
                    description: "Não foi dessa vez. Tente novamente amanhã!",
                });
            }

        }, 4500);
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                    onClick={handleClose}
                />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="relative w-full max-w-md bg-white rounded-3xl shadow-2xl overflow-hidden z-50"
                >
                    {/* Close button */}
                    <button
                        onClick={handleClose}
                        className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 z-10"
                    >
                        <X size={20} />
                    </button>

                    {/* Header */}
                    <div className="bg-gradient-to-r from-pink-100 to-rose-100 p-6 text-center">
                        <h3 className="font-heading text-2xl font-bold text-gray-800 flex items-center justify-center gap-2">
                            <Gift className="text-primary" />
                            Sorteio Areum
                        </h3>
                        <p className="text-sm text-gray-600 mt-2">
                            Teste sua sorte e ganhe prêmios exclusivos!
                        </p>
                    </div>

                    <div className="p-6">
                        {step === "form" && (
                            <form onSubmit={handleFormSubmit} className="space-y-4">
                                <Input
                                    placeholder="Seu Nome"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                />
                                <Input
                                    type="email"
                                    placeholder="Seu Melhor E-mail"
                                    required
                                    value={formData.email}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                />
                                <Input
                                    type="tel"
                                    placeholder="WhatsApp (com DDD)"
                                    required
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                />
                                <Button
                                    type="submit"
                                    className="w-full bg-primary hover:bg-primary/90 text-white"
                                    disabled={loading}
                                >
                                    {loading ? <Loader2 className="animate-spin mr-2" /> : null}
                                    Quero Girar a Roleta
                                </Button>
                                <p className="text-xs text-center text-gray-400">
                                    Prometemos não fazer spam.
                                </p>
                            </form>
                        )}

                        {step === "wheel" && (
                            <div className="flex flex-col items-center">
                                <div className="relative w-64 h-64 mb-8">
                                    {/* Wheel Pointer */}
                                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-4 z-20 w-8 h-8 text-primary rotate-180">
                                        ▼
                                    </div>

                                    {/* Wheel Circle */}
                                    <div
                                        className="w-full h-full rounded-full border-4 border-white shadow-xl overflow-hidden relative"
                                        style={{
                                            transform: `rotate(${rotation}deg)`,
                                            transition: "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)`
                                        }}
                                    >
                                        {PRIZES.map((p, i) => (
                                            <div
                                                key={i}
                                                className="absolute w-1/2 h-full top-0 right-0 origin-left"
                                                style={{
                                                    transform: `rotate(${i * (360 / PRIZES.length)}deg)`,
                                                    backgroundColor: p.color,
                                                }}
                                            >
                                                <span
                                                    className="absolute top-1/2 left-8 -translate-y-1/2 text-xs font-bold text-gray-700 w-20 text-center"
                                                    style={{ transform: 'rotate(90deg)' }}
                                                >
                                                    {p.label}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <Button
                                    onClick={spinWheel}
                                    disabled={rotation > 0}
                                    className="w-full shimmer"
                                >
                                    {rotation > 0 ? "Girando..." : "GIRA AGORA!"}
                                </Button>
                            </div>
                        )}

                        {step === "result" && (
                            <div className="text-center space-y-6">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="text-6xl text-center"
                                >
                                    {prize.includes("Ebook") ? "🎉" : "😅"}
                                </motion.div>

                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                                        {prize.includes("Ebook") ? "PARABÉNS!" : "POXA..."}
                                    </h4>
                                    <p className="text-gray-600">
                                        {prize.includes("Ebook") ? "Você ganhou:" : "O prêmio foi:"} <span className="font-bold text-primary">{prize}</span>
                                    </p>
                                </div>

                                {prize.includes("Ebook") ? (
                                    <div className="bg-green-50 p-4 rounded-xl border border-green-100">
                                        <p className="text-sm text-green-800 mb-3">
                                            Seu Ebook já está disponível para download!
                                        </p>
                                        <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                                            Baixar Ebook Agora
                                        </Button>
                                    </div>
                                ) : (
                                    <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                                        <p className="text-sm text-gray-800 mb-2">
                                            Infelizmente não foi dessa vez.
                                        </p>
                                        <p className="text-xs text-muted-foreground">
                                            Tente novamente amanhã!
                                        </p>
                                    </div>
                                )}

                                <Button variant="ghost" className="text-sm" onClick={handleClose}>
                                    Fechar e Voltar ao Site
                                </Button>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default LuckyWheel;
