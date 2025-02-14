import { consume } from "@lit/context";
import { css, html, LitElement } from "lit";
import { property, customElement } from "lit/decorators.js";
import { Cart, CartContext } from "../context/cart-context.js";


// add comment for using the button with properties
/**
 * bgColor="#28a745" textColor="#fff" variant="filled"
 * @cssprop {Color} --bg-color - The background color of the button
 * @cssprop {Color} --text-color - The text color of the button 
 */
@customElement('cr-button')
export class CrButton extends LitElement {
  @property({ type: String }) bgColor = 'red';

  @property({ type: String }) textColor = 'white';

  @property({ type: String }) variant: 'filled' | 'outlined' = 'filled';

  @property({ type: Number }) productId = 1;


  @consume({ context: CartContext, subscribe: true })
  @property({ attribute: false })
  private cartService?: Cart;



  static styles = css`
    button {
      font-size: 16px;
      padding: 10px 20px;
      border-radius: 4px;
      cursor: pointer;
      border: none;
      transition: 0.3s ease-in-out;
    }
    .filled {
      background-color: var(--bg-color, #007bff);
      color: var(--text-color, #ffffff);
    }
    .outlined {
      background-color: transparent;
      border: 2px solid var(--bg-color, #007bff);
      color: var(--bg-color, #007bff);
    }
    button:hover {
      opacity: 0.8;
    }
  `;

  render() {
    return html`
        
        <button
        aria-label="button"
        class=${this.variant}
        @click=${() => this.cartService?.addCartItems(this.productId)}
        style="--bg-color: ${this.bgColor}; --text-color: ${this.textColor};"
      >
        <slot></slot>
      </button>
    `
  }


}