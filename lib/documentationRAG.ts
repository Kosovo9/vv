
export const platformDocs = [
  {
    key: 'nodos',
    title: 'Sistema de Nodos',
    content: 'ClawZeneger funciona con 3 nodos: Gorila es el comandante Asus ROG, Fábrica es el esclavo para scraping y Centinela es el mini-PC para backups.',
    prompt: 'Explícame cómo funcionan los nodos'
  },
  {
    key: 'docker',
    title: 'Infraestructura Docker',
    content: 'Manejamos 6 contenedores principales: Ollama para IA, n8n para automatización, Supabase local para datos, y Redis para cache.',
    prompt: 'Qué contenedores tiene la plataforma'
  },
  {
    key: 'skills',
    title: 'Habilidades 10X',
    content: 'Contamos con 32 skills activos, incluyendo detector de intenciones, objection-killer para ventas, y scrapers de Google Maps.',
    prompt: 'Cuáles son las habilidades de la IA'
  },
  {
    key: 'comercial',
    title: 'Modelos de Negocio',
    content: 'Existen tres modelos de White Pages: White Label para agencias, SaaS Offline para PyMEs y Enterprise para desarrolladores.',
    prompt: 'Cómo puedo vender esta plataforma'
  }
];

export const findRelevance = (query: string) => {
  const q = query.toLowerCase();
  return platformDocs.find(doc => 
    q.includes(doc.key) || doc.prompt.toLowerCase().includes(q)
  );
};
