import React from 'react';
import { colorPalettes } from '../styles/colors';
import {
  shapeStyles,
  glassBorders,
  glassBlur,
  defaultDisplayMap,
  type Shape,
} from '../styles/styleParts';

interface UseGlasslikeStyleProps {
  colorScheme: keyof typeof colorPalettes;
  shape: Shape;
  width?: string | number;
  height?: string | number;
  centerContent?: boolean;
  noPadding?: boolean;
  Component: keyof JSX.IntrinsicElements;
  style?: React.CSSProperties;
}

export const useGlasslikeStyle = ({
  colorScheme,
  shape,
  width,
  height,
  centerContent = false,
  noPadding = false,
  Component,
  style,
}: UseGlasslikeStyleProps): React.CSSProperties => {
  const palette = colorPalettes[colorScheme];

  let finalWidth = width;
  let finalHeight = height;
  let aspectRatioStyle: React.CSSProperties = {};

  if (shape === 'circle') {
    if (!width && !height) finalWidth = '40px';
    aspectRatioStyle = { aspectRatio: '1 / 1' };
  }

  const contentCenterStyle: React.CSSProperties = centerContent
    ? { display: 'flex', alignItems: 'center', justifyContent: 'center' }
    : {};

  return {
    display: defaultDisplayMap[Component] || 'inline-flex',
    padding: noPadding
      ? '0'
      : Component === 'input' || Component === 'textarea'
      ? '0.5rem 1rem'
      : '0.5rem 1.5rem',
    fontWeight: 'normal',
    color: palette.textColorBase,
    background: palette.baseGradient,
    boxShadow: palette.boxShadowBase,
    textShadow: palette.textShadowBase,
    borderBottom: palette.borderBottom,
    transition: 'all 0.35s ease',
    ...glassBorders,
    ...glassBlur,
    width: finalWidth,
    height: finalHeight,
    borderRadius: shapeStyles[shape].borderRadius,
    cursor: 'pointer',
    ...aspectRatioStyle,
    ...contentCenterStyle,
    ...style,
  };
};
