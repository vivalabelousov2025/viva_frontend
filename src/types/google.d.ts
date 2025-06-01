interface Window {
  google?: {
    charts: {
      load: (version: string, options: { packages: string[] }) => void;
      setOnLoadCallback: (callback: () => void) => void;
    };
  };
}
