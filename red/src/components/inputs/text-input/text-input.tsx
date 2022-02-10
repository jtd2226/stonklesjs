import {
  Component,
  h,
  Prop,
  Event,
  EventEmitter,
  State,
  Method,
  Watch,
  Host,
} from '@stencil/core';

const validations = {
  text() {
    return true;
  },
  phone(value) {
    if (value.match(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/)) {
      return true;
    } else {
      return false;
    }
  },
  email(value) {
    const valid = String(value)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
    if (valid) return true;
    else return false;
  },
  date(value) {
    const valid = String(value).match(
      /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/
    );
    if (valid) return true;
    else return false;
  },
  zip(value) {
    const valid = String(value).match(/(^\d{5}$)|(^\d{5}-\d{4}$)/);
    if (valid) return true;
    else return false;
  },
};

@Component({
  tag: 'text-input',
  styleUrl: 'text-input.css',
  shadow: true,
})
export class TextInput {
  @Prop() label: string;
  @Prop() required: boolean = true;
  @Prop() name: string;
  @Prop() type: string = 'text';
  @Prop({ reflect: true }) value: string;

  @Event() inputChange: EventEmitter<string>;

  @State() focused: boolean = false;
  @State() valid: boolean = true;

  @Method()
  async validate() {
    if (this.required && !this.value) {
      this.valid = false;
    } else {
      this.valid = true;
    }
    this.valid = this.valid && (validations[this.type]?.(this.value) ?? true);
    return this.valid;
  }

  @Watch('value')
  onValueChange() {
    this.validate();
  }

  handleFocus = e => {
    e.currentTarget?.select?.();
    this.focused = true;
  };

  handleBlur = () => {
    this.focused = false;
    this.validate();
  };

  handleInput = e => {
    const value = e.currentTarget.value ?? '';
    this.inputChange.emit(value);
    this.validate();
  };

  render() {
    return (
      <Host
        class={`${this.focused || this.value ? 'focus' : ''} ${
          this.valid ? 'valid' : 'invalid'
        }`}
      >
        {this.label && <label>{this.label}</label>}
        <input
          name={this.name}
          value={this.value}
          onInput={this.handleInput}
          onClick={this.handleFocus}
          onFocus={this.handleFocus}
          onBlur={this.handleBlur}
          required={this.required}
        />
      </Host>
    );
  }
}
