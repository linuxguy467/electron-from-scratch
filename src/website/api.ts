import { ipcRenderer, IpcRendererEvent } from 'electron';

const webserverDetails: Promise<{
  baseUri: string;
  authToken: string;
}> = new Promise((resolve) => {
  console.log('Waiting for webserver-started event from main process...');
  ipcRenderer.on(
    'webserver-started',
    (event: IpcRendererEvent, webServerDetails) => {
      console.log('webserver started from main process', webServerDetails);
      resolve(webServerDetails);
    }
  );
  ipcRenderer.send('ready-for-webserver-started');
});

async function api<TIn, TOut>(
  endpoint: string,
  method: 'GET' | 'POST' = 'GET',
  body?: TIn
): Promise<TOut> {
  // todo: timeout / error-handling / etc for if the webserver doesn't start properly
  const wsd = await webserverDetails;

  const encodedBody = body && JSON.stringify(body);

  const response = await fetch(`${wsd.baseUri}api/v1/${endpoint}`, {
    method,
    body: encodedBody,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${wsd.authToken}`,
    },
    mode: 'cors',
  });

  if (!response.ok) {
    throw new Error(`Request to ${endpoint} failed: ${response.statusText}`);
  }

  const responseContent = await response.json();

  console.info(`${endpoint} result: `, responseContent);

  return responseContent as TOut;
}

// TODO: look into generating this code from the swagger model

export interface Workspace {
  name: string;
  folder: string;
  projects: Project[];
}

interface Project {
  migrations: Migration[];
}

export interface Migration {
  filename: string;
}

interface WorkspaceCreateRequest {
  name: string;
  folderPath: string;
}

interface WorkspaceCreateResult {
  workspaceId: string;
}

export const createWorkspace = (
  req: WorkspaceCreateRequest
): Promise<WorkspaceCreateResult> =>
  api<WorkspaceCreateRequest, WorkspaceCreateResult>('workspaces', 'POST', req);

export const getProjectsFromWorkspace = (
  workspaceId: string
): Promise<string[]> =>
  api<string, string[]>(`workspaces/${workspaceId}/projects`);

export const getMigrationsFromProject = (
  workspaceId: string,
  projectId: string
): Promise<Migration[]> =>
  api<{}, Migration[]>(
    `workspaces/${workspaceId}/projects/${projectId}/migrations`
  );
