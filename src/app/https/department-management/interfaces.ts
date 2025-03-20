export interface IListDepartmentInfo {
  content: IDepartmentInfo[];
  totalRecords: number;
}

export interface IDepartmentInfo {
  id: number;
  name: string;
  code: string;
  description: string;
  active: boolean;
}

export interface IFilterForm {
  name: string;
  code: string;
  description: string;
  active: boolean;
}

export interface IParamsPagination {
  pageSize: number;
  page: number;
}

export interface IDiagram {
  id: string;
  name: string;
  image: string;
  dataNode: string;
  dataLink: string;
}
