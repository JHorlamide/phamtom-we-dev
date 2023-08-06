import { useState, useEffect } from 'react';
import { NextPage } from 'next/types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import styles from '../../../styles/dashboard/EHR.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { orderService, patientsService, staffService } from '../../../services/restService';
import { setPatients, setSelectedPatient } from '../../../redux/actions/patients';
import { Button, DashboardLayout } from '../../../components/dashboard';
import { AddNewPatient } from '../../../contents/dashboard/Patients';
import modalStyles from '../../../styles/dashboard/Patients.module.scss';
import { setStaffs } from '../../../redux/actions/staffs';
import { AddNewStaff } from '../../../contents/dashboard/Staffs';
import { setOrders } from '../../../redux/actions/pharmacy';

const EHR: NextPage = () => {
  const dispatch = useDispatch();
  const { push } = useRouter();
  const { admin } = useSelector((state: any) => state.adminReducer);
  const { patients } = useSelector((state: any) => state.patientsReducer);
  const { staffs } = useSelector((state: any) => state.staffReducer);
  const { orders } = useSelector((state: any) => state.pharmacyReducer);

  const [totalPatients, setTotalPatients] = useState(0);
  // const [totalOrders, setTotalOrders] = useState(0);
  const [showAddNewStaffModal, setShowAddNewStaffModal]: any = useState(false);
  const [patientsAddedTday, setPatientsAddedTday] = useState(0);
  const [showAddNewPatientModal, setShowAddNewPatientModal]: any =
    useState(false);

  const handleHideAddNewPatient = () => {
    setShowAddNewPatientModal(false);
  };

  const handleHideAddNewStaff = () => {
    setShowAddNewStaffModal(false);
  };

  var getInitials = function (data: string) {
    var names = data?.split(' '),
      initials = names?.[0]?.substring(0, 1).toUpperCase();

    if (names?.length > 1) {
      initials += names?.[names?.length - 1]?.substring(0, 1).toUpperCase();
    }
    return initials;
  };
  console.log(orders)
  const cards = [
    {
      title: 'Total patients',
      value: totalPatients,
      additional: (
        <p className={styles.additional}>
          +{patientsAddedTday}
          <span> change today</span>
        </p>
      )
    },
    {
      title: 'Total orders',
      value: orders?.length,
      additional: (
        <p className={styles.additional}>
          +2
          <span> new orders</span>
        </p>
      )
    }
  ];

  // const staffs = [
  //   {
  //     name: 'John Doe',
  //     title: 'Director',
  //     avatar: '/assets/dashboard/avatar.svg',
  //     role: 'Admin'
  //   },
  //   {
  //     name: 'John Doe',
  //     title: 'Asisting Manager',
  //     avatar: '/assets/dashboard/avatar.svg',
  //     role: 'Admin'
  //   },
  //   {
  //     name: 'John Doe',
  //     title: 'Doctor',
  //     avatar: '/assets/dashboard/avatar.svg',
  //     role: 'Admin'
  //   }
  // ];

  // const chats = [
  //   {
  //     name: 'John Doe',
  //     message: 'Hello, how are you?',
  //     avatar: '/assets/dashboard/avatar_2.svg',
  //     time: '12:00',
  //     totalUnread: 2
  //   },
  //   {
  //     name: 'John Doe',
  //     message: 'Hello, how are you?',
  //     avatar: '/assets/dashboard/avatar_2.svg',
  //     time: '12:00',
  //     totalUnread: 2
  //   },
  //   {
  //     name: 'John Doe',
  //     message: 'Hello, how are you?',
  //     avatar: '/assets/dashboard/avatar.svg',
  //     time: '12:00',
  //     totalUnread: 2
  //   }
  // ];
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

  useEffect(() => {
    handleGetAllPatients();
    getAllPendingOrders
  }, []);

  useEffect(() => {
    getPatientsAddedToday();
    getTotalPatients();
  }, []);

  const handleGetAllPatients = async () => {
    try {
      await patientsService.getAllPatients(admin.access_token)
        .then((response) => response.data)
        .then(res => {
          if (res.status === 'Success') {
            dispatch(setPatients(res.data));
            // dispatch(setPatients(res.data.reverse()));
          }
        })
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetAllStaffs();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleGetAllStaffs = async () => {
    try {
      await staffService.getAllStaffs(admin.access_token)
        .then(response => response.data)
        .then((res) => {
          console.log(res)
          if (res.status === "Success") {
            dispatch(setStaffs(res.data.reverse()));
          }
        })


    } catch (error) {
      console.log(error);
    }
  };

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
  const getPatientsAddedToday = async () => {
    try {
      const {
        data: {
          data
        }
      } = await patientsService.getPatientsAddedToday(admin.access_token);
      console.log(data)
      setPatientsAddedTday(data);
    } catch (e: any) {
      console.log(e);
    }
  };

  return (
    <DashboardLayout>
      <div className={styles.ehr_container}>
        <div id={styles.left_items}>
          <ul className={styles.cards_container}>
            {cards.map((card: any, index: any) => (
              <li key={index} className={styles.card}>
                <p className={styles.title}>{card.title}</p>
                <h2>{card.value}</h2>
                <div>{card.additional}</div>
              </li>
            ))}
          </ul>

          {/* quick actions */}
          <div className={styles.quick_actions}>
            <h5>Quick actions</h5>

            <div className={styles.quick_actions_btns}>
              <Button
                onClick={() => setShowAddNewPatientModal(true)}
                className='btn_primary w-full text-sm'
              >
                Add new patient
              </Button>
              <Button
                onClick={() => {
                  dispatch(setSelectedPatient(patients[0]))
                  push('/dashboard/patients');
                }}
                className='btn_tertiary w-full'
              >
                Patient&apos;s record
              </Button>
            </div>
          </div>

          {/* recent patients */}
          <div className={styles.recent_patients}>
            <div className={styles.recent_p}>
              <h5>Recent patients</h5>

              <div onClick={() => {
                dispatch(setSelectedPatient(patients[0]))
                push('/dashboard/patients');
              }}>
                <p>View all</p>
                <Image
                  src='/assets/dashboard/ehr/arrow.svg'
                  alt='arrow'
                  width={'12.05px'}
                  height={'15px'}
                />
              </div>
            </div>

            <ul className={styles.recent_p_list}>
              {patients?.slice(0, 5)?.map((patient: any, index: any) => (
                <li
                  key={index}
                  className={styles.patient}
                  onClick={() => {
                    push('/dashboard/patients')
                    dispatch(setSelectedPatient(patient))
                  }}
                >
                  <div className={styles.patient_name}>

                    {
                      patient?.profileImage ?
                        <Image
                          src={'/assets/dashboard/avatar.svg'}
                          alt='avatar'
                          width={'40'}
                          height={'40'}
                          layout='fixed'
                        />
                        : (
                          <div className={styles.initials}>
                            <h2>{getInitials(`${patient.patient_demographic.first_name} ${patient.patient_demographic.last_name}`)}</h2>
                          </div>
                        )

                    }
                    {/* <Image
                      src={'/assets/dashboard/avatar.svg'}
                      alt='avatar'
                      width={'40px'}
                      height={'40px'}
                      layout={'fixed'}
                    /> */}
                    <p className={styles.name}>
                      {patient.patient_demographic.first_name}{' '}
                      {patient.patient_demographic.last_name}
                    </p>
                  </div>
                  <p className={styles.email}>
                    {patient.patient_demographic.email}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div id={styles.right_items}>
          <div className={styles.medic}>
            <Image
              src='/assets/dashboard/ehr/medic.svg'
              alt='medic'
              width={'120px'}
              height={'194px'}
              layout='fixed'
            />

            <div
              onClick={() => push('/dashboard/pharmacy')}
              className={styles.medic_text}
            >
              <p>
                Online <br /> Pharmacy
              </p>

              <div>
                <Image
                  src='/assets/dashboard/ehr/arrow.svg'
                  alt='medic'
                  width={'12.05px'}
                  height={'15px'}
                />
              </div>
            </div>
          </div>

          {/* staffs */}
          <div className={styles.staffs_container}>
            <div className={styles.staffs_flex}>
              <h5>Staffs</h5>

              <div onClick={() => push("/dashboard/staffs")}>
                <p>View all</p>
                <Image
                  src='/assets/dashboard/ehr/arrow.svg'
                  alt='arrow'
                  width={'12.05px'}
                  height={'15px'}
                />
              </div>
            </div>

            <ul className={styles.staffs}>
              {staffs.map((member: any, index: any) => (
                <li key={index} className={styles.staff}>
                  <div className={styles.member}>
                    {/* <Image
                      src="/assets/dashboard/avatar.svg"
                      alt='avatar'
                      width={'40px'}
                      height={'40px'}
                    /> */}
                    {
                      member?.profileImage ?
                        <Image
                          src={'/assets/dashboard/avatar.svg'}
                          alt='avatar'
                          width={'40'}
                          height={'40'}
                          layout='fixed'
                        />
                        : (
                          <div className={styles.initials}>
                            <h2>{getInitials(`${member?.first_name} ${member?.last_name}`)}</h2>
                          </div>
                        )

                    }

                    <div>
                      <p className={styles.name}>{`${member?.first_name} ${member?.last_name}`}</p>
                      {/* <p className={styles.title}>{member.last_name}</p> */}
                    </div>
                  </div>
                  <p className={styles.role}>{member.role}</p>
                </li>
              ))}
            </ul>

            <Button
              className='secondary_2 w-full'
              style={{ marginTop: '8px' }}
              onClick={() => setShowAddNewStaffModal(true)}
            >
              Add new staff
            </Button>
          </div>

          {/* chats */}
          {/* <div className={styles.chats_container}>
            <div className={styles.chats_actions}>
              <div>
                <h5>Chats</h5>

                <Badge color={'badge_primary'} content={5} />
              </div>
              <div onClick={() => push('/dashboard/telechat')}>
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
              <ul className={styles.chats}>
                {chats.map((chat: any, index: any) => (
                  <li key={index}>
                    <div
                      className={styles.chat}
                      onClick={() => push('/dashboard/telechat')}
                    >
                      <div className={styles.chat_info}>
                        <Image
                          src={chat.avatar}
                          alt='avatar'
                          width={'40'}
                          height={'40'}
                          layout='fixed'
                        />

                        <div>
                          <p className={styles.chat_name}>{chat.name}</p>
                          <p className={styles.message}>{chat.message}</p>
                        </div>
                      </div>

                      <div className='flex flex-col items-end'>
                        <p className={styles.chat_time}>{chat.time}</p>
                        <Badge
                          color={'badge_primary'}
                          content={chat.totalUnread}
                        />
                      </div>
                    </div>

                    <hr />
                  </li>
                ))}
              </ul>
            </div>
          </div> */}
        </div>
      </div>

      <AddNewPatient
        admin={admin}
        handleGetAllPatients={handleGetAllPatients}
        styles={modalStyles}
        showAddNewPatientModal={showAddNewPatientModal}
        onHide={handleHideAddNewPatient}
      />

      <AddNewStaff
        styles={modalStyles}
        showAddNewStaffModal={showAddNewStaffModal}
        onHide={handleHideAddNewStaff}
        admin={admin}
      // handleGetAllStaffs={handleGetAllStaffs}
      />
    </DashboardLayout>
  );
};

export default EHR;
