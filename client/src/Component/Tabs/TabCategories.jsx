import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import JobCard from '../JobCard/JobCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

const TabCategories = () => {
    const [jobs, setJobs] = useState([])
    useEffect(() => {
        const getItem = async () => {
            const { data } = await axios('http://localhost:9000/jobs')
            // console.log('data from axios ', data);
            setJobs(data)
        }
        getItem()
    }, [])
    
    return (
        <div className='container mx-auto px-6 py-8'>
            <h1 className='text-center font-bold text-3xl mb-4'>Browse Jobs By Categories</h1>
            <p className='text-xl mx-auto w-1/2 text-center mb-9'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Magnam, animi! Cumque facere velit dicta harum</p>
            <Tabs>
                <div className='flex justify-center'>
                    <TabList>
                        <Tab>Web Development</Tab>
                        <Tab>Graphic Design</Tab>
                        <Tab>Digital Marketing</Tab>
                    </TabList>
                </div>
                <TabPanel>
                    <div className='grid mt-8 xl:mt-16 grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {
                            jobs?.filter(j => j.category === 'Web Development').map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>

                </TabPanel>
                <TabPanel>
                    <div className='grid mt-8 xl:mt-16 grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {
                            jobs?.filter(j => j.category === 'Graphic Design').map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
                <TabPanel>
                    <div className='grid mt-8 xl:mt-16 grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
                        {
                            jobs?.filter(j => j.category === 'Digital Marketing').map(job => <JobCard key={job._id} job={job}></JobCard>)
                        }
                    </div>
                </TabPanel>
            </Tabs>
        </div>
    );
};

export default TabCategories;