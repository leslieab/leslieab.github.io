/* STRING */ 

class NIString extends HTMLElement {
  constructor() {
    super();
    
    const template = document
    .createElement('template');
    
    template.innerHTML = `
  <div class='control'>
    <div class='container input'>
      <textarea class='field'></textarea>
    </div>
  </div>
`;
    
    this.userType = this.userType.bind(this);
    this.append(template.content.cloneNode(true));

    this.container = this.querySelector('.container');
    this.field = this.querySelector('.field');
    this.control = this.querySelector('.control');
    
    if (this.hasAttribute("label")) {
      const label = customElements.get('ni-label');
      var newLabel = new label();
      this.insertBefore(newLabel, this.control);
    }
    
    this.label = this.querySelector('.label'); 
  }
  connectedCallback() {
    this.field
      .addEventListener('change', this.userType);
    
    if (this.hasAttribute('wrap', 'off')) {
      this.field.addEventListener('keydown', this.returnKey);
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
    return ['value', 'placeholder', 'label'];
  }
  attributeChangedCallback(name, oldValue, newValue) {
    if (name === 'value') {
      this.newText = newValue;
      this.field.value = newValue;
    };
    
    if (name === 'placeholder') {
      this.field.setAttribute('placeholder', newValue);
    };
    
    if (name === 'label') {
      this.label.textContent = newValue;
    };
  }
  get text() {
    return this.newText;
  }
  set text(v) {
    this.setAttribute('value', v);
  }
  disconnectedCallback() {
    this.field.removeEventListener('change', this.userType);
  }
};

customElements.define('ni-string', NIString);

<script src="https://leslieab.github.io/label.js" type="text/javascript"></script>

