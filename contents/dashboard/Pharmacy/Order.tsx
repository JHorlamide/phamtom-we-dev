import React from 'react';

const MyOrders = ({ Orders, styles, Image }: any) => {
  return (
    <div>
      <ul className={styles.orders_container}>
        {Orders.map((item: any, index: any) => (
          <li key={index} className={styles.order}>
            <Image
              src={item.image}
              alt='product'
              width={'160px'}
              height='117px'
              layout='fixed'
            />
            <p className={styles.name}>{item.name}</p>
            <p>QTY: {item.qty}</p>
            <p className={styles.item_price}>NGN {item.price}</p>

            <div className={styles.status}>
              <p
                className={
                  item.status === 'pending' ? styles.pending : styles.success
                }
              >
                {item.status}
              </p>
            </div>

            <div className={styles.order_details}>
              <button>Order details</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;
