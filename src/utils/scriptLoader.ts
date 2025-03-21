interface ScriptOptions {
  nonce?: string;
  async?: boolean;
  defer?: boolean;
  onLoad?: () => void;
  onError?: (error: string | Event) => void;
}

export const loadScript = (src: string, options: ScriptOptions = {}): Promise<void> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = options.async ?? false;
    script.defer = options.defer ?? false;
    
    if (options.nonce) {
      script.nonce = options.nonce;
    }

    script.onload = () => {
      if (options.onLoad) {
        options.onLoad();
      }
      resolve();
    };

    script.onerror = (event: string | Event) => {
      if (options.onError) {
        options.onError(event);
      }
      reject(new Error(`Failed to load script: ${src}`));
    };

    document.head.appendChild(script);
  });
};

export const generateNonce = (): string => {
  const array = new Uint8Array(16);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}; 