import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

export default function CarouselComponent() {
    return (
        <div className='p-32' id='carousel'>
            <Carousel
                className="bg-gray-200"
                pauseOnHover
                responsive={{
                desktop: {
                    breakpoint: {
                    max: 3000,
                    min: 1024
                    },
                    items: 1,
                    partialVisibilityGutter: 40
                },
                mobile: {
                    breakpoint: {
                    max: 464,
                    min: 0
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                },
                tablet: {
                    breakpoint: {
                    max: 1024,
                    min: 464
                    },
                    items: 1,
                    partialVisibilityGutter: 30
                }
                }}
            >
                <div className='flex gap-10' id='item'>
                    <div className='basis-3/5 ml-10 m-auto'>
                        <span className='text-5xl'>Let the right people know you’re open to work</span>
                        <p className='text-lg mt-5'>With the Open To Work feature, you can privately tell recruiters or publicly share with the LinkedIn community that you are looking for new job opportunities.</p>
                    </div>
                    <div className='basis-2/5'>
                        <img src='img1.svg' />
                    </div>
                </div>
                <div className='flex gap-10' id='item'>
                    <div className='basis-3/5 ml-10 m-auto'>
                        <span className='text-5xl'>Let the right people know you’re open to work</span>
                        <p className='text-lg mt-5'>With the Open To Work feature, you can privately tell recruiters or publicly share with the LinkedIn community that you are looking for new job opportunities.</p>
                    </div>
                    <div className='basis-2/5'>
                        <img src='img1.svg' />
                    </div>
                </div>
                <div className='flex gap-10' id='item'>
                    <div className='basis-3/5 ml-10 m-auto'>
                        <span className='text-5xl'>Let the right people know you’re open to work</span>
                        <p className='text-lg mt-5'>With the Open To Work feature, you can privately tell recruiters or publicly share with the LinkedIn community that you are looking for new job opportunities.</p>
                    </div>
                    <div className='basis-2/5'>
                        <img src='img1.svg' />
                    </div>
                </div>
            </Carousel>
        </div>
    )
}