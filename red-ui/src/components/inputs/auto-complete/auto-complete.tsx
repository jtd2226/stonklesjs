import {
  Component,
  Prop,
  State,
  h,
  Watch,
  Event,
  EventEmitter,
  Method,
  Element,
  Host,
} from '@stencil/core';
import PrefixTrie from 'src/dsa/PrefixTrie';

@Component({
  tag: 'auto-complete',
  styleUrl: 'auto-complete.css',
  shadow: true,
})
export class AutoComplete {
  @Element() host: HTMLElement;

  @Prop() label: string;
  @Prop() required: boolean = true;
  @Prop() options: string = '';
  @Prop() selected: string = '';

  @State() open: boolean = false;
  @State() trie: PrefixTrie = PrefixTrie(this.options.split(';'));
  @State() matches: string[] = this.trie.matches;
  @State() value: string = this.selected;

  @Event() pick: EventEmitter<string>;

  @Watch('options')
  onOptionsChange(options) {
    this.trie = PrefixTrie(options.split(';'));
    this.matches = this.trie.matches;
  }

  @Watch('selected')
  onValueChange() {
    this.value = this.selected;
    this.validate();
  }

  handleFocus = () => {
    this.open = true;
  };

  handleBlur = () => {
    this.open = false;
  };

  handleChange = e => {
    this.value = e.detail ?? '';
    this.matches = this.trie.find(this.value);
  };

  selectOption = option => {
    this.open = false;
    this.value = option;
    this.matches = this.trie.matches;
    this.pick.emit(option);
  };

  @Method()
  async validate() {
    return this.host.shadowRoot.querySelector('text-input')?.validate();
  }

  render() {
    return (
      <Host>
        <text-input
          label={this.label}
          value={this.value}
          onInputChange={this.handleChange}
          onClick={this.handleFocus}
          required={this.required}
        />
        <div class={`options ${this.open ? 'open' : ''}`}>
          {this.matches.map(option => (
            <div class="option" onClick={() => this.selectOption(option)}>
              {option}
            </div>
          ))}
        </div>
        {this.open && <div class="backdrop" onClick={this.handleBlur} />}
      </Host>
    );
  }
}
