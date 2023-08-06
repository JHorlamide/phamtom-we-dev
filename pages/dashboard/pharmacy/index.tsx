/* eslint-disable indent */
import { useEffect, useState } from 'react';
import { NextPage } from 'next/types';
import { Button, DashboardLayout } from '../../../components/dashboard';
import Image from 'next/image';
import styles from '../../../styles/dashboard/Pharmacy.module.scss';
import {
  SetUpPharmcy,
  MyOrder,
  MyProducts,
  ShippingServices,
  // Chats,
  AddNewCourier,
  AddNewProducts,
  ViewAll
} from '../../../contents/dashboard/Pharmacy';
import { orderService, patientsService, pharmacyService, productService, shippingService } from '../../../services/restService';
import { useDispatch, useSelector } from 'react-redux';
import { setLogistics, setOrders, setPharmacy, setPharmacyState, setProduct } from '../../../redux/actions/pharmacy';
import { useRouter } from 'next/router';
import NewProduct from "../../../public/assets/dashboard/pharmacy/newProduct.svg";
import PlusIcon from "../../../public/assets/dashboard/plus.svg";
import ArrowIcon from "../../../public/assets/dashboard/ehr/arrow.svg";
import MedicIcon from "../../../public/assets/dashboard/ehr/medic.svg";

