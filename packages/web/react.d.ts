// (a module file, so this extends React's types instead of replacing them)
import 'react';

declare module 'react' {
  // Chrome's CSP Embedded Enforcement attribute, which React 19's types don't list
  interface IframeHTMLAttributes<T> {
    csp?: string;
  }
}
