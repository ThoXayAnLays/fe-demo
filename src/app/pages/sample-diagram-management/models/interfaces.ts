export interface IInterfaces {}

export type DataCollapseMapType = {
  [key in string]: IDataCollapse;
};

export interface IDataCollapse {
  list: IDiagramItem[];
  currentActivePage: number;
  totalRecords: number;
  totalPages: number;
}

export interface IDiagramItem {
  id: number;
  name: string;
  url: string;
}

export interface IDiagramDetailData {
  id?: number;
  name: string;
  dataNode: string;
  dataLink: string;
  image: string;
}

export interface IDiagramModelData {
  prop: string;
}

export interface IDiagramNode {
  id: number | null;
  text: string;
  fill: string | null;
  stroke: string | null;
  textStroke: string | null;
  size: string | null;
  font: string;
  category?: string;
}

export interface IDiagramLink {
  key: string;
  from: number;
  to: number;
  fromPort?: string;
  toPort?: string;
  points?: number[];
}

export interface IDiagram {
  id?: string;
  name: string;
  image: string;
  description?: string;
  nodes: IDiagramNode[];
  links: IDiagramLink[];
  dataNode?: string;
  dataLink?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface INodeSelected {
  id: number | null;
  text: string;
  textStyle: string[];
  textFont: {
    name: string;
    code: string;
  };
  textFontSize: {
    name: string;
    code: string;
  };
  textColor: string;
  backgroundColor: string;
}

export interface IPaletteNodeData {
  key: number | string;
  font?: string;
  text?: string;
  figure?: string;
  size?: string;
  fill?: string | null;
  background?: string;
  stroke?: string | null;
  textStroke?: string | null;
  category?: string;
  width?: number;
  height?: number;
  source?: string;
}

export type skipsDiagramUpdateType = boolean;
