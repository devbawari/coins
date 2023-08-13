import { React, useEffect } from 'react'
import axios, { Axios } from "axios";
import { server } from '../index.js';
import { Container, HStack, VStack,Image, Heading,Text  } from '@chakra-ui/react';
import { useState } from 'react';
import Error from './Error.jsx';
import Loader from './Loader.jsx';
const Exchanges = () => {
    const [exchanges, setexchanges] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    useEffect(() => {
        const fetchexchanges = async () => {
          try {  const { data } = await axios.get(`${server}/exchanges`)
          setexchanges(data);
          setloading(false);
      }
           
          catch (error) {
            seterror(true)
            setloading(false)
          }
        
        }
        fetchexchanges()}
        , []);
     if(error) return <Error message={"error while fetching "}/>
    return (
        <Container maxW={'container.xl'}>
            {
                loading ? <Loader /> : (<>
                    <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                        {
                            exchanges.map((i) =>
                            ( 
                                <Exchangecard name={i.name} img={i.image} rank={i.trust_score_rank} url={i.url} key={i.id}/>
                            ))
                        }
                    </HStack>
                </>)
            }
        </Container>
    )
}



const Exchangecard=({ name, img, rank, url})=>
(
    <a href={url} target='blank'>
    <VStack w={"52"} shadow={'lg'} p={'8'} borderRadius={'lg'} transform={'all 0.5s linear'} m={'4'} css={{
        "&:hover":{
            transform:"scale(1.1)"
        }
    }}>
        <Image src={img} w={'10'} h={'10'} objectFit={'contain'} />
        <Heading size={'md'} noOfLines={1}>{rank}</Heading>
        <Text>{name}</Text>
    </VStack>
    
</a>
)
export default Exchanges
    
