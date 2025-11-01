export class productAttribute {
  color: string;
  material: string;
  warranty: string;
}

export class Categories {
  public _id: string;
  public name: string;
}

export class ProductData {
  public _id: string;
  public name: string;
  public sku: string;
  public description: string;
  public price: number;
  public discount: number;
  public categoryId: Categories;
  public brand: string;
  public images: string[];
  public stock: number;
  public rating: number;
  public numReviews: number;
  public attributes: productAttribute;
  public isFeatured: boolean;
  public createdAt: Date;
  public updatedAt: Date;
  public __v: number;
}

export class Product {
  success: boolean;
  total: number;
  page: number;
  pages: number;
  count: number;
  data: ProductData[];
}
