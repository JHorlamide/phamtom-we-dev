import React from 'react';

const Products = ({ Products, styles, Image }: any) => {
  return (
    <div>
      <ul className={styles.products_container}>
        {Products.map((item: any, index: any) => (
          <li key={index} className={styles.product}>
            <Image
              src={item.image}
              alt='product'
              width={'160px'}
              height='117px'
              layout='fixed'
            />
            <p className={styles.name}>{item.name}</p>
            <p className={styles.item_price}>NGN {item.price}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
