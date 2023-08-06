import React from 'react';
import ArrowIcon from "../../../public/assets/dashboard/attach.svg";

const ShippingServices = ({ logistics, styles, Image, }: any) => {

  return (
    <div>
      <ul className={styles.couriers}>
        {logistics.map((member: any, index: any) => (
          <li key={index} className={styles.courier}>
            <div className={styles.member}>
              <Image
                src={member.logistics_image?.imageUrl === undefined ? ArrowIcon : member?.logistics_image?.imageUrl}
                alt='avatar'
                width={'64px'}
                height={'40px'}
                layout='fixed'
              />

              <div>
                <p className={styles.name}>{member?.logistics_name}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ShippingServices;
