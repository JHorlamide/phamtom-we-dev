import Image from 'next/image';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from '../../../../components/dashboard';
import Index from '../../../../pages/dashboard';
import { setSelectedProduct } from '../../../../redux/actions/pharmacy';

const ViewProducts = ({ styles, setShowAddNewProductModal, setShowEditProductModal }: any) => {
  const { products, selectedProduct } = useSelector((state: any) => state.pharmacyReducer);
  const [activeIndex, setActiveIndex]: any = useState(0);
  const dispatch = useDispatch();

  var formatMoney = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    //minimumFractionDigits: 0, 
    maximumFractionDigits: 2, 
  });
  
  const productDetails = [
    {
      label: 'Product name',
      value: selectedProduct?.product_name
    },
    {
      label: 'Product price:',
      value: selectedProduct?.product_price
    },
    {
      label: 'Product code:',
      value: selectedProduct?.product_id
    },
    {
      label: 'Product strength:',
      value: selectedProduct?.product_strength
    },
    {
      label: 'Pack size:',
      value: selectedProduct?.pack_size
    },
    {
      label: 'Quantity:',
      value: selectedProduct?.product_quantity
    }
  ];

  useEffect(() => {
    if(selectedProduct){
     if(products?.indexOf(selectedProduct) === -1){
      dispatch(setSelectedProduct(products[0]));
      setActiveIndex(0)
     }else{
      dispatch(setSelectedProduct(selectedProduct))
      setActiveIndex(products?.indexOf(selectedProduct))
     }
      
    }else{
      dispatch(setSelectedProduct(products[0]));
    }
  }, []);

  useEffect(() => {
    if(activeIndex < 0){
      setActiveIndex(0)
    }
  }, []);

  return (
    <div className={styles.items_container}>
      <div className={styles.left_items}>
        <div className={styles.add_prod}>
          <Button
            onClick={() => setShowAddNewProductModal(true)}
            className='btn_primary w-full text-sm'
          >
            <Image src='/assets/dashboard/plus.svg' width='14' height='15' />
            <p>Add new product</p>
          </Button>
        </div>

        {/* product */}
        <ul className={styles.all_products_}>
          {
            products?.map((product: any, index: any) => (
              <li 
                className={activeIndex === index ? styles.productActive : styles.product}
                key={index}
                onClick={() => {
                  setActiveIndex(index)
                  // handleOpenMedicalInfo();
                  dispatch(setSelectedProduct(product));
                }}
              >
                <Image
                  src={'/assets/dashboard/pharmacy/product.svg'}
                  alt='product'
                  width={'160px'}
                  height='117px'
                  layout='fixed'
                />
                <p className={styles.name}>{product?.product_name}</p>
                <p className={styles.item_price}>{formatMoney.format(product?.product_price)}</p>
              </li>
              ))
          }
        </ul>
      </div>

      {/* product details */}
      <div className={styles.right_items}>
        <div className={styles.top_items}>
          <h4>Product Details </h4>

          <div className={styles.edit}  onClick={() => setShowEditProductModal(true)}>
            <p>Edit</p>

            <Image
              src={'/assets/dashboard/edit.svg'}
              width={'18px'}
              height='18px'
              layout='fixed'
            />
          </div>
        </div>

        <div className={styles.product_image}>
          <Image
            src={'/assets/dashboard/pharmacy/product.svg'}
            alt='product'
            width={'335px'}
            height='228px'
            layout='fixed'
          />
        </div>

        {/* details */}

        <div className={styles.details_container}>
          {productDetails.map((detail: any, index: any) => (
            <div key={index} className={styles.detail}>
              <p className={styles.label}>{detail.label}</p>
              <p className={styles.value}>{detail.value}</p>
            </div>
          ))}

          <div>
            <p className={styles.label}>Requirements</p>
            <p className={styles.req_}>This product requires a prescription</p>
          </div>

          <div>
            <p className={styles.label}>About</p>
            <p className={styles.value}>
              {selectedProduct?.about_product}{' '}
            </p>
          </div>
          <div>
            <p className={styles.label}>Usage direction</p>
            <p className={styles.value}>
              {selectedProduct?.usage_direction}{' '}
            </p>
          </div>
          <div>
            <p className={styles.label}>Precaution</p>
            <p className={styles.value}>
              {selectedProduct?.precautions}{' '}
            </p>
          </div>
          <div>
            <p className={styles.label}>Possible side effects</p>
            <p className={styles.value}>
              {selectedProduct?.possible_side_effect}{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
