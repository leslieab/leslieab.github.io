/* Label */
(function() {
  class NILabel extends HTMLElement {
    constructor() {
      super();
      
      const template = document.createElement('template');
      template.innerHTML = `
        <span class='label'>hi</span>
      `;
      this.append(template.content.cloneNode(true));
    }
  };
  customElements.define('ni-label', NILabel);
  export const label = customElements.get('ni-label');
})();
