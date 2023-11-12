import React from 'react'
import Skeleton from '@mui/material/Skeleton';
import Stack from '@mui/material/Stack';


export function SkeletonMenu() {
  return (
    <Stack spacing={2} className="card-skeleton" sx={{width: '220px', margin: '5px 10px'}}>
        <Skeleton variant="rectangular" width={220} height={30}/>
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
        <Skeleton variant="text" sx={{ fontSize: '1.5rem'}} />
    </Stack>
  )
}

export function SkeletonCards(){
    const cards = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16]
    return(
        <>
        {
            cards.map(() => {
                return(
                    <Stack spacing={2} className="card-skeleton" sx={{width: '210px', margin: '5px 10px'}}>
                        <Skeleton variant="rectangular" width={210} height={210}/>
                        <Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: '10px' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: '10px' }} />
                        <Skeleton variant="text" sx={{ fontSize: '1rem', lineHeight: '10px' }} />
                        <Skeleton variant="rectangular" width={210} height={50} />
                    </Stack>
                )
            })
        }
        </>
    )
}
