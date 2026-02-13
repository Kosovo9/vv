
import { Language } from './types';

export const translations = {
  [Language.ES]: {
    header: {
      core: "Núcleo Nuclear",
      root: "Raíz del Sistema",
      version: "WAR_V3.0_STABLE"
    },
    sidebar: {
      mando: "Comando Central",
      chat: "Canal Táctico",
      whitePages: "White Pages (Venta)",
      skills: "Skills 10X",
      infra: "Nodos de Guerra",
      load: "Carga Nuclear",
      kill: "Abortar Sistema"
    },
    dashboard: {
      active: "ACTIVO - MODO GUERRA",
      online: "AGENTES EN LÍNEA",
      status: "INTEGRIDAD: 100%",
      skillsTitle: "Arsenal de Skills",
      tasksTitle: "Operaciones",
      empireTitle: "Territorio LATAM",
      profitTitle: "Facturación Real",
      profitToday: "Cierre Hoy",
      cierres: "Ventas Totales",
      quickCmds: "Comandos Rápidos"
    },
    chat: {
      welcome: "🦾 CLAWZENEGER 10X: Sistema de Guerra Listo. Sin asteriscos. Sin pendejadas. Solo órdenes.",
      placeholder: "Di 'Lucía' o escribe un comando...",
      thinking: "Procesando en local...",
      local: "LOCAL",
      nuclear: "NUCLEAR"
    },
    commercial: {
      title: "White Pages",
      subtitle: "Arsenal para Venta y Renta Universal",
      generate: "Empaquetar Nuclear",
      rent: "Rentar Sistema",
      buy: "Comprar Arsenal",
      targetAgencies: "Agencias Revendedoras",
      targetPymes: "PyMEs & Talleres",
      targetDevs: "Integradores Enterprise",
      model1: "White Label Deluxe",
      model2: "SaaS Offline Universal",
      model3: "Enterprise Source Repo",
      licenseGen: "Generar Licencia",
      pricing: {
        m1: "$7,500 USD",
        m2: "$97 - $297 /mes",
        m3: "$497 USD /año"
      }
    }
  },
  [Language.EN]: {
    header: {
      core: "Nuclear Core",
      root: "System Root",
      version: "WAR_V3.0_STABLE"
    },
    sidebar: {
      mando: "War Command",
      chat: "Tactical Channel",
      whitePages: "White Pages (Sales)",
      skills: "10X Skills",
      infra: "War Nodes",
      load: "Nuclear Load",
      kill: "Abort Mission"
    },
    dashboard: {
      active: "ACTIVE - WAR MODE",
      online: "AGENTS ONLINE",
      status: "INTEGRITY: 100%",
      skillsTitle: "Skills Arsenal",
      tasksTitle: "Operations",
      empireTitle: "LATAM Empire",
      profitTitle: "Total Revenue",
      profitToday: "Closed Today",
      cierres: "Total Sales",
      quickCmds: "Quick Commands"
    },
    chat: {
      welcome: "🦾 CLAWZENEGER 10X: War System Ready. No asterisks. No fluff. Only orders.",
      placeholder: "Say 'Emma' or type a command...",
      thinking: "Local Processing...",
      local: "LOCAL",
      nuclear: "NUCLEAR"
    },
    commercial: {
      title: "White Pages",
      subtitle: "Universal Sales & Rental Arsenal",
      generate: "Pack Nuclear ZIP",
      rent: "Rent System",
      buy: "Buy Arsenal",
      targetAgencies: "Reseller Agencies",
      targetPymes: "SMBs & Workshops",
      targetDevs: "Enterprise Integrators",
      // Fix: Added missing model properties for English locale
      model1: "White Label Deluxe",
      model2: "Universal Offline SaaS",
      model3: "Enterprise Source Repo",
      licenseGen: "Generate Key",
      pricing: {
        m1: "$7,500 USD",
        m2: "$97 - $297 /mo",
        m3: "$497 USD /yr"
      }
    }
  }
};
