import { useState } from 'react';
import ViewProducts from './ViewProducts';
import ViewOrders from './ViewOrders';

const ViewAll = ({ styles, setShowAddNewProductModal }: any) => {
  const [activeTab, setActiveTab] = useState('PRODUCTS');

  const tabs = [
    {
      name: 'PRODUCTS',
      totalItems: 10
    },
    {
      name: 'ORDERS',
      totalItems: 10
    }
  ];

  return (
    <div className={styles.view_all_products_container}>
      {/* tabs */}
      <div className={styles.tabs_container}>
        <div className={styles.tabs__}>
          {tabs.map((item: any, index: any) => (
            <div
              key={index}
              className={
                item.name.includes(activeTab) ? styles.activeTab : styles.tab
              }
              onClick={() => setActiveTab(item.name)}
            >
              <p>
                {' '}
                {item.name} ({item.totalItems})
              </p>
            </div>
          ))}
        </div>
      </div>

      {activeTab === 'PRODUCTS' && (
        <ViewProducts
          setShowAddNewProductModal={setShowAddNewProductModal}
          styles={styles}
        />
      )}
      {activeTab === 'ORDERS' && (
        <ViewOrders
          setShowAddNewProductModal={setShowAddNewProductModal}
          styles={styles}
        />
      )}
    </div>
  );
};

export default ViewAll;
