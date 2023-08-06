import Link from 'next/link';

const Section1 = ({ Image, Button }: any) => {
  const electronicRecords = [
    'Document Patients health records',
    'Efficient for pharmacies',
    'Cloud-based storage',
    'Secured and HIPAA compliant',
    'Evidence-based decision-making tool',
    'Improve patient outcomes',
  ];

  const marketplace = [
    'Integrate with your physical store',
    'Provide optimum care to your patients online and offline',
    'High-quality medication',
    'Timesaving',
    'Doorstep delivery',
    'Medication mix',
  ];

  const telechat = [
    'Access to specialists',
    'Medical access to residents in rural and underserved areas',
    'Address your needs from any convenient location',
  ];

  return (
    <section>
      <div className='our_products'>
        <h2 className=''>Our Products</h2>
      </div>

      {/* products */}
      <div className='products'>
        {/* electronic heallth records */}
        <div className='prod'>
          <div>
            <Image
              src='/assets/home/records.svg'
              height={'562px'}
              width={'547px'}
              layout={'responsive'}
            />
          </div>

          <div className='prod_desc'>
            <div>
              <h5>Electronic Health records</h5>
              <p>
                An efficient and cost-effective way for health practitioners, hospitals,
                pharmacies, and clinics to document their patients’ health records according
                to HIPAA regulations and global healthcare standards.
              </p>
            </div>

            <div className='flex flex-col gap-4'>
              <div>
                {electronicRecords.map((product: any, index: any) => (
                  <div key={index} className='prod_benefits'>
                    <Image
                      src='/assets/home/checked.svg'
                      height={24}
                      width={24}
                    />
                    <p>{product}</p>
                  </div>
                ))}
              </div>

              <div>
                <Link href='/auth/login'>
                  <a>
                    {' '}
                    <Button className='secondary  flex items-center gap-2'>
                      {' '}
                      <p className='mt-0'>Add patient record</p>
                      <Image
                        src='/assets/home/arrowRight.svg'
                        height={8}
                        width={16}
                      />
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className='prod column_reverse'>
          <div className='prod_desc'>
            <div>
              <h5>Online Pharmacy</h5>
              <p>
                Set up your online pharmacy store in less than five minutes.
                Improves patients’ access to quality and effective medications
              </p>
            </div>

            <div className='flex flex-col gap-4'>
              <div>
                {marketplace.map((product: any, index: any) => (
                  <div key={index} className='prod_benefits'>
                    <Image
                      src='/assets/home/checked.svg'
                      height={24}
                      width={24}
                    />
                    <p>{product}</p>
                  </div>
                ))}
              </div>

              <div>
                <Link href='/auth/login'>
                  <a>
                    {' '}
                    <Button className='secondary  flex items-center gap-2'>
                      {' '}
                      <p className='mt-0'>Setup your store</p>
                      <Image
                        src='/assets/home/arrowRight.svg'
                        height={8}
                        width={16}
                      />
                    </Button>
                  </a>
                </Link>
              </div>
            </div>
          </div>
          <div>
            <Image
              src='/assets/home/market.svg'
              height={'562px'}
              width={'547px'}
              layout={'responsive'}
            />
          </div>
        </div>

        <div className='prod'>
          <div>
            <Image
              src='/assets/home/telechat.svg'
              height={'562px'}
              width={'547px'}
              layout={'responsive'}
            />
          </div>
          
          <div className='prod_desc'>
            <div>
              <h5>Telechat</h5>
              <p>
                Virtual Consultation with licensed and qualified health professionals
              </p>
            </div>

            <div className='flex flex-col gap-4'>
              <div>
                {telechat.map((product: any, index: any) => (
                  <div key={index} className='prod_benefits'>
                    <Image
                      src='/assets/home/checked.svg'
                      height={24}
                      width={24}
                    />
                    <p>{product}</p>
                  </div>
                ))}
              </div>

              <div>
                {/* <Link href='/auth/login'>
                  <a> */}
                {' '}
                <Button className='secondary  flex items-center gap-2'>
                  {' '}
                  <p className='mt-0'>Coming soon</p>
                  {/* <Image
                        src='/assets/home/arrowRight.svg'
                        height={8}
                        width={16}
                      /> */}
                </Button>
                {/* </a>
                </Link> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section1;
