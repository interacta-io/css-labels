export type Padding = {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface LabelOptions {
  id: string;
  text: string | number;
  x: number;
  y: number;
  weight?: number;
  fontSize?: number;
  color?: string;
  opacity?: number;
  shouldBeShown?: boolean;
  style?: string;
  className?: string;
  padding?: Padding;
}

export type OnClickCallback = (e: MouseEvent, label: LabelOptions) => void | undefined

export interface Options {
  onLabelClick?: OnClickCallback;
  pointerEvents?: 'none' | 'auto' | 'all';
  dispatchWheelEventElement?: HTMLElement;
  dontInjectStyles?: boolean;
  padding?: Padding;
  fontSize?: number;
}
