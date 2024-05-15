'use client';
/* eslint-disable @next/next/no-img-element */
import Link from 'next/link';
import { useState } from 'react';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';

const LandingPage = () => {
    const [isHidden] = useState(false);

    return (
        <div className="surface-0 flex justify-content-center">
            <div id="home" className="landing-wrapper overflow-hidden">
                <div className="py-3 px-4 mx-0 md:mx-6 lg:mx-8 lg:px-8 flex align-items-center justify-content-between relative lg:static">
                    <div className="flex items-center"> 
                        <img src="/layout/images/logo-white.svg" alt="Tapestry Logo" height="50" className="mr-2" />
                        <span className="text-900 font-medium text-4xl line-height-3 whitespace-nowrap">IMPACT TAPESTRY</span>
                    </div>

                    <div className={classNames('align-items-center surface-0 flex-grow-1 justify-content-between hidden lg:flex absolute lg:static left-0 px-6 lg:px-0 z-2', { hidden: isHidden })} style={{ top: '100%', maxWidth: '300px' }}>
                        <ul className="list-none p-0 m-0 flex lg:align-items-center select-none flex-column lg:flex-row cursor-pointer">
                            <li></li>
                        </ul>
                        
                        <div className="flex justify-content-between lg:block border-top-1 lg:border-top-none surface-border py-3 lg:py-0 mt-3 lg:mt-0">
                            <Link href="/auth/login" className="flex align-items-center">
                                <Button label="Login" rounded className="border-none ml-5 font-light line-height-2 bg-blue-500 text-white"></Button>
                            </Link>
                        </div>
                    </div>
                </div>

                <div
                    id="hero"
                    className="flex flex-column pt-2 px-4 lg:px-8 overflow-hidden"
                    style={{
                        width: '100vw',
                        background: 'linear-gradient(0deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), radial-gradient(77.36% 256.97% at 77.36% 57.52%, #EEEFAF 0%, #C3E3FA 100%)',
                        clipPath: 'ellipse(150% 87% at 93% 13%)'
                    }}
                >
                    <div className="mx-4 md:mx-8 mt-0 md:mt-2">
                        <h3 className="text-6xl font-bold text-gray-900 line-height-2">
                            <span className="font-light block">Impact Tapestry</span>Admin DashBoard
                        </h3>
                    </div>
                    <div className="flex justify-content-center md:justify-content-end">
                        <img src="/demo/images/landing/tapestry.png" alt="Hero Image" className="w-9 md:w-auto rounded-circle" style={{ borderRadius: '25px' }} />
                    </div>

                </div>

                <div className="px-4 mx-0 mt-6 lg:mx-8">
                    <div className="grid justify-content-between">
                        <div className="col-12 md:col-4 py-6" style={{ marginTop: '-1.5rem' }}>
                            <Link href="/" className="flex flex-wrap align-items-center justify-content-center md:justify-content-start md:mb-0 mb-3 cursor-pointer">
                                <img src={`/layout/images/logo-white.svg`} alt="footer sections" width="50" height="50" className="mr-2" />
                                <span className="font-medium text-3xl text-900">IMPACT TAPESTRY</span>
                            </Link>
                        </div>

                        <div className="col-12 md:col-8 lg:col-7">
                            <div className="grid text-center md:text-left">
                                <div className="col-12 md:col-3">
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">About Us</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">News</a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Get Started</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Learn</a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">
                                        Events
                                        <img src="/demo/images/landing/new-badge.svg" className="ml-2" alt="badge" />
                                    </a>
                                    <a className="line-height-3 text-xl block cursor-pointer text-700">Blog</a>
                                </div>

                                <div className="col-12 md:col-3 mt-4 md:mt-0">
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Brand Policy</a>
                                    <a className="line-height-3 text-xl block cursor-pointer mb-2 text-700">Privacy Policy</a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default LandingPage;
