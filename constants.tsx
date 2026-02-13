
import { Skill, NodeInfo, ContainerInfo, OllamaModel, CronTask, SystemAlert, CountryProject, ActiveTask } from './types';

export const SKILLS: Skill[] = [
  { id: '1', name: 'intent-detector-10x', active: true },
  { id: '2', name: 'objection-killer-10x', active: true },
  { id: '3', name: 'closer-10x', active: true },
  { id: '4', name: 'dentistas-latam', active: true },
  { id: '5', name: 'relojes-latam-10x', active: true },
  { id: '6', name: 'autos-coleccion', active: true },
  { id: '7', name: 'whisky-valuacion', active: true },
  { id: '8', name: 'vinos-valuacion', active: true },
  { id: '9', name: 'skyreels-video', active: true },
  { id: '10', name: 'deepclaw-voice', active: true },
  { id: '11', name: 'maps-scraper', active: true },
  { id: '12', name: 'whatsapp-cta', active: true },
  { id: '13', name: 'telegram-bot', active: true },
  { id: '14', name: 'email-campaign', active: true },
  { id: '15', name: 'crm-supabase', active: true },
  { id: '16', name: 'n8n-trigger', active: true },
  { id: '17', name: 'valuacion-uhnwi', active: true },
  { id: '18', name: 'lead-scoring', active: true },
  { id: '19', name: 'pdf-report', active: true },
  { id: '20', name: 'memoria-eterna', active: true },
  { id: '21', name: 'ads-generator-ai', active: true },
  { id: '22', name: 'profit-leads', active: true },
  { id: '23', name: 'payment-stripe', active: true },
  { id: '24', name: 'new-chat', active: true },
  { id: '25', name: 'database-memory', active: true },
  { id: '26', name: 'voz-humana', active: true },
  { id: '27', name: 'audio-transcribe', active: true },
  { id: '28', name: 'foto-generator', active: true },
  { id: '29', name: 'sesiones-tracker', active: true },
  { id: '30', name: 'busquedas-ia', active: true },
  { id: '31', name: 'manychat-integ', active: true },
  { id: '32', name: 'historial-chats', active: true },
];

export const ACTIVE_TASKS: ActiveTask[] = [
  { name: 'Scrapear dentistas Bogotá', status: '12 LEADS', icon: '🟢', color: 'text-green-400' },
  { name: 'Demo web Dental Norte', status: 'ACTIVE', icon: '🔵', color: 'text-blue-400' },
  { name: 'WhatsApp seguimiento', status: '14:00', icon: '🟠', color: 'text-orange-400' },
  { name: 'Valuación Rolex Daytona', status: '$790K', icon: '🟢', color: 'text-green-400' },
  { name: 'Contacto joyería Lima', status: 'ACTIVE', icon: '🔵', color: 'text-blue-400' },
  { name: 'Generar video IA', status: '15:30', icon: '🟠', color: 'text-orange-400' },
];

export const INFRA_NODES: NodeInfo[] = [
  { id: 'node1', name: '🦍 NODO 1 · COMANDANTE', role: 'ASUS ROG', specs: 'i7 · 40GB · 6GB VRAM', temp: 58, ram: 62, disk: 47, uptime: '2d 14h', status: 'online', latency: '12ms' },
  { id: 'node2', name: '🏭 NODO 2 · FÁBRICA', role: 'PC ESCLAVO', specs: 'i7 · 24GB · 4GB VRAM', temp: 52, ram: 44, disk: 34, uptime: '2d 14h', status: 'online', latency: '14ms' },
  { id: 'node3', name: '📦 NODO 3 · CENTINELA', role: 'MINI PC', specs: '8GB · 256GB SSD', temp: 47, ram: 31, disk: 28, uptime: '2d 14h', status: 'online', latency: '21ms' },
];

export const DOCKER_CONTAINERS: ContainerInfo[] = [
  { name: 'ollama', image: 'ollama/llm', status: 'UP', cpu: '12%', mem: '2.3GB', port: '11434 → 11434' },
  { name: 'openwebui', image: 'ghcr.io/ow', status: 'UP', cpu: '4%', mem: '780MB', port: '3000 → 3000' },
  { name: 'n8n', image: 'n8nio/n8n', status: 'UP', cpu: '8%', mem: '450MB', port: '5678 → 5678' },
  { name: 'supabase', image: 'supabase/db', status: 'UP', cpu: '6%', mem: '620MB', port: '5432 → 5432' },
  { name: 'redis', image: 'redis:alpine', status: 'UP', cpu: '1%', mem: '120MB', port: '6379 → 6379' },
  { name: 'clawzeneger', image: 'c10x/panel', status: 'UP', cpu: '5%', mem: '210MB', port: '5000 → 5000' },
];

export const OLLAMA_MODELS: OllamaModel[] = [
  { name: 'qwen2.5-coder:7b', size: '4.7GB', vram: '2.3GB', ctx: '131,072', status: 'ACTIVO', loadTime: '320ms' },
  { name: 'nomic-embed-text', size: '274MB', vram: '180MB', ctx: '8,192', status: 'ACTIVO', loadTime: '45ms' },
  { name: 'deepseek-r1:7b', size: '4.7GB', vram: '2.4GB', ctx: '131,072', status: 'SUSPEN', loadTime: '-' },
  { name: 'llama3.2:3b', size: '2.0GB', vram: '1.1GB', ctx: '128,000', status: 'OFF', loadTime: '-' },
];

export const CRON_TASKS: CronTask[] = [
  { cron: '00 08 * * *', task: 'Scrapear dentistas Bogotá', last: '08:00 ✅', next: '08:00', status: '🟢 47 leads', level: 'success' },
  { cron: '00 09 * * *', task: 'Scrapear relojerías Lima', last: '09:00 ✅', next: '09:00', status: '🟢 23 leads', level: 'success' },
  { cron: '*/30 * * *', task: 'Backup colecciones UHNWI', last: '14:30 ✅', next: '15:00', status: '🟢 1.2GB', level: 'success' },
  { cron: '00 14 * * *', task: 'WhatsApp seguimiento', last: '14:00 ❌', next: '15:00', status: '🔴 FALLÓ', level: 'error' },
];

export const SYSTEM_ALERTS: SystemAlert[] = [
  { level: 'CRÍTICA', source: 'Ollama', message: 'deepseek-r1:7b no responde', action: 'REINICIAR OLLAMA', color: 'text-red-500' },
  { level: 'MEDIA', source: 'n8n', message: 'workflow 47fb-23 falló', action: 'REINTENTAR N8N', color: 'text-yellow-500' },
  { level: 'BAJA', source: 'Docker', message: 'imagen desactualizada', action: 'DOCKER PULL', color: 'text-green-500' },
];

export const COUNTRIES: CountryProject[] = [
  { flag: '🇲🇽', name: 'MÉXICO', count: 8 },
  { flag: '🇨🇴', name: 'COLOMBIA', count: 6 },
  { flag: '🇵🇪', name: 'PERÚ', count: 5 },
  { flag: '🇨🇱', name: 'CHILE', count: 4 },
  { flag: '🇦🇷', name: 'ARGENTINA', count: 4 },
  { flag: '🇺🇸', name: 'USA', count: 5 },
];
