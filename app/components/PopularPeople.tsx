
'use client'
// External Libraries
import Link from 'next/link';

//Components
import MoviePosterLoading from './Loaders/MoviePosterLoading';

//API Component
import PopularPeopleAPI from './API/HomePage/PopularPeopleAPI';

//type
interface PopularPeopleProps {
    id: number;
    known_for_department: string;
    name: string;
    popularity: number;
    profile_path: string;
}

const PopularPeople = () => {

      //get the values of the fetched data from the API
      const {PopularPeople, isLoading } = PopularPeopleAPI(`person/popular?language=en-US&page=1`)

  return (
    <>
  

    {isLoading ? 

        <>
        <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Top People</h1>
   <div className='flex flex-row justify-start overflow-x-scroll scroll-smooth bigscreens:justify-center items-center   p-6 sm:py-6 sm:px-10 gap-6'>

   {Array.from({ length: 15 }).map((_, index) => (
     <MoviePosterLoading key={index} />
   ))}
       
       </div> 
       </>
    :
    
<div className='relative'>
      {PopularPeople?.results?.length > 0
      ?
      <>
       <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Top People</h1>
   
    <ul className='flex flex-row overflow-x-scroll scroll-smooth bigscreens:justify-center  p-6 sm:py-6 sm:px-10 gap-6'>
{PopularPeople?.results?.slice(0, 15).map((person: PopularPeopleProps) => (
<li key={person.id}>
    <div className='flex flex-col justify-center animate pop max-w-[9.375rem] min-w-[9.375rem]'>
{person.profile_path
         ?
         <Link
   
         href={{
          pathname: `/person/${person.id}`,
        }}
        
       
         >
<img  
src={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${person.profile_path}`}
className='w-full  min-h-[225px] max-h-[225px]  flex self-center rounded-md hover:rotate-[-2deg] 
transform transition duration-250 hover:scale-110 hover:z-10'
srcSet={`https://image.tmdb.org/t/p/w220_and_h330_bestv2${person.profile_path} 1x, 
https://image.tmdb.org/t/p/w300_and_h450_bestv2${person.profile_path} 2x`}
loading='lazy'
alt={person.name} />
</Link>
:
<Link
   
   href={{
    pathname: `/person/${person.id}`,
  }}

>
<img  
src='https://via.placeholder.com/220x330/3F3F3F/FFFFFF/?text=PROFILE N/A'
className='w-full min-h-[225px] max-h-[225px]  flex self-center rounded-md
hover:rotate-[-2deg] transform transition duration-250 hover:scale-110 hover:z-10'

loading='lazy'
alt={person.name} />
</Link>
}
     {person.name ?
      <Link
      className='truncate   text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
      href={{
        pathname: `/person/${person.id}`,
      }}
    
      >
       {person.name}
          </Link>
          :
          <Link
          className='truncate   text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold mt-4 white   hover:text-[#e2b616]'
          href={{
            pathname: `/person/${person.id}`,
          }}
        
          >
           N/A
              </Link>
}
          
         
          
            <div className='flex  justify-between gap-6 items-center py-[5px] '>
             <div className=' flex flex-row items-center gap-1'>
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="24" viewBox="0 0 24 24" fill="none" stroke="#e2b616" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-activity"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline></svg>
          {person.popularity
          ?
           <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300'>{person.popularity.toFixed(1).replace(/\.0$/, '') }</p>
          :
          <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300'>N/A</p>
  }
            </div>
            <p className=' text-[0.78rem] sm:text-[0.9rem] text-gray-300  truncate'>{person.known_for_department ? person.known_for_department : 'N/A'}</p>
        
            </div>
             
            </div>
</li>
))
}
</ul>
</>
:
''


    }
  
    </div>
    
}

 
   </>
  )
}
export default PopularPeople