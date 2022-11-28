import React from 'react'
import Image from 'next/image'

const Footer = () => {
    return (
        <div>
            <div className='w-full border-t-2 border-t-white text-dimWhite'>
                <div className='flex flex-col gap-3 justify-center items-center pt-12'>
                    <a rel="noreferrer" href="https://merchant.razorpay.com/policy/KlPN8bFE1Kc7Q0/terms">
                        <p className='text-[1.5rem]'>
                            Terms and Conditions
                        </p>
                    </a>
                    <a rel="noreferrer" href="https://merchant.razorpay.com/policy/KlPN8bFE1Kc7Q0/shipping">
                        <p className='text-[1.5rem]'>
                            Shipping & Delivery Policy
                        </p>
                    </a>
                    <a rel="noreferrer" href="https://merchant.razorpay.com/policy/KlPN8bFE1Kc7Q0/refund">
                        <p className='text-[1.5rem]'>
                            Cancellation & Refund Policy
                        </p>
                    </a>
                    <a rel="noreferrer" href="https://merchant.razorpay.com/policy/KlPN8bFE1Kc7Q0/privacy">
                        <p className='text-[1.5rem]'>
                            Privacy Policy
                        </p>
                    </a>
                    <a rel="noreferrer" href="https://merchant.razorpay.com/policy/KlPN8bFE1Kc7Q0/contact_us">
                        <p className='text-[1.5rem]'>
                            Contact us
                        </p>
                    </a>
                </div>
            </div>
            <div className='w-[75%] m-auto flex justify-between items-end sm:w-[95%]'>
                <div className='w-[7rem] h-[5rem] relative -bottom-[2.5rem] sm:-bottom-[2rem] sm:w-[5rem] sm:h-[4rem]'>
                    <Image src="/cat.png" layout='fill' />
                </div>
                <div className='w-[14rem] h-[26rem] relative -bottom-[1rem] sm:w-[11rem] sm:h-[20rem]'>
                    <Image src="/boy3.png" layout='fill' />
                </div>
            </div>
            <div className='w-full h-[3rem] bg-grey'>
                <div className='w-[75%] m-auto sm:w-[95%]'>
                    <p className='pt-4 text-[1.2rem] text-white'>
                        Made via ReactJs & NextJs
                    </p>
                </div>
            </div>
        </div>
    )
}

export default Footer