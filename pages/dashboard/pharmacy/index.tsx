/* eslint-disable indent */
import { useState } from "react";
import { NextPage } from "next/types";
import { Badge, Button, DashboardLayout } from "../../../components/dashboard";
import Image from "next/image";
import styles from "../../../styles/dashboard/Pharmacy.module.scss";
import {
  SetUpPharmcy,
  MyOrder,
  MyProducts,
  ShippingServices,
  Chats,
  AddNewCourier,
  AddNewProducts,
  ViewAll
} from "../../../contents/dashboard/Pharmacy";

const Pharmacy: NextPage = () => {
  const [showAddNewProductModal, setShowAddNewProductModal]: any =
    useState(false);
  const [showAddCourier, setShowAddCourier] = useState(false);
  const [showAllProducts, setShowAllProducts] = useState(false);
  const [activePharmacy] = useState(false);
  // const [activePharmacy, setActivePharmacy] = useState(false);

  const handleCloseAddCourier = () => setShowAddCourier(false);

  const handleHideAddNewPatient = () => {
    setShowAddNewProductModal(false);
  };

  const cards = [
    {
      title: "Total patients",
      value: "62"
    },
    {
      title: "Total orders",
      value: "14"
    },
    {
      title: "Active orders",
      value: "14"
    },
    {
      title: "Out of stock",
      value: "14"
    }
  ];

  const Products = [
    {
      name: "Paracetamol",
      price: "620,000.00",
      image: "/assets/dashboard/pharmacy/product.svg"
    },
    {
      name: "Paracetamol",
      price: "620,000.00",
      image: "/assets/dashboard/pharmacy/product.svg"
    },
    {
      name: "Paracetamol",
      price: "620,000.00",
      image: "/assets/dashboard/pharmacy/product.svg"
    },
    {
      name: "Paracetamol",
      price: "140,000.00",
      image: "/assets/dashboard/pharmacy/product.svg"
    },
    {
      name: "Paracetamol",
      price: "140,000.00",
      image: "/assets/dashboard/pharmacy/product.svg"
    },
    {
      name: "Paracetamol",
      price: "140,000.00",
      image: "/assets/dashboard/pharmacy/product.svg"
    }
  ];

  const MyOrders = [
    {
      name: "Paracetamol",
      price: "620,000.00",
      image: "/assets/dashboard/pharmacy/product.svg",
      qty: "1",
      status: "pending"
    },
    {
      name: "Paracetamol",
      price: "620,000.00",
      image: "/assets/dashboard/pharmacy/product.svg",
      qty: "454",
      status: "pending"
    },
    {
      name: "Paracetamol",
      price: "620,000.00",
      image: "/assets/dashboard/pharmacy/product.svg",
      qty: "33",
      status: "pending"
    },
    {
      name: "Paracetamol",
      price: "140,000.00",
      image: "/assets/dashboard/pharmacy/product.svg",
      qty: "21",
      status: "pending"
    },
    {
      name: "Paracetamol",
      price: "140,000.00",
      image: "/assets/dashboard/pharmacy/product.svg",
      qty: "13",
      status: "pending"
    },
    {
      name: "Paracetamol",
      price: "140,000.00",
      image: "/assets/dashboard/pharmacy/product.svg",
      qty: "11",
      status: "pending"
    }
  ];

  const couriers = [
    {
      name: "Jumia Logistics",
      title: "Director",
      avatar: "/assets/dashboard/jumia.svg",
      role: "Admin"
    },
    {
      name: "GIG Logistics",
      title: "Asisting Manager",
      avatar: "/assets/dashboard/jumia.svg",
      role: "Admin"
    }
  ];

  const chats = [
    {
      name: "John Doe",
      message: "Hello, how are you?",
      avatar: "/assets/dashboard/avatar_2.svg",
      time: "12:00",
      totalUnread: 2
    },
    {
      name: "John Doe",
      message: "Hello, how are you?",
      avatar: "/assets/dashboard/avatar_2.svg",
      time: "12:00",
      totalUnread: 2
    },
    {
      name: "John Doe",
      message: "Hello, how are you?",
      avatar: "/assets/dashboard/avatar.svg",
      time: "12:00",
      totalUnread: 2
    }
  ];

  return (
    <DashboardLayout>
      {activePharmacy && (
        <>
          {showAllProducts && (
            <div className={styles.pharmacy_items_container}>
              <div id={styles.left_items}>
                <ul className={styles.cards_container}>
                  {cards.map((card: any, index: any) => (
                    <li
                      key={index}
                      className={styles.card}
                      style={{
                        background:
                          card.title === "Active orders"
                            ? " #03C57F"
                            : card.title === "Out of stock"
                            // eslint-disable-next-line operator-linebreak
                            ? // eslint-disable-next-line indent
                              "#F29C4C"
                            : "#0055D2"
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
                        setShowAllProducts(true);
                      }}
                    >
                      <p>View all</p>
                      <Image
                        src='/assets/dashboard/ehr/arrow.svg'
                        alt='arrow'
                        width={"12.05px"}
                        height={"15px"}
                      />
                    </div>
                  </div>

                  <MyProducts
                    Products={Products}
                    styles={styles}
                    Image={Image}
                  />
                </div>

                {/* quick actions */}
                <div className={styles.quick_actions}>
                  <div className={styles.quick_actions_btns}>
                    <Button
                      onClick={() => setShowAddNewProductModal(true)}
                      className='btn_primary w-full text-sm'
                    >
                      <Image
                        src='/assets/dashboard/plus.svg'
                        width='14'
                        height='15'
                      />
                      <p>Add new product</p>
                    </Button>
                  </div>
                </div>

                {/* My orders */}
                <div className={styles.all_products_container}>
                  <div className={styles.recent_p}>
                    <h5>My orders</h5>

                    <div onClick={() => {}}>
                      <p>View all</p>
                      <Image
                        src='/assets/dashboard/ehr/arrow.svg'
                        alt='arrow'
                        width={"12.05px"}
                        height={"15px"}
                      />
                    </div>
                  </div>

                  <MyOrder Orders={MyOrders} styles={styles} Image={Image} />
                </div>
              </div>

              <div id={styles.right_items}>
                <div className={styles.medic}>
                  <Image
                    src='/assets/dashboard/ehr/medic.svg'
                    alt='medic'
                    width={"120px"}
                    height={"194px"}
                    layout='fixed'
                  />

                  <div className={styles.medic_text}>
                    <p>
                      View my <br /> Profile
                    </p>

                    <div>
                      <Image
                        src='/assets/dashboard/ehr/arrow.svg'
                        alt='medic'
                        width={"12.05px"}
                        height={"15px"}
                      />
                    </div>
                  </div>
                </div>

                {/* staffs */}
                <div className={styles.couriers_container}>
                  <div className={styles.couriers_flex}>
                    <h5>Shipping services</h5>

                    <div onClick={() => {}}>
                      <p>View all</p>
                      <Image
                        src='/assets/dashboard/ehr/arrow.svg'
                        alt='arrow'
                        width={"12.05px"}
                        height={"15px"}
                      />
                    </div>
                  </div>

                  <ShippingServices
                    couriers={couriers}
                    Image={Image}
                    styles={styles}
                  />

                  <Button
                    onClick={() => setShowAddCourier(true)}
                    className='secondary_2 w-full'
                    style={{ marginTop: "8px" }}
                  >
                    Add new shipping service
                  </Button>
                </div>

                {/* chats */}
                <div className={styles.chats_container}>
                  <div className={styles.chats_actions}>
                    <div>
                      <h5>Chats</h5>

                      <Badge color={"badge_primary"} content={5} />
                    </div>
                    <div onClick={() => {}}>
                      <p className={styles.go_to_chats}>Go to chats</p>
                      <Image
                        src='/assets/dashboard/ehr/arrow.svg'
                        alt='arrow'
                        width={"12.05px"}
                        height={"15px"}
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
                </div>
              </div>
            </div>
          )}

          {showAllProducts && (
            <ViewAll
              styles={styles}
              setShowAddNewProductModal={setShowAddNewProductModal}
            />
          )}

          <AddNewProducts
            styles={styles}
            showAddNewPatientModal={showAddNewProductModal}
            onHide={handleHideAddNewPatient}
          />

          <AddNewCourier
            styles={styles}
            handleCloseAddCourier={handleCloseAddCourier}
            showAddCourier={showAddCourier}
            Image={Image}
          />
        </>
      )}

      {!activePharmacy && <SetUpPharmcy styles={styles} />}
    </DashboardLayout>
  );
};

export default Pharmacy;
