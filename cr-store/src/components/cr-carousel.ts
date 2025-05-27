/* eslint-disable @typescript-eslint/no-unused-vars */
import { LitElement, css, html } from "lit";
import { customElement } from "lit/decorators.js";

const styles = css`
    :host {
        display: inline-block;
        overflow: hidden;
        position: relative;
        width: 200px;
        height: 200px;
        border-radius: 4px;
        background: gainsboro;
        cursor: pointer;
    }

    .fit {
        position: relative;
        height: 100%;
        width: 100%;

    }
    
    /* selects all the children */
    ::slotted(*) {
        box-sizing: border-box;
        width: 100px;
        height: 100px;

    }
`


@customElement('motion-carousel')
class MotionCarousel extends LitElement {

    render() {
        return html`
        <div class="fit">
            <slot>
            </slot>
        </div>


        `
    }

}


export { MotionCarousel };