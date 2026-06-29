//--------------------------------------------------------------

export interface IPDFGenerate {
  content: string;
  folderName: string;
  template: string;
  pageSetup?: any;
  filename?: string;
}

export interface IPDFGenerateRet {
  filename: string;
  filePath: string;
}
