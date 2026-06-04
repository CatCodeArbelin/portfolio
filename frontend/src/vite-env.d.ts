declare const process: {
  env: Record<string, string | undefined>;
};

declare module '*.css';

declare module 'vite' {
  export function defineConfig(config: unknown): unknown;
}

declare module 'react' {
  export function StrictMode(props: { children?: unknown }): unknown;
  export function useEffect(effect: () => void | (() => void), deps?: readonly unknown[]): void;
  export function useState<State>(
    initialState: State,
  ): [State, (nextState: State | ((currentState: State) => State)) => void];
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
