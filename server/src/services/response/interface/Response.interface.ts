//--------------------------------------------------------------

interface IObj {
  [key: string]: any;
}

export interface IApiResponse {
  code: string;
  codeKey?: string;
  error?: string;
  errors?: IObj;

  message?: string;
  data?: any;
  log?: any;
}
