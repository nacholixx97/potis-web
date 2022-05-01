export interface DataGridModel {
    selectedPage: number,
    pageSize: number
}

export interface SortingModel {
    sortBy: string,
    sortDirection: string
}

export interface ListResponse<T> {
    data: T[],
    selectedPage: number,
    pageSize: number,
    totalPages: number,
    totalRows: number
}