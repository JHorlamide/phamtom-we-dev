import Link from 'next/link';

const Section1 = ({ Image, Button }: any) => {
  const electronicRecords = [
    'Document Patients health records',
    'Accessible from any location',
    'Cloud-based storage',
    'Secured and HIPAA compliant',
    'Simple to use',
    'Track patients\' medication',
    'Free for up to 100 patients\'records',
    'Evidence-based decision making tool',
    'Reduce medical error'
  ];

  const marketplace = [
    'Locate pharmacies stocked with your preferred medications.',
    'High quality medication for residents in rural and underserved urban areas.',
    'Transparency and Fast delivery',
    'Medication mix',
    'Vetted Pharmacies and pharmacists.',
    'Affordable price',
    'Product visibility'
  ];

  const telechat = [
    'Virtual consultation with your healthcare provider',
    '24/7 support',
    'EHR, Chat and Medication integration',
    'Access to specialists',
    'Free',
    'Medical access to rural and underserved urban residents.'
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
                Efficient and cost effective way for health practitioners,
                hospitals, pharmacies and clinics to document their patients
                health records according to HIPAA regulations and global
                healthcare standard.
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
              <h5>Online Pharmacy Market Place</h5>
              <p>
                Are you eligible to operate an online pharmacy? Setup your
                online pharmacy store in less than five mins. Help patients
                access safe and effective medications
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
                Virtual consultation with your healthcare practitioner and
                patient in a single click.
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
                <Link href='/auth/login'>
                  <a>
                    {' '}
                    <Button className='secondary  flex items-center gap-2'>
                      {' '}
                      <p className='mt-0'>Consult now</p>
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
      </div>
    </section>
  );
};

export default Section1;
