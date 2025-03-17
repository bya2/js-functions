export default interface IFilterable {
  filterLessThan(n: number): this;
  filterContinity(si: number, ei: number): this;
}
