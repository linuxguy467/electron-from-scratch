import * as api from './api';

export type AppState =
  | {
      page: 'INPUT_WORKSPACE';
    }
  | {
      page: 'WAITING_FOR_WORKSPACE';
      progressMessage: string;
    }
  | {
      page: 'DISPLAY_MIGRATIONS';
      migrations: api.Migration[];
    };

export type AppAction =
  | { type: 'WORKSPACE_CREATION_REQUESTED' }
  | { type: 'WORKSPACE_CREATION_PROGRESS'; progressMessage: string }
  | { type: 'WORKSPACE_CREATION_COMPLETED'; migrations: api.Migration[] };

export const appReducer = (
  prevState: AppState,
  action: AppAction
): AppState => {
  switch (action.type) {
    case 'WORKSPACE_CREATION_REQUESTED':
      return {
        page: 'WAITING_FOR_WORKSPACE',
        progressMessage: 'Requesting workspace creation...',
      };
    case 'WORKSPACE_CREATION_PROGRESS':
      return {
        page: 'WAITING_FOR_WORKSPACE',
        progressMessage: action.progressMessage,
      };
    case 'WORKSPACE_CREATION_COMPLETED':
      return {
        page: 'DISPLAY_MIGRATIONS',
        migrations: action.migrations,
      };
    default:
      return prevState;
  }
};

export const initialState: AppState = { page: 'INPUT_WORKSPACE' };
