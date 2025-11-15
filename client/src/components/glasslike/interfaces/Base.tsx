import React from 'react';
import { type Palette } from '../styles/colors';

interface GlassBaseProps extends React.HTMLAttributes<HTMLElement> {
  as?: keyof JSX.IntrinsicElements;
  palette: Palette;
  baseStyle: React.CSSProperties;
  hoverEffect?: boolean;
  children?: React.ReactNode;
}

export const GlassBase: React.FC<GlassBaseProps> = ({
  as = 'div',
  palette,
  baseStyle,
  hoverEffect = false,
  children,
  ...rest
}) => {
  const Component = as as keyof JSX.IntrinsicElements;

  return (
    <Component
      {...rest}
      style={baseStyle}
      onMouseEnter={(e) => {
        if (!hoverEffect) return;
        e.currentTarget.style.background = palette.hoverGradient;
        e.currentTarget.style.boxShadow = palette.boxShadowHover;
        e.currentTarget.style.textShadow = palette.textShadowHover;
      }}
      onMouseLeave={(e) => {
        if (!hoverEffect) return;
        e.currentTarget.style.background = palette.baseGradient;
        e.currentTarget.style.boxShadow = palette.boxShadowBase;
        e.currentTarget.style.textShadow = palette.textShadowBase;
      }}
    >
      {children}
    </Component>
  );
};
