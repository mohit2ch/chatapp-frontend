import React from 'react';
import Header from '../components/Header';

function HomePage(props) {
    return (
        <div  className='h-screen w-screen bg-violet-700 flex flex-col'>
            <Header/>
            <div className='h-full w-full flex justify-center items-center text-white'>
                Home
            </div>
        </div>
    );
}

export default HomePage;