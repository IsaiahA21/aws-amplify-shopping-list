import { Link } from 'react-router-dom';
import { getViewCount, IncrementViewCount } from '../api/vistors';
import { useEffect, useState } from 'react';


async function hanldeViewIncrement() {
    await IncrementViewCount();
}

//Landing Page
// background animation: https://tailwindflex.com/@anonymous/background-animation
function Landing() {
    const [viewCount, setViewCount] = useState();

    useEffect(() => {
        const getViews = async () => {
            const views = await getViewCount();
            // console.log("views is " + views);
            setViewCount(views);
        }
        getViews();
    }, [])

    useEffect(() => {
        hanldeViewIncrement();
    }, [])
    return (
        <>
            {/* <!--Start Background Animation Body--> */}
            <div class="area">
                <ul class="circles">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
            {/* <!--End Background Animation Body--> */}
            {/**Typing animation: https://tailwindflex.com/@samuel33/typewriter-animation-effect */}
            <main className="flex flex-col items-center  z-10 h-screen">
                <div class="w-max">
                    <h1
                        class="animate-typing overflow-hidden whitespace-nowrap border-r-4 border-r-white pr-5 pb-2 text-2xl sm:text-5xl text-white md:text-7xl  lg:text-8xl font-bold mt-5">
                        SmartList
                    </h1>
                </div>
                <Link to="/Login" className="button-link m-auto" >
                    <button
                        className="animate-bounce focus:animate-none hover:animate-none w-auto h-11 px-2 bg-green-500 rounded-3xl text-lg sm:h-15 xl:py-7 xl:px-5 lg:auto font-semibold sm:text-2xl text-white  justify-center m-auto flex items-center space-x-2">
                        <div>Get Started</div>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="h-6 w-6" >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                        </svg>
                    </button>
                </Link>
                <div className='text-xs text-red-400'>
                    Views: <span className='underline'>{viewCount !== null ? (
                        <>{viewCount}
                        </>
                    ) : (
                        <>unavailable</>
                    )}
                    </span>
                </div>
            </main>
        </>
    );
}

export default Landing;
