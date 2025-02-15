/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable wc/guard-super-call */
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { Routes } from '@lit-labs/router';
import { CartContext, Cart, Product } from './context/cart-context.js';
import './components/cr-button.js';
import './components/cr-card.js'
import './components/cr-sidebar.js'
import './components/cr-header.js'



@customElement('cr-store')
export class CrStore extends LitElement {
  @property({ type: String }) header = 'My E-commerce Store';

  @property({ type: Array }) products: Product[] = [];

  @property({ type: Array }) thing = [];

  @property({ type: Boolean }) fetching = false;

  @property({ type: String }) error = '';

  @provide({ context: CartContext })
  @property({ attribute: false })
  cart: Cart = new Cart();




  connectedCallback(): void {

    this.fetchData();
    super.connectedCallback();
    this._routes = new Routes(this, [
      { path: '/', render: () => html`<h1>Home</h1>` },
      { path: '/projects', render: () => html`<h1>Projects</h1>` },
      { path: '/about', render: () => html`<h1>About</h1>` },
    ])
  }

  private _routes: Routes | undefined;


  async fetchData() {

    try {
      const r = await fetch(`https://fakestoreapi.com/products`)

      if (!r.ok) {
        throw new Error(`API Error: ${r.status}`)
      }
      const data = await r.json(); // Store parsed response once

      this.cart.items = data;

      console.log(this.cart)


      this.products = data;
    } catch (e) {
      this.error = e as string
    }
    this.fetching = false

  }


  static styles = css`
    :root {
      --cr-header-size: 100px;
      --cr-store-background-color: #f0f0f0;
    }

    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
      
    }

    main {
      width: 100%;
      height: 100%;
      margin-top: var(--cr-header-size, 100px);
    }

    .products {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 20px;
    }

    h1 {
      margin: 0px;
      padding: 20px 40px;
      font-size: 24px;
    }

   
  `;

  render() {

    if (this.fetching) {
      return html`<div>Loading...</div>`
    }

    return html`
    <cr-header>
    </cr-header>
      <main>
      <div>${this._routes?.outlet()}</div>
         <div class="products">
          ${this.cart.items.map((product) => html`
            <cr-card 
            nameTitle=${product.title} 
            description=${product.description} 
            image=${product.image} 
            price=${product.price}
            category=${product.category}
            productId=${product.id}
            ></cr-card>`)}
        </div>
        <cr-sidebar>
        </cr-sidebar>
      </main>
    `;
  }
}


declare global {
  interface HTMLElementTagNameMap {
    'cr-strore': CrStore;
  }
}