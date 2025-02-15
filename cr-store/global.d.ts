import { CrButton } from './src/components/cr-button.ts';
import { CrStore } from './src/cr-store.js';

declare global {
  interface HTMLElementTagNameMap {
    'cr-store': CrStore;
  }
  interface HTMLElementTagNameMap {
    'cr-button': CrButton;
  }
}
