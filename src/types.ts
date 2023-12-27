export type Padding = {
  left: number;
  top: number;
  right: number;
  bottom: number;
}

export interface LabelOptions {
  id: string;
  text: string;
  x: number;
  y: number;
  weight?: number;
  fontSize?: number;
  color?: string;
  opacity?: number;
  shouldBeShown?: boolean;
  style?: string;
  className?: string;
}

export type OnClickCallback = (e: MouseEvent, label: LabelOptions) => void | undefined

export interface Options {
  onLabelClick?: OnClickCallback;
  padding?: Padding;
  pointerEvents?: 'none' | 'auto' | 'all';
  dispatchWheelEventElement?: HTMLElement;
}
