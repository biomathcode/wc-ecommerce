
import { LitElement, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

const variants = {
    'info': {
        backgroundColor: '#D5EBFF',
        textColor: '#003A5A'
    },
    'warning': {
        backgroundColor: '#FED6A5',
        textColor: '#5E4300'
    },
    'critical': {
        backgroundColor: '#FED0D6',
        textColor: '#8E0A20'
    },
    'neutral': {
        backgroundColor: '#F1F0F1',
        textColor: '#616060'
    }

}

@customElement('cr-badge')
export class CrBadge extends LitElement {

    @property({ type: String }) label = 'New';

    @property({ type: String }) variant: 'info' | 'warning' | 'critical' | 'neutral' = 'info';



    static styles = css`
        div {
            padding: 5px 10px;
            border-radius: 5px;
            display: inline-block;
            font-size: 12px;
            font-weight: bold;
            background-color: var(--bg-color, #D5EBFF);
            color: var(--text-color, #003A5A);
        }
    `

    render() {
        const style = variants[this.variant] || variants.info;

        return html`
            <div style="--bg-color: ${style.backgroundColor}; --text-color: ${style.textColor}">
            ${this.label}
                
            </div>
        
        `
    }

}
