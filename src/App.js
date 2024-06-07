import './App.css'

//Landing Page
// background animation: https://tailwindflex.com/@anonymous/background-animation
function App() {
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
            Shopping List
          </h1>
        </div>
        <button className="animate-bounce focus:animate-none hover:animate-none w-auto h-11 px-3  bg-green-500 rounded-3xl text-lg sm:h-15 lg:w-2/12 font-semibold sm:text-3xl text-white  justify-center m-auto ">
          <div className='float-left'>          Get Started</div>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="size-6 my-auto" >
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
          </svg>
        </button>
      </main>
    </>
  );
}

export default App;
