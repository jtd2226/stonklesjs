import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'flex-container',
  styleUrl: 'flex-container.css',
  shadow: true,
})
export class FlexContainer {
  @Prop() gap: string = '16px';
  render() {
    return (
      <div class="flex-container" style={{ display: 'flex', gap: this.gap }}>
        <slot />
      </div>
    );
  }
}
