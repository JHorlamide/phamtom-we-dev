import { useEffect, useState } from 'react';
import { NextPage } from 'next/types';
import styles from '../../../../styles/dashboard/Pharmacy.module.scss';
import ViewProducts from '../../../../contents/dashboard/Pharmacy/ViewAll/ViewProducts';
import ViewOrders from '../../../../contents/dashboard/Pharmacy/ViewAll/ViewOrders';
import { DashboardLayout } from '../../../../components/dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { AddNewProducts, EditProducts } from '../../../../contents/dashboard/Pharmacy';
import { productService } from '../../../../services/restService';
import { setPharmacyState, setProduct } from '../../../../redux/actions/pharmacy';

const Products: NextPage = () => {
  const [activeTab, setActiveTab] = useState('PRODUCTS');
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { products, orders, pharmacyState, } = useSelector((state: any) => state.pharmacyReducer);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [showAddNewProductModal, setShowAddNewProductModal]: any =
  useState(false);
  const handleHideAddNewPatient = () => {
    setShowAddNewProductModal(false);
  };
  const [showEditProductModal, setShowEditProductModal]: any =
  useState(false);
  const handleHideEditPatient = () => {
    setShowEditProductModal(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    handleGetAllProducts();
    if(pharmacyState){
      setActiveTab(pharmacyState)
    }
  }, []);
console.log(pharmacyState)
  const handleGetAllProducts = async () => {
    try {
      await productService.getAllProduct(admin.access_token)
      .then((response) => response.data)
      .then((res)=> {
        if(res.status === "Success"){
          dispatch(setProduct(res.data.reverse()));
        }
      })
      
    } catch (error) {
      console.log(error);
    }
  };
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
    <DashboardLayout>
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
                onClick={() => {
                  setActiveTab(item.name);
                  dispatch(setPharmacyState(item.name))
                }}
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
            setShowEditProductModal={setShowEditProductModal}
            styles={styles}
            />
        )}
        {activeTab === 'ORDERS' && (
            <ViewOrders
            setShowAddNewProductModal={setShowAddNewProductModal}
            styles={styles}
            />
        )}

          <AddNewProducts
            styles={styles}
            showAddNewProductModal={showAddNewProductModal}
            setShowAllProducts={setShowAllProducts}
            onHide={handleHideAddNewPatient}
            handleGetAllProducts={handleGetAllProducts}
          />

          <EditProducts
            styles={styles}
            showEditProductModal={showEditProductModal}
            setShowAllProducts={setShowAllProducts}
            onHide={handleHideEditPatient}
            handleGetAllProducts={handleGetAllProducts}
          />
        </div>
    </DashboardLayout>
  );
};

export default Products;
