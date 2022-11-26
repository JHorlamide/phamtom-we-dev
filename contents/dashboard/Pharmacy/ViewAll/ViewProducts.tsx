import Image from 'next/image';
import { Button } from '../../../../components/dashboard';

const ViewProducts = ({ styles, setShowAddNewProductModal }: any) => {
  const productDetails = [
    {
      label: 'Product name',
      value: 'Paracetamol'
    },
    {
      label: 'Product price:',
      value: 'NGN 23,334,33'
    },
    {
      label: 'Product code:',
      value: 'EQUATE234'
    },
    {
      label: 'Product strength:',
      value: '50mg'
    },
    {
      label: 'Pack size:',
      value: '6 X 6'
    },
    {
      label: 'Quantity:',
      value: '36'
    }
  ];

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
          <li className={styles.product}>
            <Image
              src={'/assets/dashboard/pharmacy/product.svg'}
              alt='product'
              width={'160px'}
              height='117px'
              layout='fixed'
            />
            <p className={styles.name}>Paracetamol</p>
            <p className={styles.item_price}>NGN 10000</p>
          </li>

          <li className={styles.product}>
            <Image
              src={'/assets/dashboard/pharmacy/product.svg'}
              alt='product'
              width={'160px'}
              height='117px'
              layout='fixed'
            />
            <p className={styles.name}>Paracetamol</p>
            <p className={styles.item_price}>NGN 10000</p>
          </li>
          <li className={styles.product}>
            <Image
              src={'/assets/dashboard/pharmacy/product.svg'}
              alt='product'
              width={'160px'}
              height='117px'
              layout='fixed'
            />
            <p className={styles.name}>Paracetamol</p>
            <p className={styles.item_price}>NGN 10000</p>
          </li>
        </ul>
      </div>

      {/* product details */}
      <div className={styles.right_items}>
        <div className={styles.top_items}>
          <h4>Product Details </h4>

          <div className={styles.edit}>
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
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula
              sem turpis dapibus eleifend tempor cras diam tellus. Fusce ante
              elit interdum pellentesque. Nibh hac gravida placerat{' '}
            </p>
          </div>
          <div>
            <p className={styles.label}>Usage direction</p>
            <p className={styles.value}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula
              sem turpis dapibus eleifend tempor cras diam tellus. Fusce ante
              elit interdum pellentesque. Nibh hac gravida placerat{' '}
            </p>
          </div>
          <div>
            <p className={styles.label}>Precaution</p>
            <p className={styles.value}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula
              sem turpis dapibus eleifend tempor cras diam tellus. Fusce ante
              elit interdum pellentesque. Nibh hac gravida placerat{' '}
            </p>
          </div>
          <div>
            <p className={styles.label}>Possible side effects</p>
            <p className={styles.value}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vehicula
              sem turpis dapibus eleifend tempor cras diam tellus. Fusce ante
              elit interdum pellentesque. Nibh hac gravida placerat{' '}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewProducts;
