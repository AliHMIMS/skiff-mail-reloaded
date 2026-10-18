// Asset imports, as the web app's Vite config builds them (shared by every workspace package)

// svgAsComponent (packages/web/vite.config.mts) turns every *.svg import into a React component
declare module '*.svg' {
  import type { FC, SVGProps } from 'react';

  const SvgComponent: FC<SVGProps<SVGSVGElement>>;
  export default SvgComponent;
}

declare module '*.png' {
  const url: string;
  export default url;
}

declare module '*.ttf' {
  const url: string;
  export default url;
}

// stylesheets are imported for their side effects
declare module '*.css';
declare module '*.scss';

declare module '*?url' {
  const url: string;
  export default url;
}
