export interface IEnclose {
  isEnclose(pairs: Record<string, string>): boolean;
  modify(): string;
}
