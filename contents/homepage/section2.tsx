import Link from 'next/link';

const Section2 = ({ Image, Button }: any) => {
  return (
    <section>
      <div className='section_2'>
        <div>
          <div>
            <h2>Are you eligible to operate an online pharmacy? </h2>
            <div>
              <p>
                Setup your online pharmacy store in less than five mins. Help
                patients access safe and effective medications.
              </p>
            </div>
          </div>

          <div>
          <Link href='/auth/login'>
            <a>
              {' '}
              <Button className='btn_primary  flex items-center gap-2'>
                {' '}
                <p className='mt-0 inherit text-sm'>Setup your store</p>
                <Image src='/assets/home/arrowWhite.svg' height={16} width={16} />
              </Button>
            </a>
          </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Section2;
