import { Discount, Product } from '../../../types.ts';

export const findProductById = (products: Product[], productId: string) =>
  products.find((p) => p.id === productId);

export const removeDiscountByIndex = (discounts: Discount[], index: number) =>
  discounts.filter((_, i) => i !== index);

export const updateProductInList = (products: Product[], updatedProduct: Product): Product[] =>
  products.map((p) => (p.id === updatedProduct.id ? updatedProduct : p));
