declare module 'wx-react-gantt' {
  export interface GanttProps {
    tasks: Array<{
      id: number;
      text: string;
      start: Date;
      end: Date;
      duration: number;
      progress: number;
      type: string;
      parent?: number;
      lazy?: boolean;
    }>;
    links: Array<{
      id: number;
      source: number;
      target: number;
      type: string;
    }>;
    scales: Array<{
      unit: string;
      step: number;
      format: string;
    }>;
  }

  export const Gantt: React.FC<GanttProps>;
} 