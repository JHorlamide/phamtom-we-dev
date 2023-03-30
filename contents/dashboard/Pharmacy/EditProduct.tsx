import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { Modal } from 'react-bootstrap';
import { Button, Input, UploadImage } from '../../../components/dashboard';
import { fileUploadService, productService } from '../../../services/restService';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { setSelectedProduct } from '../../../redux/actions/pharmacy';
// import { useRouter } from 'next/router';

interface IAddNewPatientProps {
  showEditProductModal: boolean;
  setShowAllProducts: any;
  onHide: () => void;
  styles: any;
  handleGetAllProducts: () => void;
}
const EditProducts = ({
  showEditProductModal,
  setShowAllProducts,
  onHide,
  styles,
  handleGetAllProducts,
  
}: IAddNewPatientProps) => {
  // const {push} = useRouter()
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { selectedProduct } = useSelector((state: any) => state.pharmacyReducer);
  const inputFile: any = useRef(null);
  const [imageUpload, setImageUpload] : any = useState('');
  const [inputField, setInputField] = useState({
    product_name: '',
    product_price: '',
    product_image: '',
    product_strength: '',
    pack_size: '',
    product_quantity: '',
    about_product: '',
    usage_direction: '',
    precautions: '',
    possible_side_effect: ''
  });

  const dispatch = useDispatch();
// console.log(inputField)
  const onButtonClick = () => {
    inputFile.current.click();
  };

  const onInputChange = (e: any) => {
    setInputField({ ...inputField, [e.target.name]: e.target.value });
  };

  const handleFileUpload = async(e: any) => {
    let value = new FormData();
    let fileValue = e.target.files[0]
    value.append('file', fileValue);
    
    try{
      await fileUploadService.fileUpload(
        value,
        admin.access_token
        )
        .then((response) => response.data)
        .then((res)=> {
          if(res.status === 'Success'){
            setInputField({
              ...inputField,
              product_image: res?.data?._id
            })
            setImageUpload(fileValue)
          }
        })
    }catch (error) {
      console.log(error);
    } 
  }

  const handleAddProduct = async (e: any) => {
    e.preventDefault();
console.log(inputField)
    try {
      await productService.updateProduct(
        selectedProduct?.id,
        inputField,
        admin.access_token
      )
      .then((response) => response.data)
      .then(res => {
        console.log(res)
        if(res.status === "Success"){
          toast.success(res.message)
          dispatch(setSelectedProduct(res.data))
          setShowAllProducts(true)
        }
      })
      handleGetAllProducts();
    } catch (error) {
      console.log(error);
    } finally {
      // setInputField({
      //   product_name: '',
      //   product_price: '',
      //   product_image: '',
      //   product_strength: '',
      //   pack_size: '',
      //   product_quantity: '',
      //   about_product: '',
      //   usage_direction: '',
      //   precautions: '',
      //   possible_side_effect: '',
      // });
      setImageUpload("")
      onHide();
    }
  };

  useEffect(() => {
    setInputField({
      product_name: selectedProduct?.product_name ? selectedProduct?.product_name : '',
        product_price: selectedProduct?.product_price ? selectedProduct?.product_price : '',
        product_image: selectedProduct?.product_image ? selectedProduct?.product_image : '',
        product_strength: selectedProduct?.product_strength ? selectedProduct?.product_strength : '',
        pack_size: selectedProduct?.pack_size ? selectedProduct?.pack_size : '',
        product_quantity: selectedProduct?.product_quantity ? selectedProduct?.product_quantity : '',
        about_product: selectedProduct?.about_product ? selectedProduct?.about_product : '',
        usage_direction: selectedProduct?.usage_direction ? selectedProduct?.usage_direction : '',
        precautions: selectedProduct?.precautions ? selectedProduct?.precautions : '',
        possible_side_effect: selectedProduct?.possible_side_effect ? selectedProduct?.possible_side_effect : '',
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedProduct])
  
  return (
    <div className={styles.modal_container}>
      <Modal
        id={styles.modal_container}
        centered
        show={showEditProductModal}
        onHide={onHide}
      >
        <div className={styles.label_container}>
          <p>Edit product</p>

          <Image
            src={'/assets/dashboard/close_btn_white.svg'}
            width={'14px'}
            height={'14px'}
            onClick={onHide}
          />
        </div>

        <div className={styles.form_container}>
          <div className={styles.img_container}>
            <UploadImage
              objectFit={'contain'}
              imageUrl= { imageUpload !== "" ? URL.createObjectURL(imageUpload) : ""}
              handleUploadFile={onButtonClick}
              height='200px'
              inputEl={
                <input
                  type='file'
                  onChange={handleFileUpload}
                  ref={inputFile}
                />
              }
            />
          </div>

          <form>
            <div>
              <label htmlFor='product_name'>Product name</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='Product name'
                id='product_name'
                name="product_name"
                onChange={onInputChange}
                disabled
                defaultValue={ selectedProduct?.product_name ? selectedProduct?.product_name: inputField.product_name }
              />
            </div>

            <div>
              <label htmlFor='product_price'>Product price</label>
              <Input
                type={'number'}
                min={0}
                styles='input_primary'
                placeholder='20,000.00'
                name='product_price'
                id='product_price'
                onChange={onInputChange}
                defaultValue={ selectedProduct?.product_price ? selectedProduct?.product_price: inputField.product_price }
              />
            </div>

            <div>
              <label htmlFor='product_strength'>Product strength</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='Product strength'
                name='product_strength'
                id='product_strength'
                onChange={onInputChange}
                defaultValue={ selectedProduct?.product_strength ? selectedProduct?.product_strength: inputField.product_strength }
              />
            </div>

            <div>
              <label htmlFor='pack_size'>Pack size</label>
              <Input
                type={'text'}
                styles='input_primary'
                placeholder='6X6'
                name='pack_size'
                id='pack_size'
                onChange={onInputChange}
                defaultValue={ selectedProduct?.pack_size ? selectedProduct?.pack_size: inputField.pack_size }
              />
            </div>

            <div>
              <label htmlFor='product_quantity'>Quantity</label>
              <Input
                type={'number'}
                min={0}
                styles='input_primary'
                placeholder='36'
                id='product_quantity'
                name='product_quantity'
                onChange={onInputChange}
                defaultValue={ selectedProduct?.product_quantity ? selectedProduct?.product_quantity: inputField.product_quantity }
              />
            </div>

            <div className={styles.checkbox_container}>
              <input type={'checkbox'} name='Prescription' id='Prescription' />
              <label htmlFor='Prescription'>Prescription required</label>
            </div>

            <div className={styles.text_area_container}>
              <label htmlFor='about_product'>About</label>
              <textarea
                name='about_product'
                id='about_product'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                onChange={onInputChange}
                defaultValue={ selectedProduct?.about_product ? selectedProduct?.about_product: inputField.about_product }
              />
            </div>

            <div className={styles.text_area_container}>
              <label htmlFor='usage_direction'>Usage direction</label>
              <textarea
                name='usage_direction'
                id='usage_direction'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                onChange={onInputChange}
                defaultValue={ selectedProduct?.usage_direction ? selectedProduct?.usage_direction: inputField.usage_direction }
              />
            </div>
            <div className={styles.text_area_container}>
              <label htmlFor='precautions'>Precaution</label>
              <textarea
                name='precautions'
                id='precautions'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                onChange={onInputChange}
                defaultValue={ selectedProduct?.precautions ? selectedProduct?.precautions: inputField.precautions }
              />
            </div>
            <div className={styles.text_area_container}>
              <label htmlFor='possible_side_effect'>Possible side effect</label>
              <textarea
                name='possible_side_effect'
                id='possible_side_effect'
                placeholder='Lorem ipsum dolor sit amet, consectetur adi'
                onChange={onInputChange}
                defaultValue={ selectedProduct?.possible_side_effect ? selectedProduct?.possible_side_effect: inputField?.possible_side_effect }
              />
            </div>

            <Button
               disabled={[inputField?.product_name || inputField?.product_price || inputField?.product_strength 
              || inputField?.product_quantity || inputField?.pack_size || inputField?.about_product || inputField?.usage_direction
              || inputField?.precautions || inputField?.possible_side_effect].some((x) => x === '')}
              className={'btn_primary'}
              style={{ marginTop: '16px' }}
              onClick={handleAddProduct}
            >
              Save Product
            </Button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default EditProducts;
