import React, { useState } from 'react';
import * as ReactDOM from 'react-dom';
import * as api from './api';
import {
  Button,
  Centered,
  Emphasis,
  FormField,
  GrayBox,
  TextInput,
} from './components';
import './sass/index.scss';

const app = document.getElementById('app');

const WorkspaceInputPage: React.FC<{
  onSubmit: (workspaceName: string) => void;
}> = (props) => {
  const [workspaceName, setWorkspaceName] = useState<string>('');

  return (
    <React.Fragment>
      <FormField>
        <TextInput
          label='Workspace name'
          value={workspaceName}
          onValueChange={(newValue) => setWorkspaceName(newValue)}
        />
      </FormField>
      <FormField>
        <Button
          primary
          disabled={!workspaceName}
          onClick={() => props.onSubmit(workspaceName)}
        />
      </FormField>
    </React.Fragment>
  );
};

const MigrationsDisplayPage: React.FunctionComponent<{
  migrations: api.Migration[];
}> = (props) => (
  <React.Fragment>
    <h3>Migrations:</h3>
    {props.migrations.map((m, i) => (
      <p key={i}>File: {m.filename}</p>
    ))}
  </React.Fragment>
);

const WorkspaceProgressPage: React.FunctionComponent<{
  message: string;
}> = (props) => (
  <React.Fragment>
    <h3>Creating workspace:</h3>
    {props.message}
  </React.Fragment>
);

const App = () => (
  <Centered>
    <GrayBox width={400}>
      <p style={{ width: '600px' }}>
        Hello, <Emphasis>world</Emphasis>
      </p>
      <Button primary onClick={() => alert('Ok!')}>
        OK
      </Button>
    </GrayBox>
  </Centered>
);

ReactDOM.render(<App />, app);
