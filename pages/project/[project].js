import React from 'react'
import Footer from '../../components/Footer'
import Header from '../../components/Project/Header'
import { project } from '../../projects'
import { useRouter } from 'next/router'

const Project = () => {
    const router = useRouter();
    const data = project.find((element, i) => element.title === router.query.project)

    console.log(data)
    return (
        <>
            <div className='bg-primary text-white'>
                <Header data={data} />
                <Footer />
            </div>
        </>
    )
}

export default Project