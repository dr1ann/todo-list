'use client'

// External Libraries
import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Image from 'next/image';
import axios from 'axios';
import Link from 'next/link';
import  {Drawer} from 'vaul'
//Images
import noprofile from '../Images/noprofile.png'

//Components
import PersonLoading from '../components/Loaders/PersonLoading';

//type
type MovieCredits = {
  credit_id: number;
  id: number;
  cast_id: number;
 character: string;
  original_name: string ;
  
  profile_path: string ;
  known_for_department: string;
  job: string;
  
};

const Crew_Cast =   () => {

  //use states
  const searchParams = useSearchParams();
  const [credits, setCredits] = useState<any>({})
  const [isPeopleLoading, setIsPeopleLoading] = useState(true);





  //Authorization to fetch data from the API with its base url
  const axiosInstance = axios.create({
    baseURL: 'https://api.themoviedb.org/3', 
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTc4ZmYxMDZlNmJlZTcwY2U4MjkzMjQyMTcwYzc1ZCIsInN1YiI6IjY0YTU2MTA2ZGExMGYwMDBlMjI1YjBlOCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.rMSflTYcWOov1VQW3hjVgPDE3XQ00c1nSB0sujN_bfY',
    },
  });

 //fetch all data from the api
 const DataFromAPI = async () => {
      

  try {

    //the current movie id
    const currID = searchParams.get('id');

    const response =  await axiosInstance.get(`/movie/${currID}/credits?language=en-US`) //MovieCredits
   

  
    setCredits(response.data);
    setIsPeopleLoading(false) // Skeleton loader is disabled

 
   
  } catch (error) {
    console.error('Error fetching data:', error); // Catch errors if data is not fetched
  }
  
};
  useEffect(() => {
 
    //call the function to get the data from the api
    DataFromAPI();

  }, []);

 


 


 //get only the important crew members from the movie 
 const importantCrewMembers = credits && credits.crew && credits.crew.filter((movie:MovieCredits) => {
  return (
    movie.job === 'Director' || 
     movie.job === 'Writer' ||
      movie.job === 'Producer'
   
  )
  
});

  return (
    
    <div>
         <div>
    <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Top Billed Cast</h1>
    {isPeopleLoading ? 
   <div className='flex flex-row justify-start overflow-x-scroll bigscreens:justify-center items-center p-6 sm:p-10 gap-10'>

   {Array.from({ length: 15 }).map((_, index) => (
     <PersonLoading key={index} />
   ))}
       
       </div> 
       
    :
<div className='relative'>
      {credits && credits.cast && credits.cast.length > 0
      ?
    <div className='flex flex-row overflow-x-scroll  bigscreens:justify-center  p-6 sm:p-10 gap-6 '>

{credits && credits.cast && credits.cast.slice(0, 15).map((person: MovieCredits) => (

<div key={person['credit_id']} className='bg-[#1a1a1a] drop-shadow-2xl customized-shadow shadow-sm rounded-md'> 



<div className='flex flex-col justify-center animate pop max-w-[8.625rem] min-w-[8.625rem]'>
  {person['profile_path'] ?

<div className='max-w-full min-w-full  max-h-[175px] min-h-[175px] flex self-center rounded-t-md overflow-hidden'>
<img  
src={`https://image.tmdb.org/t/p/w138_and_h175_face${person['profile_path']}`}
className='w-full h-full'
srcSet={`https://image.tmdb.org/t/p/w138_and_h175_face${person['profile_path']} 1x,
 https://image.tmdb.org/t/p/w276_and_h350_face${person['profile_path']} 2x`}
loading='eager'
alt={person['original_name']} />

</div>


    :
    <div className='max-w-full min-w-full  rounded-t-md max-h-[175px] min-h-[175px] flex self-center  overflow-hidden'>
    <Image  
 src={noprofile}
    className='w-full h-full'
    
    loading='eager'
    alt={person['original_name']} />
    
    </div>
  }

 
    <Link className='pt-2 px-2 text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold white   hover:text-[#e2b616]'
    href={{
      pathname: `/person`,
      query:  { id: person.id }, // the data
    
    }}
    
    >

    {person['original_name'] ?
     person['original_name'] : 'N/A'}
     
     </Link>
    {person.character ?
        <p className=' text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]   text-gray-300'>{person['character']}</p> 
        :
        <p className='text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]'>N/A</p> 
  }

    
    </div>     
</div>

    
))

}
<div className='flex items-center '>
{credits && credits.cast && credits.cast.length >= 20
?
<Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className='max-w-[8.625rem] min-w-[8.625rem]'>View More ➠</button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/40" />
        <Drawer.Content className="bg-[#141414] z-[99999999] flex flex-col fixed bottom-0 left-0 right-0 max-h-[85vh] rounded-t-[10px]">
        <div className="mx-auto w-12 h-1.5 flex-shrink-0 rounded-full bg-[#3F3F3F] mb-4 mt-2"  />
          <div className="grid grid-cols-[repeat(2,1fr)] tabletcollectionscreen:grid-cols-[repeat(3,1fr)] sm:grid  sm:grid-cols-moreCast mx-auto sm:w-[95%]  px-4 sm:px-0  sm:gap-4  gap-6  overflow-y-scroll py-4 ">
          {credits && credits.cast && credits.cast.slice(15).map((person: MovieCredits) => (
            <div key={person.credit_id} className='bg-[#1a1a1a]  drop-shadow-2xl customized-shadow shadow-sm rounded-md flex flex-col  animate pop max-w-[8.625rem] min-w-[8.625rem]'>
  {person['profile_path'] ?

<div className='max-w-full min-w-full  max-h-[175px] min-h-[175px] flex self-center rounded-t-md overflow-hidden'>
<img  
src={`https://image.tmdb.org/t/p/w138_and_h175_face${person['profile_path']}`}
className='w-full h-full'
srcSet={`https://image.tmdb.org/t/p/w138_and_h175_face${person['profile_path']} 1x,
 https://image.tmdb.org/t/p/w276_and_h350_face${person['profile_path']} 2x`}
loading='lazy'
alt={person['original_name']} />

</div>


    :
    <div className='max-w-full min-w-full  rounded-t-md max-h-[175px] min-h-[175px] flex self-center  overflow-hidden'>
    <Image  
 src={noprofile}
    className='w-full h-full'
    
    loading='lazy'
    alt={person['original_name']} />
    
    </div>
  }

 
    <Link className='pt-2 px-2 text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold white   hover:text-[#e2b616]'
    href={{
      pathname: `/person`,
      query:  { id: person.id }, // the data
    
    }}
    
    >

    {person['original_name'] ?
     person['original_name'] : 'N/A'}
     
     </Link>
    {person.character ?
        <p className=' text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]   text-gray-300'>{person['character']}</p> 
        :
        <p className='text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]'>N/A</p> 
  }

    
    </div>
))

}
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
 

:
''
}
</div>
</div>
:
<p className='animate pop text-center sm:text-left  text-[1.5rem] p-10 sm:pl-16'>N/A</p>
}
</div>
}
</div>


    



    <div >
     
   
      
    <h1 className='px-6 sm:px-10 pt-10 text-[1.2rem] sm:text-2xl font-bold bigscreens:text-center'>Director, Writer & Producer</h1>
    {isPeopleLoading ? 


   <div className='flex flex-row justify-start overflow-x-scroll bigscreens:justify-center items-center   p-6 sm:p-10 gap-10'>

   {Array.from({ length: 5 }).map((_, index) => (
     <PersonLoading key={index} />
   ))}
       
       </div> 
       
    :
    <div className='relative'>
      {credits && credits.crew && credits.crew.length > 0
      ?
    <div className=' flex flex-row overflow-x-scroll bigscreens:justify-center  p-6 sm:p-10 gap-6 '>

{importantCrewMembers && importantCrewMembers.map((person: MovieCredits) => (


<div key={person['credit_id']} className='bg-[#1a1a1a] drop-shadow-2xl customized-shadow shadow-sm rounded-md'> 


<div className='flex flex-col justify-center animate pop max-w-[8.625rem] min-w-[8.625rem]'>
  {person['profile_path'] ?

<div className='max-w-full min-w-full  max-h-[175px] min-h-[175px]  flex self-center rounded-t-md overflow-hidden'>
<img  
src={`https://image.tmdb.org/t/p/w138_and_h175_face${person['profile_path']}`}
className='w-full h-full'
srcSet={`https://image.tmdb.org/t/p/w138_and_h175_face${person['profile_path']} 1x, 
https://image.tmdb.org/t/p/w276_and_h350_face${person['profile_path']} 2x`}
loading='lazy'
alt={person['original_name']} />

</div>


    :
    <div className='max-w-full min-w-full  max-h-[175px] min-h-[175px] flex self-center rounded-t-md overflow-hidden '>
    <Image  
 src={noprofile}
    className='w-full h-full'
    loading='lazy'
    alt={person['original_name']} />
    
    </div>
  }

 
<Link className='pt-2 px-2 text-[0.85rem] sm:text-[0.90rem] 2xl:text-[1rem] font-bold white   hover:text-[#e2b616]'
    href={{
      pathname: `/person`,
      query:  { id: person.id }, // the data
    
    }}
  
    >

    {person['original_name'] ?
     person['original_name'] : 'N/A'}
     
     </Link>
    {person['job'] ?
   
   <p className=' text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem] text-gray-300'>{person['job']}</p> 
        :
        <p className='text-[0.78rem]  px-2 pb-2 sm:text-[0.813rem]'>{person['known_for_department']}</p> 
 }

    
    </div>     
</div>




))

}
</div>
:
<p className='animate pop text-center sm:text-left  text-[1.5rem] p-10 sm:pl-16'>N/A</p>
}
</div>
}
</div>

    </div>
  );
}
export default Crew_Cast;