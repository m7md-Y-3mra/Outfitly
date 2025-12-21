export interface IPaginationQuery {
  page: number;
  limit: number;
  order?: "asc" | "desc" | Record<string, "asc" | "desc">;  
  field?: "createdAt" | "name" | "addedAt"; 
}
export interface IMetaPagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface IPaginationResult<T> {
  data: T[];
  meta: IMetaPagination;
}
