import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';


@customElement('cr-header')
export class CrHeader extends LitElement {

    render() {
        return html`
        <header>
            <h1>My E-commerce Store</h1>
        </header>
        `
    }

}
