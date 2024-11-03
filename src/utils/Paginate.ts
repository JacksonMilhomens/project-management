export class Paginate {
  private page = 0;
  private itensPage = 10;

  constructor(page: number | undefined, itensPage: number | undefined) {
    if (page && itensPage && page > 0 && itensPage > 0) {
      this.page = (page - 1) * itensPage;
      this.itensPage = itensPage;
    }
  }

  getOffset() {
    return this.page;
  }

  getLimit() {
    return this.itensPage;
  }
}
