export interface ReleaseNote {
  version: string;
  date: string;
  title: string;
  description: string;
  features?: string[];
  fixes?: string[];
  improvements?: string[];
}
