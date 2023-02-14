import { useState } from 'react';
import ViewProducts from './ViewProducts';
import ViewOrders from './ViewOrders';
import { useSelector } from 'react-redux';

const ViewAll = ({ styles, setShowAddNewProductModal }: any) => {
  const [activeTab, setActiveTab] = useState('PRODUCTS');
  const { products, orders } = useSelector((state: any) => state.pharmacyReducer);
  const tabs = [
    {
      name: 'PRODUCTS',
      totalItems: products?.length
    },
    {
      name: 'ORDERS',
      totalItems: orders?.length
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
          styles={styles}
        />
      )}
    </div>
  );
};

export default ViewAll;
