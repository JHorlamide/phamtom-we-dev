import React from 'react';

const ShippingServices = ({ couriers, styles, Image,  }: any) => {
  return (
    <div>
      <ul className={styles.couriers}>
        {couriers.map((member: any, index: any) => (
          <li key={index} className={styles.courier}>
            <div className={styles.member}>
              <Image
                src={member.avatar}
                alt='avatar'
                width={'64px'}
                height={'40px'}
                layout='fixed'
              />

              <div>
                <p className={styles.name}>{member.name}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingServices;
