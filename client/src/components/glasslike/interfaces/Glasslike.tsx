import React from 'react';
import { colorPalettes, type ColorScheme } from '../styles/colors';
import { type Shape } from '../styles/styleParts';
import { useGlasslikeStyle } from '../hooks/useGlasslikeStyle';
import { GlassBase } from './Base';

export interface GlasslikeBaseProps {
  colorScheme?: ColorScheme;
  shape?: Shape;
  hoverEffect?: boolean;
  width?: string | number;
  height?: string | number;
  style?: React.CSSProperties;
  centerContent?: boolean;
  noPadding?: boolean;
}

export type GlasslikeProps<
  T extends keyof JSX.IntrinsicElements = 'div', // ✅ default: div
> = GlasslikeBaseProps &
  JSX.IntrinsicElements[T] & {
    as?: T;
    children?: T extends 'input' | 'img' ? never : React.ReactNode;
  };

export const Glasslike = <
  T extends keyof JSX.IntrinsicElements = 'div', // ✅ default: div
>({
  as = 'div',
  colorScheme = 'blue',
  shape = 'rounded',
  hoverEffect,
  width,
  height,
  style,
  centerContent = false,
  noPadding = false,
  children,
  ...rest
}: GlasslikeProps<T>) => {
  // "button" と "a" 以外の要素ではデフォルトでホバーしない
  const defaultHoverEffect = hoverEffect !== undefined 
    ? hoverEffect 
    : (as === 'button' || as === 'a');

  const baseStyle = useGlasslikeStyle({
    colorScheme,
    shape,
    width,
    height,
    centerContent,
    noPadding,
    Component: as,
    style,
  });

  return (
    <GlassBase
      as={as}
      baseStyle={baseStyle}
      palette={colorPalettes[colorScheme]}
      hoverEffect={defaultHoverEffect}
      {...(rest as any)}
    >
      {children}
    </GlassBase>
  );
};

export default Glasslike;
