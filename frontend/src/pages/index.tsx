import Navigation from '@/components/navbar'
import React from 'react'
import Link from 'next/link'
import Signup from '@/pages/signup'
import Article from '@/components/article'
import Job from '@/components/job'
import Post from '@/components/post'
import CarouselComponent from '@/components/carousel'

export default function Home() {

  return (
    <div>
      <div>
        <Navigation />
      </div>
      <div className=''>
        <Signup />
      </div>
      <div className='mt-10 bg-gray-200'>
        <Article />
      </div>
      <div className='mt-10'>
        <Job />
      </div>
      <div className='mt-10 bg-red-50'>
        <Post />
      </div>
      <div className=' bg-gray-200'>
        <CarouselComponent />
      </div>
    </div>
  )
}
