import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useDispatch, useSelector } from 'react-redux';
// import { pharmacyService } from '../../../services/restService';
import { Button, DashboardLayout, Input } from '../../../components/dashboard';
import styles from '../../../styles/dashboard/Profile.module.scss';
import { Modal } from 'react-bootstrap';
import { pharmacyService, updatePassword } from '../../../services/restService';
import { setPharmacy } from '../../../redux/actions/pharmacy';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
const Profile = () => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { pharmacy } = useSelector((state: any) => state.pharmacyReducer);
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error] = useState(false);
  const [password, setPassword] = useState({
    currentPassword: '',
    password: '',
    confirmPassword:"",
  });

  const { push } = useRouter();

  const [success, setSuccess] = useState(false);

  const handleChange = (e: any) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };

  const handleShowPassword = () => setShowPassword(!showPassword);
  const handleClose = () => setShowModal(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
       await updatePassword(password, admin.access_token)
        .then((response) => response?.data)
        .then(res => {
          if(res?.status === "Success"){
            setSuccess(true);
          }else{
            toast.error(res?.message)
          }
        })
      } catch (err: any) {
        console.log(err);
    }
  };

  useEffect(() => {
    getPharmacy();
  }, []);

  const getPharmacy = async () => {
    try {
      const {data : {data}} = await pharmacyService.getPharmacy(
        admin._id,
        admin.access_token
      );
      console.log(data)
      dispatch(setPharmacy(data));
    } catch (error) {
      dispatch(setPharmacy([]));
      console.log(error);

    }
  };


  const profile = [
    {
      label: 'NAME OF INSTITUTION',
      value: admin?.name_of_institution
    },
    {
      label: 'PHONE NUMBER',
      value: admin?.phone_number
    },
    {
      label: 'HOSPITAL ADDRESS',
      value: admin?.address
    },
    {
      label: 'LICENSES NUMBER',
      value: admin?.registration_number
    }
  ];

  const pharmacyDetails = [
    {
      label: 'NAME OF PHARMACY',
      value: pharmacy?.name_of_pharmacy
    },
    {
      label: 'EMAIL ADDRESS',
      value: pharmacy?.pharmacy_email
    },
    {
      label: 'PHARMACY ADDRESS',
      value: pharmacy?.pharmacy_physical_address
    }
  ];

  var getInitials = function (data : string) {
    var names = data?.split(' '),
        initials = names?.[0]?.substring(0, 1).toUpperCase();
    
    if (names?.length > 1) {
        initials += names?.[names?.length - 1]?.substring(0, 1).toUpperCase();
    }
    return initials;
};

  return (
    <DashboardLayout>
      <div className={styles.profile_container}>
        <h1>Profile</h1>

        <div className={styles.profile_body_container}>
          <div className={styles.left_items}>
            <div className={styles.profile_image_container}>
              {
                admin?.profile_image ?
                <Image
                  src={admin?.profile_image}
                  width={'64px'}
                  height={'64px'}
                />
                :
                <div className={styles.profile_image_container_initials}>
                  <h2>{getInitials(`${admin?.name_of_institution}`)}</h2>
                </div>
              }
              
              <p className={styles.institution}>{admin.name_of_institution}</p>
              <p className={styles.email}>{admin?.email}</p>
            </div>
            <div>
              <Button
                onClick={() => setShowModal(true)}
                className={styles.change_password}
              >
                <p>Change password</p>
                <Image
                  src='/assets/dashboard/ehr/arrow.svg'
                  width={'12.05px'}
                  height={'15px'}
                />
              </Button>
            </div>
          </div>
          <div className={styles.right_items}>
            <div className={styles.profile_items}>
              {profile.map((item, index) => (
                <div key={index} className={styles.profile_item}>
                  <p className={styles.label}>{item.label}</p>
                  <p className={styles.value}>{item.value}</p>

                  <hr />
                </div>
              ))}
            </div>

            <div className={styles.pharmacy_items}>
              <h4>Your Pharmacy </h4>
              {pharmacyDetails.map((item, index) => (
                <div key={index} className={styles.pharmacy_item}>
                  <p className={styles.label}>{item.label}</p>
                  <p className={styles.value}>{item.value}</p>
                  {item.label !== 'PHARMACY ADDRESS' && <hr />}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal
        id={'change_password_modal'}
        show={showModal}
        onHide={handleClose}
        centered
        backdrop='static'
      >
        {success
          ? (
          <div className='success_container'>
            <Image
              src='/assets/dashboard/success.svg'
              width={'56px'}
              height={'56px'}
            />

            <h4>Password change successful</h4>
            <p>Your password has been changed successfully.</p>
            <Button className='btn_primary w-full' onClick={()=> push('/auth/login')}>
              Login
            </Button>
          </div>
            )
          : (
          <div>
            <div className={'top_items'}>
              <h5 className={'change_password'}>Change password</h5>
              <Image
                src='/assets/dashboard/close_btn.svg'
                width={'14px'}
                height={'14px'}
                onClick={handleClose}
              />
            </div>
            <form>
              <div>
                <label htmlFor='current_password'>Current password</label>
                <Input
                  id='current_password'
                  styles='input_primary'
                  placeholder={'Current password'}
                  type={showPassword ? 'text' : 'password'}
                  error={error}
                  onChange={handleChange}
                  handleImageChange={handleShowPassword}
                  value={password.currentPassword}
                  img='/assets/login/eye.svg'
                  width='22px'
                  height='15px'
                  layout='fixed'
                  name='currentPassword'
                />
              </div>

              <div>
                <label htmlFor='password'>New Password</label>
                <Input
                  id='password'
                  styles='input_primary'
                  placeholder={'Enter your new password'}
                  type={showPassword ? 'text' : 'password'}
                  error={error}
                  onChange={handleChange}
                  value={password.password}
                  handleImageChange={handleShowPassword}
                  img='/assets/login/eye.svg'
                  width='22px'
                  height='15px'
                  layout='fixed'
                  name='password'
                />
              </div>

              <div>
                <label htmlFor='cnew_password'>Confirm new password</label>
                <Input
                  id='cnew_password'
                  name='confirmPassword'
                  styles='input_primary'
                  placeholder={'Confirm new Password'}
                  type={showPassword ? 'text' : 'password'}
                  error={error}
                  onChange={handleChange}
                  handleImageChange={handleShowPassword}
                  value={password.confirmPassword}
                  img='/assets/login/eye.svg'
                  width='22px'
                  height='15px'
                  layout='fixed'
                />
              </div>

              <Button 
                onClick={handleSubmit} 
                className='btn_primary'   
                disabled={
                    password.currentPassword === "" ||
                    password.password === "" ||
                    password.confirmPassword === ""
                }
              >
                Continue
              </Button>
            </form>
          </div>
            )}
      </Modal>
    </DashboardLayout>
  );
};

export default Profile;
