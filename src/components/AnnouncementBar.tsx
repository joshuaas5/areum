import { motion } from "framer-motion";

const AnnouncementBar = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="relative z-50 bg-primary text-primary-foreground"
    >
      <div className="container mx-auto flex items-center justify-center gap-2 px-4 py-2 text-center">
        <p className="text-[0.7rem] font-medium tracking-wide md:text-xs">
          <span className="font-bold">FRETE PROMOCIONAL</span> por tempo limitado
          <span className="mx-2 opacity-50">•</span>
          <span>R$ 79,90</span>
          <span className="ml-1.5 opacity-70 line-through">R$ 99,90</span>
        </p>
      </div>
    </motion.div>
  );
};

export default AnnouncementBar;
