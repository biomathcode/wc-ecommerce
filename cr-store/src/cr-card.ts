import { LitElement, css, html } from "lit";
import { property, customElement } from "lit/decorators.js";

import './cr-badge.js'

// slot will give you more flexibility 
// 

@customElement('cr-card')
export class CrCard extends LitElement {

    @property({ type: String }) nameTitle = 'Cart';

    @property({ type: String }) description = '';


    @property({ type: String }) image = '';

    @property({ type: String }) price = '';

    @property({ type: String }) category = '';

    static styles = css`
        :host {
            position: relative;
            border: 2px solid #444;
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            padding: 10px;
            font-size: 16px;
            margin: 10px;
            max-width: 300px;
            gap: 20px;
            background: white;
        }

        :host img {
            min-width: 100px;
            minb-height: 100px;
            margin: 10px;
        }
        
        :host div[data-name='title'] {
            font-size: 18px;
            font-weight: semibold;
            
        }

        :host div[data-name='description'] {
            font-size: 14px;
            text-color: #eee;
            margin-top: 10px;
            display: -webkit-box;

            -webkit-line-clamp: 3;
            -webkit-box-orient: vertical;
            overflow: hidden;
        }

        :host div[data-name="price"] {
            margin: 20px 10px;
            font-size: 20px;
            font-style: italic;
        }

        :host cr-badge {
            position: absolute;
            top: 20px;
            left: 20px;
            z-index: 1;

        }

    `





    render() {
        return html`
            <div class="card">
            
                <img src=${this.image} alt="product" width="100" height="100">
                <div data-name='title'>${this.nameTitle}</div>
                <cr-badge variant=${this.category === "jewelery" ? 'warning' : 'info'} label=${this.category}></cr-badge>

                <div data-name='description'>${this.description}</div>  
                <div data-name='price'>$ ${this.price}</div>
                <div data-name='price'>$ ${this.category}</div>

                <cr-button bgColor="#003A5A " textColor="#D5EBFF" >Buy</cr-button>
                
            </div>

        `
    }

}