import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Button, Centered, Emphasis, GrayBox } from './components';
import './sass/index.scss';

const app = document.getElementById('app');

const App = () => (
  <Centered>
    <GrayBox>
      <p style={{ width: '600px' }}>
        Hello, <Emphasis>world</Emphasis>
      </p>
      <Button primary onClick={() => alert('Ok!')}>
        Ok
      </Button>
    </GrayBox>
  </Centered>
);

ReactDOM.render(<App />, app);
