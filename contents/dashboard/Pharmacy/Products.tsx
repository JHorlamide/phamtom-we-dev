import { useRouter } from 'next/router';
import React from 'react';
import { useDispatch } from 'react-redux';
import { setSelectedProduct, setPharmacyState } from '../../../redux/actions/pharmacy';

var formatMoney = new Intl.NumberFormat('en-NG', {
  style: 'currency',
  currency: 'NGN',
  //minimumFractionDigits: 0, 
  maximumFractionDigits: 2, 
});


const Products = ({ Products, styles, Image }: any) => {
  const { push } = useRouter()
  const dispatch = useDispatch();
  return (
    <div>
      <ul className={styles.products_container}>
        {Products.map((item: any, index: any) => (
          <li 
            key={index} 
            className={styles.product}
            onClick= {()=>{ 
                dispatch(setPharmacyState('PRODUCTS'))
                dispatch(setSelectedProduct(item))
                push('/dashboard/pharmacy/products')
              }
            }
          >
            <Image
              src={item?.product_image?.imageUrl}
              alt='product'
              width={'160px'}
              height='117px'
              layout='fixed'
            />
            <p className={styles.name}>{item?.product_name}</p>
            <p className={styles.item_price}> {formatMoney.format(item.product_price)}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
