import Head from 'next/head';
import type { NextPage } from 'next';
import Image from 'next/image';
import { Banner, useScreenSize, Layout } from '../../components/LandingPage';

const About: NextPage = () => {
  const screenSize = useScreenSize();

  const solutions = [
    {
      title: 'Electronic Health Records',
      description:
        // eslint-disable-next-line quotes
        "PHAMTOM's electronic health records powers the documentation and access to patients' health records from any location for optimum healthcare delivery.",
      image: '/assets/about/webnmobile.svg',
      width: '487px',
      height: '288px'
    },
    {
      title: 'Online Pharmacy Marketplace',
      description:
        // eslint-disable-next-line quotes
        'PHAMTOM online pharmacy marketplace helps patients to locate their preferred medications that might not be available in local drug stores around them, at competitive price and high quality from any location.',
      image: '/assets/about/webnmobile.svg',
      width: '487px',
      height: '288px'
    },
    {
      title: 'Easy to Use for Patients',
      description:
        // eslint-disable-next-line quotes
        'Patients love PHAMTOM as a one-stop-app for their health needs.',
      image: '/assets/about/webnmobile.svg',
      width: '487px',
      height: '288px'
    },
    {
      title: 'Easy Integration',
      description:
        // eslint-disable-next-line quotes
        "It helps pharmacies to easily integrate their offline operations with their online operation without the need to write a single line of code or hire a web developer to setup and manage an online store. Hence, they're able to save cost from hiring web developers, domain and hosting services, logistics, and many more.",
      image: '/assets/about/webnmobile.svg',
      width: '487px',
      height: '288px'
    }
  ];

  return (
    <Layout>
      <div className='about_'>
        <Head>
          <title>PHAMTOM - About Us</title>
          <meta
            name='description'
            content="PHAMTOM app is a B2B2C e-commerce marketplace, telechat and electronic health records platform for Africa's Pharmacies and Hospitals."
          />
        </Head>

        <header>
          <div style={{ marginBottom: '75px' }}>
            <Banner
              height={screenSize.width >= 821 ? '280px' : '200px'}
              content='About Us'
            />
          </div>
        </header>

        <main>
          <div className='about_main'>
            <section>
              <div className='top_sec'>
                <h4>
                  PHAMTOM app is a B2B2C e-commerce marketplace, telechat and
                  electronic health records platform for Africa&apos;s
                  Pharmacies and Hospitals.
                </h4>

                <div>
                  <p>
                    Our mission is to improve health outcomes by developing
                    products that will accelerate transition to digital health.
                  </p>
                </div>
              </div>
            </section>

            {/* challenges */}
            <section>
              <div className='challanges_flex'>
                <div></div>

                <div className='challenges'>
                  <h5>Challenges</h5>
                  <div>
                    <p>
                      Pharmacies in Africa are rapidly transitioning into the
                      first point of care for many consumers.
                    </p>
                    <p>
                      However, patients, especially residents in rural and
                      underserved urban areas still struggle to locate
                      pharmacies that stocked their preferred products, at
                      competitive price without compromising on high quality.
                      According to a report, 3768 community pharmacies were
                      registered in Nigeria as at 2016 (Estimated to be above
                      5500 as at 2022) and over 40% of these pharmacies are
                      located in Lagos and FCT (Major urban areas in Nigeria)
                      which make up less than 10% of the country&apos;s
                      population. Hence, leaving over 50% of the population to
                      source their medications from local drug stores and
                      peddlers at exorbitant prices.{' '}
                    </p>
                    <p>
                      Pharmacies and clinics still lack access to EHR that
                      suites a fast paced setting to effectively document and
                      track patients&apos; health records. This could be due to
                      App pricing, Tech support, Staff training, Complexity of
                      the EHR available, Electricity and high cost of internet
                      infrastructure, unsuitable for current workflow process.
                    </p>
                    <p>
                      Pharmacies need an online pharmacy marketplace in order to
                      help patients in rural and underserved areas who struggle
                      with counterfeit and low quality medications at high
                      price.{' '}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* our solutions */}
            <section>
              <div className='our_solutions_container'>
                <div className='our_solutions'>
                  <h5>Our Solutions</h5>
                  <p>
                    PHAMTOM offers desktop and mobile based apps to solve these
                    challenges.
                  </p>
                </div>

                <ul className='solution_cards_container'>
                  {solutions.map((solution, index) => (
                    <li key={index} className='solution_card'>
                      <div className='card_img'>
                        <Image
                          src={solution.image}
                          height={solution.height}
                          width={solution.width}
                        />
                      </div>
                      <div className='card_content'>
                        <h6>{solution.title}</h6>
                        <p>{solution.description}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          <div style={{ marginTop: '240px', marginBottom: '-20px' }}>
            <Banner
              height={screenSize.width >= 821 ? '300px' : '200px'}
              linkName='Get started'
              linkTo='get-started'
              content='Signup to join our rapidly growing community of digital healthcare providers today.'
            />
          </div>
        </main>
      </div>
    </Layout>
  );
};

export default About;