const Pharmacy: NextPage = () => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { pharmacy, products, orders, logistics } = useSelector((state: any) => state.pharmacyReducer);
  // const { patients } = useSelector((state: any) => state.patientsReducer);
  const dispatch = useDispatch();
  const [showAddNewProductModal, setShowAddNewProductModal]: any =
    useState(false);
  const [showAddCourier, setShowAddCourier] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [totalPatients, setTotalPatients] = useState(0);
  const [activeOrders, setActiveOrders] = useState("");
  const [productsOutOfStocks, setProductsOutOfStocks] = useState("");

  const handleCloseAddCourier = () => setShowAddCourier(false);
  const { push } = useRouter();

  const handleHideAddNewPatient = () => {
    setShowAddNewProductModal(false);
  };

  const handleHideAddCourier = () => {
    setShowAddNewProductModal(false);
  };

  const handleGetAllProducts = async () => {
    try {
      await productService.getAllProduct(admin.access_token)
        .then((response) => response.data)
        .then((res) => {
          if (res.status === "Success") {
            dispatch(setProduct(res.data.reverse()));
          }
        })

    } catch (error) {
      console.log(error);
    }
  };

  const handleGetAllLogistics = async () => {
    try {
      await shippingService.getAllLogistics(admin.access_token)
        .then((response) => response.data)
        .then((res) => {
          if (res.status === "Success") {
            dispatch(setLogistics(res.data.reverse()));
          }
        })

    } catch (error) {
      console.log(error);
    }
  };

  const getPharmacy = async () => {
    try {
      const { data: { data } } = await pharmacyService.getPharmacy(
        admin._id,
        admin.access_token
      );
      dispatch(setPharmacy(data));
    } catch (error) {
      dispatch(setPharmacy([]));
      console.log(error);
    }
  };

  useEffect(() => {
    getPharmacy();
    getTotalPatients();
    getAllPendingOrders()
    getActiveOrders()
    handleGetAllProducts();
    handleGetAllLogistics();
  }, []);

  const getTotalPatients = async () => {
    try {
      const {
        data: {
          data
        }
      } = await patientsService.getTotalPatients(admin.access_token);
      setTotalPatients(data);
    } catch (e) {
      console.log(e);
    }
  };

  const getAllPendingOrders = async () => {
    try {
      await orderService.getAllPendingOrders(admin.access_token)
        .then((response) => response.data)
        .then((res) => {
          if (res.status === "Success") {
            dispatch(setOrders(res.data.reverse()));
          }
        })
    } catch (e) {
      console.log(e);
    }
  };

  const getActiveOrders = async () => {
    try {
      await orderService.getActiveOrders(admin.access_token)
        .then((response) => response.data)
        .then((res) => {
          console.log(res)
          if (res.status === "Success") {
            setActiveOrders(res?.data?.activeOrders)
            setProductsOutOfStocks(res?.data?.productsOutOfStocks)
          }
        })
    } catch (e) {
      console.log(e);
    }
  };

  const cards = [
    {
      title: 'Total patients',
      value: totalPatients
    },
    {
      title: 'Total orders',
      value: orders?.length
    },
    {
      title: 'Active orders',
      value: activeOrders
    },
    {
      title: 'Out of stock',
      value: productsOutOfStocks
    }
  ];

  const headingStyle = {
    fontWeight: "600",
    fontSize: "20px",
    lineHeight: "116%",
    letterSpacing: "-0.045em",
    color: "#123a77",
    marginBottom: "12px"
  }

  return (
    <DashboardLayout>
      <p style={headingStyle}>{admin.name_of_institution}</p>

      {/* change to accepted status */}
      {pharmacy?.account_status === "APPROVED" && (
        <>
          {/* {showAllProducts && ( */}
          <div className={styles.pharmacy_items_container}>
            <div id={styles.left_items}>
              <ul className={styles.cards_container}>
                {cards.map((card: any, index: any) => (
                  <li
                    key={index}
                    className={styles.card}
                    style={{
                      background:
                        card.title === 'Active orders'
                          ? ' #03C57F'
                          : card.title === 'Out of stock'
                            // eslint-disable-next-line operator-linebreak
                            ? // eslint-disable-next-line indent
                            '#F29C4C'
                            : '#0055D2'
                    }}
                  >
                    <p className={styles.title}>{card.title}</p>
                    <h2>{card.value}</h2>
                  </li>
                ))}
              </ul>

              {/* Products */}
              <div className={styles.all_products_container}>
                <div className={styles.recent_p}>
                  <h5>Products</h5>
                  <div
                    onClick={() => {
                      dispatch(setPharmacyState('PRODUCTS'))
                      push('/dashboard/pharmacy/products')
                    }}
                  >
                    <p>View all</p>
                    <Image
                      src={ArrowIcon}
                      // src='/assets/dashboard/ehr/arrow.svg'
                      alt='arrow'
                      width={'12.05px'}
                      height={'15px'}
                    />
                  </div>
                </div>
                {
                  products.length > 0 ?
                    <MyProducts
                      Products={products}
                      styles={styles}
                      Image={Image}
                    />
                    :
                    <div className={styles.noProduct}>
                      <Image
                        src={NewProduct}
                        // src='/assets/dashboard/pharmacy/newProduct.svg'
                        alt='arrow'
                        width={'56px'}
                        height={'56px'}
                      />
                      <p>
                        You have no saved products. <br />
                        Add a new product to your catalogue
                      </p>
                    </div>
                }
              </div>



              {/* quick actions */}
              <div className={styles.quick_actions}>
                <div className={styles.quick_actions_btns}>
                  <Button
                    onClick={() => setShowAddNewProductModal(true)}
                    className='btn_primary w-full text-sm'
                  >
                    <Image
                      src={PlusIcon}
                      // src='/assets/dashboard/plus.svg'
                      width='14'
                      height='15'
                    />
                    <p>Add new product</p>
                  </Button>
                </div>
              </div>

              {/* My orders */}
              <div className={styles.all_products_container}>
                <div className={styles.recent_p} >
                  <h5>My Orders</h5>

                  <div
                    onClick={() => {
                      dispatch(setPharmacyState('ORDERS'))
                      push('/dashboard/pharmacy/products')
                    }}
                  >
                    <p>View all</p>
                    <Image
                      src={ArrowIcon}
                      // src='/assets/dashboard/ehr/arrow.svg'
                      alt='arrow'
                      width={'12.05px'}
                      height={'15px'}
                    />
                  </div>
                </div>

                {
                  orders?.length > 0 ?
                    <MyOrder
                      Orders={orders}
                      styles={styles}
                      Image={Image}
                    />
                    :
                    <div className={styles.noProduct}>
                      <Image
                        src={NewProduct}
                        // src='/assets/dashboard/pharmacy/newProduct.svg'
                        alt='arrow'
                        width={'56px'}
                        height={'56px'}
                      />
                      <p>
                        You have no order.
                      </p>
                    </div>
                }


              </div>
            </div>

            <div id={styles.right_items}>
              <div className={styles.medic} onClick={() => push('/dashboard/profile')}>
                <Image
                  src={MedicIcon}
                  // src='/assets/dashboard/ehr/medic.svg'
                  alt='medic'
                  width={'120px'}
                  height={'194px'}
                  layout='fixed'
                />

                <div className={styles.medic_text}>
                  <p >
                    View my <br /> Profile
                  </p>

                  <div>
                    <Image
                      src={ArrowIcon}
                      // src='/assets/dashboard/ehr/arrow.svg'
                      alt='medic'
                      width={'12.05px'}
                      height={'15px'}
                    />
                  </div>
                </div>
              </div>

              {/* shipping */}
              <div className={styles.couriers_container}>
                <div className={styles.couriers_flex}>
                  <h5>Shipping services</h5>

                  {/* <div onClick={() => {}}>
                      <p>View all</p>
                      <Image
                        src='/assets/dashboard/ehr/arrow.svg'
                        alt='arrow'
                        width={'12.05px'}
                        height={'15px'}
                      />
                    </div> */}
                </div>

                <ShippingServices
                  logistics={logistics}
                  Image={Image}
                  styles={styles}
                />

                <Button
                  onClick={() => setShowAddCourier(true)}
                  className='secondary_2 w-full'
                  style={{ marginTop: '8px' }}
                >
                  Add new shipping service
                </Button>
              </div>

              {/* chats */}
              {/* <div className={styles.chats_container}>
                  <div className={styles.chats_actions}>
                    <div>
                      <h5>Chats</h5>

                      <Badge color={'badge_primary'} content={5} />
                    </div>
                    <div onClick={() => {}}>
                      <p className={styles.go_to_chats}>Go to chats</p>
                      <Image
                        src='/assets/dashboard/ehr/arrow.svg'
                        alt='arrow'
                        width={'12.05px'}
                        height={'15px'}
                      />
                    </div>
                  </div>

                  <div>
                    <Chats
                      Badge={Badge}
                      chats={chats}
                      styles={styles}
                      Image={Image}
                    />
                  </div>
                </div> */}
            </div>
          </div>
          {/* )} */}

          {showAllProducts && (
            <ViewAll
              styles={styles}
              setShowAddNewProductModal={setShowAddNewProductModal}
            />
          )}

          <AddNewProducts
            styles={styles}
            showAddNewProductModal={showAddNewProductModal}
            setShowAllProducts={setShowAllProducts}
            onHide={handleHideAddNewPatient}
            handleGetAllProducts={handleGetAllProducts}
          />

          <AddNewCourier
            styles={styles}
            handleCloseAddCourier={handleCloseAddCourier}
            showAddCourier={showAddCourier}
            Image={Image}
            onHide={handleHideAddCourier}
            handleGetAllLogistics={handleGetAllLogistics}
          />
        </>
      )}

      {(pharmacy?.account_status === "PENDING" || pharmacy?.account_status === "REJECTED" || pharmacy.length === 0) && <SetUpPharmcy styles={styles} />}
    </DashboardLayout>
  );
};

export default Pharmacy;
