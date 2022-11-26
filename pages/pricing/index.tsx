import { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { NextPage } from 'next';
import {
  Tabs,
  Banner,
  useScreenSize,
  Button,
  Layout
} from '../../components/LandingPage';
import {
  BilledMonthly,
  BilledQuarterly,
  BilledYearly
} from '../../contents/pricing';

const Pricing: NextPage = () => {
  const screenSize = useScreenSize();
  const [activetab, setActivetab]: any = useState('Billed Monthly');

  const tabs = ['Billed Monthly', 'Billed Quarterly', 'Billed Yearly'];

  return (
    <Layout>
      <div className='pricing_'>
        <Head>
          <title>PHAMTOM - Pricing</title>
          <meta
            name='description'
            content='Online pharmacy marketplace pricing: a fixed cost of #50, and 0.5% of each transaction.
  We only charge when a transaction has been successfully completed.'
          />
        </Head>

        <main>
          <section>
            <div className='choose_a_plan'>
              <h1>Choose a plan that works for you</h1>
              <p>
                Online pharmacy marketplace pricing: a fixed cost of #50, and
                0.5% of each transaction. We only charge when a transaction has
                been successfully completed.
              </p>
            </div>
          </section>

          {/* tabs */}
          <section style={{ marginBottom: '180px' }}>
            <Tabs
              tabs={tabs}
              activeTab={activetab}
              setActivetab={setActivetab}
            />

            <div className='plans_conntainer'>
              {activetab === 'Billed Monthly' && (
                <>
                  <BilledMonthly Image={Image} Button={Button} />
                </>
              )}
              {activetab === 'Billed Quarterly' && (
                <>
                  <BilledQuarterly Image={Image} Button={Button} />
                </>
              )}
              {activetab === 'Billed Yearly' && (
                <>
                  <BilledYearly Image={Image} Button={Button} />
                </>
              )}
            </div>
          </section>

          <Banner
            height={screenSize.width >= 821 ? '300px' : '200px'}
            linkName='Contact support'
            linkTo='phamtom-support'
            content={
              <>
                <p>Need some Guidance?</p>
                <p className='content_desc'>
                  We are here to help you with any questions about plans,
                  pricing, and supported features.
                </p>
              </>
            }
          />
        </main>
      </div>
    </Layout>
  );
};

export default Pricing;
