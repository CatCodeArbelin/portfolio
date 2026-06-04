declare const process: {
  env: Record<string, string | undefined>;
};

declare module 'react' {
  export function StrictMode(props: { children?: unknown }): unknown;
}

declare module 'react-dom/client' {
  export function createRoot(element: HTMLElement): {
    render(children: unknown): void;
  };
}

declare module 'react/jsx-runtime' {
  export const Fragment: unknown;
  export function jsx(type: unknown, props: unknown, key?: unknown): unknown;
  export function jsxs(type: unknown, props: unknown, key?: unknown): unknown;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elementName: string]: Record<string, unknown>;
  }
}
