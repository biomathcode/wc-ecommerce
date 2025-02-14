/* eslint-disable wc/guard-super-call */
import { LitElement, html, css } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { provide } from '@lit/context';
import { CartContext, Cart, Product } from './context/cart-context.js';

import './components/cr-button.js';
import './components/cr-card.js'
import './components/cr-sidebar.js'





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


  }

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
      background-color: var(--cr-store-background-color);
    }

    main {
      width: 100%;
      height: 100%;
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
      console.log('data', this.thing, this.products)
      return html`<div>Loading...</div>`
    }

    console.log('data', this.thing, this.products)


    return html`
      <main>
        <h1>${this.header}</h1>

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
