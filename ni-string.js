const template = document.createElement('template');

template.innerHTML = `
  <div class='container input'>
    <textarea class='field'></textarea>
  </div>
`;

class NIString extends HTMLElement {
  constructor() {
    super();
    
    this.userType = this.userType.bind(this);
    this.appendChild(template.content.cloneNode(true));
    
    this.container = this.querySelector('.container');
    this.field = this.querySelector('.field');
  }
  connectedCallback() {
    this.field.addEventListener('change', this.userType);
    
    if (this.hasAttribute("wrap", "off")) {
      this.field.addEventListener("keydown", this.returnKey);
    }
  }
  userType() {
     var changedText = this.field.value;
     this.text = changedText;
  }
  returnKey(e) {
    if (e.which === 13) {
      e.preventDefault();
    } 
  }
  static get observedAttributes() {
    return ['text', 'placeholder'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'text') {
      this.newText = newValue;
      this.field.value = newValue;
    };
    
    if (name === 'placeholder') {
      this.field.setAttribute("placeholder", newValue);
    };
  }
  get text() {
    return this.newText;
  }
  set text(v) {
    this.setAttribute("text", v);
  }
  get placeholder() {
    return this.newPlace;
  }
  set placeholder(v) {
    this.setAttribute("placeholder", v);
  }
  disconnectedCallback() {
    this.field.removeEventListener('change', this.userType);
  }
}

customElements.define('ni-string', NIString);
