import { css, html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('cr-header')
export class CrHeader extends LitElement {
  static styles = css`
    :host {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      display: flex;
      justify-content: center;
      background-color: var(--sl-color-gray-50);
      color: var(--sl-color-blue-700);
      margin-bottom: 20px;
      z-index: 2;
    }
    header {
      height: 60px;
      width: 100vw;
      display: flex;
      padding: 10px 40px;
      max-width: 960px;
      margin: 0 auto;
    }

    h1 {
      font-size: 24px;
    }
  `;

  render() {
    return html`
      <header>
        <h1>My E-commerce Store</h1>
      </header>
    `;
  }
}
