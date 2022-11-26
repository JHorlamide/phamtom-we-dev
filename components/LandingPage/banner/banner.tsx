import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../Button';
import useScreenSize from '../../useScreenSize';

const Banner = ({ content, linkName, linkTo, height }: any) => {
  const screenSize = useScreenSize();

  return (
    <section
      // eslint-disable-next-line no-unneeded-ternary
      style={{ height: height ? height : '300px' }}
    >
      <div style={{ height: '100%' }} className='section_3'>
        <div
          // eslint-disable-next-line no-unneeded-ternary
          style={{ height: height ? height : '300px' }}
          className='bottom_banner_container'
        >
          <Image
            src='/assets/home/bottomBanner.svg'
            width={'1440.85px'}
            height={screenSize.width <= 820 ? '800px' : '400px'}
            layout={'responsive'}
          />
        </div>
        <div
          className='bottom_banner_content'
          style={{
            height: '100%',
            textAlign: linkTo ? 'left' : 'center'
          }}
        >
          <h2 style={{ marginBottom: '0px' }}>{content}</h2>

          {linkTo && (
            <div>
              <Link href={linkTo}>
                <a>
                  <Button className='secondary  flex items-center gap-2'>
                    <p className='mt-0'>{linkName}</p>
                  </Button>
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default Banner;
