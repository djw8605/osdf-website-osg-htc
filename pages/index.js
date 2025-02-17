import Head from 'next/head'
import Link from 'next/link'
import NavBar from '../components/navbar'
import Footer from '../components/footer'
import { ServerIcon, CodeIcon, GlobeIcon, CogIcon } from '@heroicons/react/outline'

import dynamic from 'next/dynamic'
import Stats from '../components/stats'
import FeatureIcon from '../components/featureIcon'
import { getData } from './api/gatherStats'

const GlobeArea = dynamic(() => import('../components/globe.js'), { ssr: false })


export async function getStaticProps() {
  const data = await getData()
  console.log("In static props:" + data);
  return {
    props: {
      usageData: data
    }
  }
}

export default function Home({ usageData }) {
  console.log("In home:");
  console.log(usageData);
  return (<>
    <NavBar />
    <Head>
      <title>Open Science Data Federation</title>
      <link rel="icon" href="/favicon.ico" />
    </Head>
    <div className='w-full flex bg-gray-900 p-6'>
      <div className='container mx-auto lg:grid lg:grid-cols-2 lg:gap-4'>
        <div className='hero-text'>
          <div>
            <h1 className='md:text-6xl text-2xl font-extrabold mb-4 text-white'>Open Science Data Federation</h1>
            <p className='mt-5 sm:mt-10 lg:w-10/12 text-gray-400 font-normal text-lg sm:text-lg">'>
              Providing data access and transfer services for Open Science
            </p>
            <Stats inputData={usageData} />
          </div>
        </div>
        <div id="globe">
          <GlobeArea />
        </div>
      </div>

    </div>
    <div className='w-full bg-gray-900 p-8 text-white'>

      <div className='container flex-none md:flex md:flex-row justify-center items-stretch mx-auto'>
        <FeatureIcon icon={<CodeIcon className='h-7 w-7 text-lime-400 mr-1 my-1' />}
          title='Built on Open Source'
        >
          <p>Built on projects such as <a href="https://pelicanplatform.org/" className='text-blue-300 hover:text-blue-500'>Pelican</a>,
            {' '}<a href="https://xrootd.slac.stanford.edu/" className='text-blue-300 hover:text-blue-500'>XRootD</a>,
            {' '}<a href="https://cernvm.cern.ch/fs/" className='text-blue-300 hover:text-blue-500'>CVMFS</a>,
            and <a href="https://kubernetes.io/" className='text-blue-300 hover:text-blue-500'>Kubernetes</a></p>

        </FeatureIcon>
        <FeatureIcon icon={<CogIcon className='h-7 w-7 text-lime-400 mr-1 my-1' />}
          title='Client Tools availble on the OSG'>
          <p>Client tools such as <Link href="https://docs.pelicanplatform.org/" className='text-blue-300 hover:text-blue-500'>Pelican</Link> and CVMFS available for every operating system.</p>
        </FeatureIcon>

        <FeatureIcon icon={<GlobeIcon className='h-7 w-7 text-lime-400 mr-1 my-1' />}
          title='Globally Distributed Caches'>
          <p>Caches located throughout the globe at participating organizations and on the network backbone.</p>
        </FeatureIcon>

      </div>


    </div>
    <Footer />
  </>);
}

/*

      <section className='bg-gray-900 p-8 text-white'>
        <div className='container mx-auto'>
          <h2 className='text-3xl font-extrabold mb-4 text-white'>Features</h2>
          
        </div>
      </section>
      */