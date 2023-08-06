export const formatter = (amount: any) => {
 const formatMoney = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
  });

  return formatMoney?.format(amount)
}