declare module "*.svg" {
    import React = require('react');
    export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement & { width?: string, height?: string }>>;
    const src: string;
    export default src;
}