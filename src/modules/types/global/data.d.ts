interface DataPage<D> {
  data: D;
  info: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
}
