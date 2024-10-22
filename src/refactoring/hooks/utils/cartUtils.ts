import { CartItem, Coupon } from '../../../types';

export const calculateItemTotal = (item: CartItem) => {
  const { price } = item.product;
  const quantity = item.quantity;

  const maxDiscount = getMaxApplicableDiscount(item);
  const discountedPrice = price * (1 - maxDiscount);

  return discountedPrice * quantity;
};

export const getMaxApplicableDiscount = (item: CartItem) => {
  const { discounts } = item.product;
  const quantity = item.quantity;

  return discounts.reduce((maxDiscount, discount) => {
    if (quantity >= discount.quantity && discount.rate > maxDiscount) {
      return discount.rate;
    }
    return maxDiscount;
  }, 0);
};

export const calculateCartTotal = (cart: CartItem[], selectedCoupon: Coupon | null) => {
  const totalBeforeDiscount = cart.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);

  let finalTotal = cart.reduce((total, item) => {
    return total + calculateItemTotal(item);
  }, 0);

  if (selectedCoupon) {
    if (selectedCoupon.discountType === 'amount') {
      finalTotal = Math.max(0, finalTotal - selectedCoupon.discountValue);
    } else {
      finalTotal *= 1 - selectedCoupon.discountValue / 100;
    }
  }

  const totalDiscount = totalBeforeDiscount - finalTotal;

  return {
    totalBeforeDiscount: Math.round(totalBeforeDiscount),
    totalAfterDiscount: Math.round(finalTotal),
    totalDiscount: Math.round(totalDiscount),
  };
};

export const updateCartItemQuantity = (
  cart: CartItem[],
  productId: string,
  newQuantity: number,
): CartItem[] => {
  return cart
    .map((item) => {
      if (item.product.id === productId) {
        const maxQuantity = item.product.stock;
        const updatedQuantity = Math.max(0, Math.min(newQuantity, maxQuantity));
        return updatedQuantity > 0 ? { ...item, quantity: updatedQuantity } : null;
      }
      return item;
    })
    .filter((item): item is CartItem => item !== null);
};
