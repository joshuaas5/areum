import { motion } from "framer-motion";
import { HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "./ui/accordion";

const faqs = [
  {
    question: "O Sérum Areum serve para pele oleosa?",
    answer:
      "Sim. O Areum tem textura aquosa, rápida absorção e acabamento sem pegajosidade, o que o torna adequado para pele oleosa, mista e seca. Em pele oleosa, ele hidrata sem pesar; em pele seca, recomendamos finalizar com um hidratante habitual.",
  },
  {
    question: "Quanto tempo leva para ver resultado?",
    answer:
      "Hidratação e viço imediatos são sentidos já nas primeiras aplicações. Sensação de firmeza e aparência mais lisa tendem a aparecer com 2 a 4 semanas de uso contínuo, uma ou duas vezes ao dia.",
  },
  {
    question: "O que é Hyalocollagreen e quais os ativos do sérum?",
    answer:
      "Hyalocollagreen 5% é uma tecnologia que combina colágeno vegano e ácido hialurônico. O ácido hialurônico atrai água para a superfície da pele, favorecendo toque macio e efeito plump. O colágeno vegano forma um filme delicado que melhora a sensação de elasticidade e conforto.",
  },
  {
    question: "O Sérum Areum é testado em animais?",
    answer:
      "Não. O Areum é cruelty-free (não testado em animais) e dermatologicamente testado.",
  },
  {
    question: "Como usar o Sérum Areum na rotina de skincare?",
    answer:
      "Aplique 3 a 4 gotas na pele limpa e levemente úmida, espalhando no rosto e pescoço com movimentos suaves. De dia, finalize com protetor solar. Se sua pele for seca, finalize com seu hidratante habitual.",
  },
  {
    question: "Qual o tamanho do frasco e quanto dura?",
    answer:
      "O frasco contém 30ml, suficiente para aproximadamente 1 a 2 meses de uso diário.",
  },
  {
    question: "Qual o prazo de entrega e frete?",
    answer:
      "Enviamos para todo Brasil. O prazo varia conforme a região e é calculado no checkout. A compra é processada pela Yampi, com segurança e proteção ao comprador.",
  },
  {
    question: "Tem garantia?",
    answer:
      "Sim. A compra é protegida pela plataforma Yampi e você pode solicitar reembolso em até 7 dias após o recebimento, conforme o Código de Defesa do Consumidor.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="relative overflow-hidden bg-background py-16 md:py-28">
      <div className="container relative z-10 mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
          className="mx-auto mb-10 max-w-3xl text-center md:mb-14"
        >
          <p className="mb-3 flex items-center justify-center gap-2 text-[0.65rem] font-medium uppercase tracking-[0.2em] text-primary/85 md:mb-4 md:text-xs md:tracking-[0.28em]">
            <HelpCircle className="h-3.5 w-3.5 md:h-4 md:w-4" />
            Dúvidas frequentes
          </p>
          <h2 className="text-balance font-heading text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
            Tudo que você precisa saber antes de comprar
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground md:mt-5 md:text-base md:leading-8">
            Reunimos as perguntas mais comuns sobre o Sérum Areum. Se ainda tiver dúvidas, fale com a gente no Instagram ou e-mail.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-3xl"
        >
          <Accordion type="single" collapsible className="border-t border-primary/15">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-primary/15">
                <AccordionTrigger className="py-4 text-left font-heading text-base font-semibold text-foreground hover:no-underline md:text-lg">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-6 text-muted-foreground md:leading-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQ;
