import { useState, useEffect } from 'react';
import { NextPage } from 'next';
import { useSelector, useDispatch } from 'react-redux';
import { staffService } from '../../../services/restService';
import {
  DashboardLayout,
  Input,
  Button,
  useScreenSize
} from '../../../components/dashboard';
import Image from 'next/image';
import styles from '../../../styles/dashboard/Patients.module.scss';
import {
  // MedicalData,
  PersonalData,
  AddNewStaff
} from '../../../contents/dashboard/Staffs';
import { setStaffs, setSelectedStaff } from '../../../redux/actions/staffs';

const Staffs: NextPage = () => {
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { staffs, selectedStaff } = useSelector(
    (state: any) => state.staffReducer
  );
  const dispatch = useDispatch();

  const screenSize = useScreenSize();
  const [currentTab, setCurrentTab]: any = useState('PERSONAL');
  const [activeIndex, setActiveIndex]: any = useState(0);
  const [searchTerm, setSearchTerm]: any = useState('');
  const [showAddNewStaffModal, setShowAddNewStaffModal]: any = useState(false);

  const handleHideAddNewStaff = () => {
    setShowAddNewStaffModal(false);
  };

  const handleChangeTab = (tab: any) => {
    setCurrentTab(tab);
  };

  // useEffect(() => {
  //   handleGetAllStaffs();
  // }, []);

  useEffect(() => {
    staffService.getAllStaffs(admin.access_token)
      .then(response => response.data)
      .then((res) => {
        console.log(res)
        if(res.status === "Success"){
          dispatch(setStaffs(res.data.reverse()));
        }
      })
      .catch((err) => {
        console.log(err);
    });
  }, []);

  // const handleGetAllStaffs = async () => {
  //   try {
  //     await staffService.getAllStaffs(admin.access_token)
  //     .then(response => response.data)
  //     .then((res) => {
  //       console.log(res)
  //       if(res.status === "Success"){
  //         dispatch(setStaffs(res.data.reverse()));
  //       }
  //     })
     
      
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleOpenMedicalInfo = () => { 
    const slider = document.getElementById('CHATS_SLIDER') as HTMLElement;
    slider.classList.add('slide_right');
  };

  const handleCloseChat = () => {
    const slider = document.getElementById('CHATS_SLIDER') as HTMLElement;
    slider.classList.remove('slide_right');
  };

  useEffect(() => {
    dispatch(setSelectedStaff(staffs[0]));
  }, []);

  const handleSearch = (e: any) => {
    setSearchTerm(e.target.value);
  };

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
      <div className={styles.patients_container}>
        <div className={styles.patients}>
          <h1>Staffs</h1>

          <div>
            <div className={styles.patients_cont}>
              <Input
                styles='input_secondary'
                placeholder='Search here'
                img='/assets/dashboard/search.svg'
                width='24px'
                height='24px'
                type={'text'}
                onChange={handleSearch}
              />

              <Button
                onClick={setShowAddNewStaffModal}
                className={`${styles.add_patient} btn_primary`}
              >
                <Image
                  src={'/assets/dashboard/plus.svg'}
                  height={'14px'}
                  width={'14px'}
                />
                <p>Add new staff</p>
              </Button>
              <div>
                <ul className={styles.all_patients_container}>
                  {staffs
                  .filter((item: any) => {
                      if (searchTerm !== '') {
                        return (
                          item.first_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase()) ||
                          item.last_name
                            .toLowerCase()
                            .includes(searchTerm.toLowerCase())
                        );
                      } else {
                        return item;
                      }
                    })
                    .map((staff: any, index: any) => (
                      
                      <li
                        key={index}
                        onClick={() => {
                          setActiveIndex(index)
                          handleOpenMedicalInfo();
                          dispatch(setSelectedStaff(staff));
                        }}
                      >
                        <div className={activeIndex === index ? styles.activePatient_list : styles.patient_list}>
                          <div className={styles.patient_info}>
                          {  
                          selectedStaff?.profileImage ?
                          <Image
                              src={'/assets/dashboard/avatar.svg'}
                              alt='avatar'
                              width={'40'}
                              height={'40'}
                              layout='fixed'
                            />
                            : (
                              <div className={styles.patient_info_initials}>
                                  <h2>{getInitials(`${staff.first_name} ${staff.last_name}`)}</h2>
                              </div>
                            ) 

                            }

                            <div>
                              <p className={styles.patient_name}>
                                {staff?.first_name}{' '}
                                {staff?.last_name}
                              </p>
                              <p className={styles.email}>
                                {staff?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        <hr />
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.patient_details_container}>
          <div
            id={'CHATS_SLIDER'}
            className={`${styles.patient_details} ${
              screenSize.width > 700 &&
              selectedStaff !== undefined && Object?.keys(selectedStaff)?.length > 1 &&
              'slide_right'
            }`}
          >
              <div className={styles.patient_details_header}>
                <div className={styles.patient_details_header_top}>
                  <div className={styles.patient_details_header_top_avatar}>
                    {screenSize.width < 700 && (
                      <Image
                        src='/assets/dashboard/arrow_left.svg'
                        alt='avatar'
                        width={'18px'}
                        height={'12px'}
                        onClick={handleCloseChat}
                      />
                    )}

                    {/* user avatar */}
                    {
                      selectedStaff?.profileImage ?
                      <Image
                      src={'/assets/dashboard/avatar.svg'}
                      alt='avatar'
                      width={'64px'}
                      height={'64px'}
                    />
                    : (
                      <div className={styles.patient_details_header_top_avatar_initials}>
                          <h2>{getInitials(`${selectedStaff?.first_name} ${selectedStaff?.last_name}`)}</h2>
                      </div>
                    ) 
                    }  
                  </div>

                  <div className={styles.patient_details_header_top_details}>
                      <h3>{`${selectedStaff?.first_name} ${selectedStaff?.last_name}`} </h3>
                      <p>{`${selectedStaff?.role}`}</p>
                  </div>
                </div>

                <div className={styles.tabs}>
                  {['PERSONAL'].map((tab: any, index: any) => (
                    <div
                      key={index}
                      className={
                        currentTab === tab ? styles.active_tab : styles.tab
                      }
                      onClick={() => handleChangeTab(tab)}
                    >
                      {tab}
                    </div>
                  ))}
                </div>
              </div>
            

            {/* patients details */}
            {currentTab === 'PERSONAL' && <PersonalData styles={styles} />}
            {/* {currentTab === 'MEDICAL' && (
              <>
                <MedicalData styles={styles} />
              </>
            )} */}
          </div>
        </div>
      </div>

      {/* add new staff */}
      <AddNewStaff
        styles={styles}
        showAddNewStaffModal={showAddNewStaffModal}
        onHide={handleHideAddNewStaff}
        admin={admin}
        // handleGetAllStaffs={handleGetAllStaffs}
      />
    </DashboardLayout>
  );
};

export default Staffs;
