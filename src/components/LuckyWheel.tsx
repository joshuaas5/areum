import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Gift, Loader2 } from "lucide-react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useToast } from "@/components/ui/use-toast";

type Step = "form" | "wheel" | "result";

const PRIZES = [
    { label: "5% OFF", color: "#FAD4D8" }, // Blush Light
    { label: "Ebook Glass Skin", color: "#E8A0BF" }, // Primary Pink (Winner)
    { label: "10% OFF", color: "#FAD4D8" },
    { label: "Tente de novo", color: "#F3F4F6" },
    { label: "Frete Grátis", color: "#FAD4D8" },
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
        // Check if already played today
        const lastPlayed = localStorage.getItem("areum_wheel_date");
        const today = new Date().toDateString();

        if (lastPlayed !== today) {
            const timer = setTimeout(() => {
                setIsOpen(true);
            }, 5000); // 5 seconds delay
            return () => clearTimeout(timer);
        }
    }, []);

    const handleClose = () => {
        setIsOpen(false);
        localStorage.setItem("areum_wheel_date", new Date().toDateString());
    };

    const handleFormSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        // Simulate API call / save data
        console.log("Lead captured:", formData);

        setTimeout(() => {
            setLoading(false);
            setStep("wheel");
        }, 1000);
    };

    const spinWheel = () => {
        // Determine winner (Rigged for Ebook mostly, index 1 or 5)
        // Indexes: 0(5%), 1(Ebook), 2(10%), 3(Sad), 4(Frete), 5(Ebook)
        // 360 / 6 = 60 degrees per segment
        // Target Ebook at index 1 (approx 60-120 deg) or 5 (300-360 deg)

        const spins = 5; // Minimum full rotations
        const targetSegment = 1; // Index 1 is Ebook
        const segmentAngle = 360 / PRIZES.length;

        // Calculate random position within the target segment
        // To land on index 1, we need to rotate NEGATIVE or counter-clockwise physics? 
        // Usually 0 is top. If we rotate clockwise:
        // 0-60: Index 0? No, usually 0 is right or top.
        // Let's keep it simple: Extra Rotation + Specific Angle.
        // Ensure we land on Ebook (Index 1).

        const extraDegrees = 360 * spins;
        // Rotate to land on "Ebook" roughly. 
        // Let's just create a random visual spin that lands on a specific range.

        const randomOffset = Math.random() * 30 + 10; // Randomize slightly within segment
        const winningAngle = extraDegrees + (360 - (targetSegment * segmentAngle)) - (segmentAngle / 2);

        setRotation(winningAngle);

        setTimeout(() => {
            setPrize(PRIZES[targetSegment].label);
            setStep("result");

            toast({
                title: "Parabéns!",
                description: `Você ganhou: ${PRIZES[targetSegment].label}`,
            });
        }, 4500); // Wait for animation
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
                                            transition: "transform 4s cubic-bezier(0.25, 0.1, 0.25, 1)"
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
                                    🎉
                                </motion.div>

                                <div>
                                    <h4 className="text-xl font-bold text-gray-800 mb-2">
                                        PARABÉNS!
                                    </h4>
                                    <p className="text-gray-600">
                                        Você ganhou: <span className="font-bold text-primary">{prize}</span>
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
                                    <div className="bg-pink-50 p-4 rounded-xl border border-pink-100">
                                        <p className="text-sm text-pink-800 mb-2">
                                            Use o cupom abaixo no checkout:
                                        </p>
                                        <code className="block bg-white border-2 border-dashed border-pink-300 rounded p-2 text-lg font-mono font-bold text-primary mb-2 select-all">
                                            AREUM{prize.replace("% OFF", "")}
                                        </code>
                                        <p className="text-xs text-muted-foreground">Copiado automaticamente!</p>
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
