import React from 'react';

export type Shape = 'circle' | 'rounded' | 'square';

export const shapeStyles: Record<Shape, React.CSSProperties> = {
  circle: { borderRadius: '50%' },
  rounded: { borderRadius: '0.375rem' },
  square: { borderRadius: '0' },
};

export const glassBorders = {
  borderTop: '1px solid rgba(255,255,255,0.3)',
  borderRight: '0.5px solid rgba(255,255,255,0.15)',
  borderLeft: '0.5px solid rgba(255,255,255,0.15)',
};

export const glassBlur = {
  backdropFilter: 'blur(12px)',
  WebkitBackdropFilter: 'blur(12px)',
};

export const defaultDisplayMap: Record<string, React.CSSProperties['display']> = {
    div: 'block',
    span: 'inline',
    button: 'inline-flex',
    input: 'inline-block',
    textarea: 'inline-block',
    a: 'inline-flex',
    img: 'inline-block'
};
