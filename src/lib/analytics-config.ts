/**
 * ⚙️ CONFIGURAÇÃO DE RASTREAMENTO DA AREUM
 *
 * 1) Meta Pixel: crie em business.facebook.com/events_manager
 *    → Conectar fontes de dados → Web → nome: "areumco.com.br"
 *    → Copie o "ID do Pixel" (número) e cole abaixo.
 *
 * 2) Google Analytics 4: crie em analytics.google.com
 *    → Administrador → Criar propriedade → nome: "Areum"
 *    → Plataforma Web → URL: https://www.areumco.com.br
 *    → Copie o "ID de medição" (começa com G-) e cole abaixo.
 *
 * Depois de colar os IDs, o código de eventos já está pronto no site.
 */

export const PIXEL_ID: string | null = null; // ex: "1234567890123456"
export const GA4_ID: string | null = "G-Y6RPCGXQT3"; // ex: "G-XXXXXXXXXX"

export const CHECKOUT_URL = "https://areum.pay.yampi.com.br/r/40KOQLA7XE";
