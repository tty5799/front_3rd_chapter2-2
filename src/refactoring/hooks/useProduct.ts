import { useState } from 'react';
import { Product } from '../../types.ts';
import { updateProductInList } from './utils/productUtils.ts';

export const useProducts = (initialProducts: Product[]) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);

  const updateProduct = (updatedProduct: Product) =>
    setProducts((prevProducts) => updateProductInList(prevProducts, updatedProduct));

  const addProduct = (newProduct: Product) =>
    setProducts((prevProducts) => [...prevProducts, newProduct]);

  return { products, updateProduct, addProduct };
};
