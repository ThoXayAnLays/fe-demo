export interface IGetListDiagram {
  departmentId: number;
  textSearch: string;
}

export interface IParamsPagination {
  pageSize: number;
  page: number;
}

export interface IListDiagram {
  content: IDiagram[];
  totalRecords: number;
  totalPages: number;
  page: number;
  pageSize: number;
}

export interface IDiagram {
  id: string;
  name: string;
  image: string;
  dataNode: string;
  dataLink: string;
}

//create

export interface ICreateDiagram {
  name: string;
}

export interface ICreateDiagramRes {
  id: number;
  name: string;
  url: string;
  dataNote: string;
  dataLink: string;
}
