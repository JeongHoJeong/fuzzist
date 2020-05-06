interface GistFile {
  filename: string;
  type: string;
  language: string;
  raw_url: string;
  size: number;
}

interface GistFileDetail extends GistFile {
  content: string;
  truncated: boolean;
}

export interface GistDetail {
  id: string;
  files: { [key: string]: GistFileDetail };
  truncated: boolean;
  description: string;
}

export interface Gist {
  id: string;
  files: { [key: string]: GistFile };
  truncated: boolean;
}
