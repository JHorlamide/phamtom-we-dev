import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import {
  Button,
  Banner,
  Layout,
  useScreenSize
} from '../components/LandingPage';
import { Section1, Section2 } from '../contents/homepage';

const Home: NextPage = () => {
  const screenSize = useScreenSize();

  return (
    <Layout>
      <div className='homepage'>
        <Head>
          <title>PHAMTOM - Home Page</title>
          <meta
            name='description'
            content='Serving over 100+ hospitals, community pharmacies, clinics and
                  health practitioners.'
          />
        </Head>

        <header className='hero_container'>
          <div className='hero_content'>
            <h1>
              <span>
                {' '}
                Electronic Health Record. <br />{' '}
              </span>{' '}
              Online Pharmacy. <br />
              <span>Telechat.</span>
            </h1>

            <div>
              <p>Start your Journey!</p>
            </div>
            <div className='download_app'>
              <div>
                <Image
                  src='/assets/home/googlePlay.svg'
                  width={'157.5px'}
                  height={'48px'}
                />
              </div>
              <div>
                <Image
                  src='/assets/home/appStore.svg'
                  width={'157.5px'}
                  height={'48px'}
                />
              </div>
            </div>
          </div>
          <div>
            <div className='hero_img'>
              <Image
                src='/assets/hero.svg'
                height={'672px'}
                width={'911.94px'}
                layout={screenSize.width >= 1025 ? 'responsive' : 'intrinsic'}
              />
            </div>
          </div>
        </header>

        <main>
          {/* section ::: OUR PRODUCTS */}

          <Section1 Image={Image} Button={Button} />

          <Section2 Image={Image} Button={Button} />

          <Banner
            linkTo='/signup'
            linkName='Sign up for free'
            content=' Serving over 100+ hospitals, community pharmacies, clinics and
                  health practitioners.'
          />
        </main>
      </div>
    </Layout>
  );
};

export default Home;
