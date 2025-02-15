import { PropertyValues, ReactiveElement } from 'lit';
import { property } from 'lit/decorators.js';

type Constructor<T = Record<string, unknown>> = {
  new (...args: any[]): T;
  prototype: T;
};

export type ElementSize = 'xxs' | 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl';
export const ElementSizes: Record<string, ElementSize> = {
  xxs: 'xxs',
  xs: 'xs',
  s: 's',
  m: 'm',
  l: 'l',
  xl: 'xl',
  xxl: 'xxl',
};

export type DefaultElementSize = Exclude<ElementSize, 'xxs' | 'xxl' | 'xs'>;

export interface SizedElementInterface {
  size: ElementSize;
}

export function SizedMixin<T extends Constructor<ReactiveElement>>(
  constructor: T,
  {
    validSizes = ['s', 'm', 'l', 'xl'],
    noDefaultSize,
    defaultSize = 'm',
  }: {
    validSizes?: ElementSize[];
    noDefaultSize?: boolean;
    defaultSize?: ElementSize;
  } = {},
): T & Constructor<SizedElementInterface> {
  class SizedElement extends constructor {
    @property({ type: String })
    public get size(): ElementSize {
      return this._size || defaultSize;
    }

    public set size(value: ElementSize) {
      const fallback = noDefaultSize ? null : defaultSize;
      const size = (value ? value.toLocaleLowerCase() : value) as ElementSize;

      const validSize = (
        validSizes.includes(size) ? size : fallback
      ) as ElementSize;

      if (validSize) {
        this.setAttribute('size', validSize);
      }

      if (this._size === validSize) {
        return;
      }

      const oldSize = this._size;
      this._size = validSize;
      this.requestUpdate('size', oldSize);
    }

    private _size: ElementSize | null = defaultSize;

    protected override update(changes: PropertyValues): void {
      if (!this.hasAttribute('size') && !noDefaultSize) {
        this.setAttribute('size', this.size);
      }

      super.update(changes);
    }
  }

  return SizedElement;
}
