/* eslint-disable wc/guard-super-call */
import { consume } from '@lit/context';
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { Cart, CartContext } from '../context/cart-context.js';

@customElement('cr-sidebar')
export class CrSidebar extends LitElement {
  @property({ type: Boolean, reflect: true }) open = false;

  @consume({ context: CartContext, subscribe: true })
  @property({ attribute: false })
  private cartService?: Cart;

  connectedCallback() {
    super.connectedCallback();
    this.observeCart();
  }

  willUpdate(changedProperties: Map<string, any>) {
    if (changedProperties.has('cartService')) {
      this.requestUpdate();
    }
  }

  observeCart() {
    if (!this.cartService) return;

    const originalAdd = this.cartService.addCartItems;
    this.cartService.addCartItems = (...args) => {
      originalAdd.apply(this.cartService, args);
      this.requestUpdate(); // Ensure UI updates when cart changes
    };

    const originalRemove = this.cartService.removeItem;
    this.cartService.removeItem = (...args) => {
      originalRemove.apply(this.cartService, args);
      this.requestUpdate();
    };
  }

  static styles = css`
    :host {
      position: fixed;
      transition: 0.3s ease-in-out;
      transform: translateX(100%);
      top: 0px;
      height: 100vh;
      width: 360px;
      right: 0px;
      background: #999;
      border-right: 1px solid #444;
      font-size: 12px;
      // overflow: scroll;
      padding: 10px 20px;
      z-index: 999999;
    }

    :host([open]) {
      transform: translateX(0%);
    }

    :host button {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #444;
      color: white;
      transition: 0.3s ease-in-out;
    }

    :host button::before {
      content: var(--number-of-items);
    }

    :host([open]) button {
      left: 10px;
    }

    :host button {
      left: -50px;
    }
  `;

  _toggle() {
    this.open = !this.open;
  }

  render() {
    return html`
      <button @click=${this._toggle}>
        ${!this.open ? `🛍️${String(this.cartService?.cartItems.length)}` : '🛍️'}
      </button>
      <div>
        <h3>
          Consumer data:
          <code>${JSON.stringify(this.cartService?.cartItems)}</code>
        </h3>
      </div>
    `;
  }
}
