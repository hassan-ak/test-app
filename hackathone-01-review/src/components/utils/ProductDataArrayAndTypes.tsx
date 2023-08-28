export interface slugType {
  _type: string;
  current: string;
}

export interface assetImageType {
  _type: string;
  _ref: string;
}

export interface imageType {
  asset: assetImageType;
  _type: string;
  alt: string;
  _key: string;
}

export interface oneProductType {
  slug: any;
  quantity: number;
  _rev: string;
  _type: string;
  productName: string;
  _createdAT: string;
  _id: string;
  _updatedAT: string;
  image: Array<imageType>;
  description: any;
  productTypes: Array<string>;
  size: Array<string>;
  price: number;
}

export interface responseType {
  result: Array<oneProductType>;
}
