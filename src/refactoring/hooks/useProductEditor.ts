import { useState } from 'react';
import { Product, Discount } from '../../types';
import { findProductById, removeDiscountByIndex } from './utils/productUtils.ts';

export const useProductEditor = (
  products: Product[],
  onProductUpdate: (updatedProduct: Product) => void,
) => {
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [openProductIds, setOpenProductIds] = useState<Set<string>>(new Set());
  const [newDiscount, setNewDiscount] = useState<Discount>({ quantity: 0, rate: 0 });

  // 수정할 상품 토글 선택
  const toggleProductAccordion = (productId: string) => {
    setOpenProductIds((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(productId)) {
        newSet.delete(productId);
      } else {
        newSet.add(productId);
      }
      return newSet;
    });
  };

  // 수정할 상품 저장
  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
  };

  // 수정 완료
  const handleEditComplete = () => {
    if (editingProduct) {
      onProductUpdate(editingProduct);
      setEditingProduct(null);
    }
  };

  // 상품 이름
  const handleProductNameUpdate = (productId: string, newName: string) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({ ...editingProduct, name: newName });
    }
  };

  // 상품 가격
  const handlePriceUpdate = (productId: string, newPrice: number) => {
    if (editingProduct && editingProduct.id === productId) {
      setEditingProduct({ ...editingProduct, price: newPrice });
    }
  };

  // 상품 수량
  const handleStockUpdate = (productId: string, newStock: number) => {
    const updatedProduct = findProductById(products, productId);

    if (updatedProduct) {
      const newProduct = { ...updatedProduct, stock: newStock };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  // 상품 할인 추가
  const handleAddDiscount = (productId: string) => {
    const updatedProduct = findProductById(products, productId);

    if (updatedProduct && editingProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: [...updatedProduct.discounts, newDiscount],
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
      setNewDiscount({ quantity: 0, rate: 0 });
    }
  };

  // 상품 할인 삭제
  const handleRemoveDiscount = (productId: string, index: number) => {
    const updatedProduct = findProductById(products, productId);

    if (updatedProduct) {
      const newProduct = {
        ...updatedProduct,
        discounts: removeDiscountByIndex(updatedProduct.discounts, index),
      };
      onProductUpdate(newProduct);
      setEditingProduct(newProduct);
    }
  };

  return {
    editingProduct,
    openProductIds,
    newDiscount,
    setNewDiscount,
    toggleProductAccordion,
    handleEditProduct,
    handleEditComplete,
    handleProductNameUpdate,
    handlePriceUpdate,
    handleStockUpdate,
    handleAddDiscount,
    handleRemoveDiscount,
  };
};
