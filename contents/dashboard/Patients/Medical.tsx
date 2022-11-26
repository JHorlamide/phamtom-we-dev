import { useState } from 'react';
import Image from 'next/image';
import { Button } from '../../../components/dashboard';
import MedicalHistory from './Medical/MedicalHistory';
import MedicationHistory from './Medical/MedicationHistory';
import Vitals from './Medical/Vitals';
import Soap from './Medical/Soap';
import LabTests from './Medical/LabTests';

const Medical = ({ styles }: any) => {
  const [selectedRecord, setSelectedRecord]: any = useState(null);

  const records = [
    {
      label: 'Medical History',
      history: []
    },
    {
      label: 'SOAP',
      history: []
    },
    {
      label: 'Medication History',
      history: []
    },
    {
      label: 'Laboaratory Tests',
      history: []
    },
    {
      label: 'Vitals Signs',
      history: []
    }
  ];

  return (
    <>
      <div className={styles.medical_container}>
        {!selectedRecord && (
          <div className={styles.records_container}>
            {records.map((record: any, index: any) => (
              <div
                key={index}
                className={styles.rec_}
                onClick={() => setSelectedRecord(record)}
              >
                <div className={styles.record}>
                  <p> {record.label}</p>
                  <Image
                    src='/assets/dashboard/chevronRight.svg'
                    width={'4.94px'}
                    height={'8px'}
                  />
                </div>

                <hr />
              </div>
            ))}

            <Button className={styles.add_record}>
              <Image
                src={'/assets/dashboard/plus.svg'}
                width={'14px'}
                height={'14px'}
              />
              <p>Add record</p>
            </Button>
          </div>
        )}

        {selectedRecord && selectedRecord.label === 'Medical History' && (
          <MedicalHistory
            styles={styles}
            Image={Image}
            medicalHistory={selectedRecord}
            setSelectedRecord={setSelectedRecord}
          />
        )}

        {selectedRecord && selectedRecord.label === 'Medication History' && (
          <MedicationHistory
            styles={styles}
            Image={Image}
            medicalHistory={selectedRecord}
            setSelectedRecord={setSelectedRecord}
          />
        )}

        {selectedRecord && selectedRecord.label === 'SOAP' && (
          <Soap
            styles={styles}
            Image={Image}
            medicalHistory={selectedRecord}
            setSelectedRecord={setSelectedRecord}
          />
        )}

        {selectedRecord && selectedRecord.label === 'Laboaratory Tests' && (
          <LabTests
            styles={styles}
            Image={Image}
            medicalHistory={selectedRecord}
            setSelectedRecord={setSelectedRecord}
          />
        )}

        {selectedRecord && selectedRecord.label === 'Vitals Signs' && (
          <Vitals
            styles={styles}
            Image={Image}
            medicalHistory={selectedRecord}
            setSelectedRecord={setSelectedRecord}
          />
        )}
      </div>
    </>
  );
};

export default Medical;
