export interface Usuario {
  login: string;
  passwd: string | null;
  tryAccess?: number | null;
  dateTry?: string | null;
}
