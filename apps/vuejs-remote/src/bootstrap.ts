import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

export class VuejsApp extends HTMLElement {
  /**
   * connectedCallback:
   * Invoked each time the custom element is appended into a document-connected element.
   * This will happen each time the node is moved, and may happen before the element's contents have been fully parsed.
   */
  connectedCallback() {
    createApp(App).use(router).mount(this)
  }
}

customElements.define('vuejs-app', VuejsApp)
