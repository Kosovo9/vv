
export enum Language {
  ES = 'ES',
  EN = 'EN'
}

export interface Metric {
  label: string;
  value: string | number;
  trend?: 'up' | 'down';
  color?: string;
}

export interface Skill {
  id: string;
  name: string;
  active: boolean;
}

export interface NodeInfo {
  id: string;
  name: string;
  role: string;
  specs: string;
  temp: number;
  ram: number;
  disk: number;
  uptime: string;
  status: 'online' | 'offline';
  latency: string;
  vram?: string;
}

export interface ContainerInfo {
  name: string;
  image: string;
  status: 'UP' | 'SYNC' | 'DOWN';
  cpu: string;
  mem: string;
  port: string;
}

export interface OllamaModel {
  name: string;
  size: string;
  vram: string;
  ctx: string;
  status: 'ACTIVO' | 'SUSPEN' | 'OFF';
  loadTime: string;
}

export interface CronTask {
  cron: string;
  task: string;
  last: string;
  next: string;
  status: string;
  level: 'success' | 'error' | 'warning';
}

export interface SystemAlert {
  level: 'CRÍTICA' | 'MEDIA' | 'BAJA' | 'INFO';
  source: string;
  message: string;
  action: string;
  color: string;
}

export interface CountryProject {
  flag: string;
  name: string;
  count: number;
}

export interface ActiveTask {
  name: string;
  status: string;
  icon: string;
  color: string;
}
