import { html, TemplateResult } from 'lit';
import '../src/cr-store.js';

export default {
  title: 'CrStore',
  component: 'cr-store',
  argTypes: {
    backgroundColor: { control: 'color' },
  },
};

interface Story<T> {
  (args: T): TemplateResult;
  args?: Partial<T>;
  argTypes?: Record<string, unknown>;
}

interface ArgTypes {
  header?: string;
  backgroundColor?: string;
}

const Template: Story<ArgTypes> = ({ header, backgroundColor = 'white' }: ArgTypes) => html`
  <cr-store style="--cr-store-background-color: ${backgroundColor}" .header=${header}></cr-store>
`;

export const App = Template.bind({});
App.args = {
  header: 'My app',
};
