class NIString extends HTMLElement {
  constructor() {
    super();
    
    const template = document
    .createElement('template');
    
    var content = this.innerHTML;
    this.innerHTML = "";
    
    template.innerHTML = `
 <span class='label'>Label</span>
 <div class='control'>
  <div class='container input'>
    <textarea class='field'></textarea>
   </div>
 </div>
`;
    
    this.userType = this.userType.bind(this);
    this.append(template.content.cloneNode(true));
    
    this.container = this
      .querySelector('.inner-container');
    this.field = this.querySelector('.field');
  }
  connectedCallback() {
    this.field
      .addEventListener('change', this.userType);
    
    if (this.hasAttribute("wrap", "off")) {
      this.field
        .addEventListener("keydown", this.returnKey);
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
  disconnectedCallback() {
    this.field.removeEventListener('change', this.userType);
  }
};

customElements.define('ni-string', NIString);
