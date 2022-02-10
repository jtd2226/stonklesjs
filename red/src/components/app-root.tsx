import { Component, h, Prop, Watch } from '@stencil/core';
import countries from 'src/meta/countries';

@Component({
  tag: 'app-root',
  styleUrl: 'app-root.css',
  shadow: true,
})
export class AppRoot {
  @Prop() state: any;
  @Prop({ attribute: 'setState' }) setState: () => any;

  @Watch('setState')
  onStateChange(setState: () => any) {
    this.state = setState();
  }
  render() {
    return (
      <div class="app-root">
        <flex-container gap="16px">
          <text-input label="First name" />
          <text-input label="Last name" />
        </flex-container>
        <auto-complete options={countries.join(';')} />
      </div>
    );
  }
}
