import { React, useEffect } from 'react'
import axios, { Axios } from "axios";
import { server } from '../index.js';
import { Container, HStack, VStack,Image, Heading,Text, Button, RadioGroup, Radio } from '@chakra-ui/react';
import { useState } from 'react';
import Error from './Error.jsx';
import Loader from './Loader.jsx';
import Coincard from './Coincard.jsx';
const Coin = () => {
    const [coins, setcoins] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    const [page,setpage]=useState(1);
    const[currency,setcurrency]=useState("inr");
    const currencysymbol=currency==="inr"?"₹":currency==="eur"?"€":"$";
    const changepage=(page)=>
{

    setpage(page);
    setloading(true);
}

const btns=new Array(132).fill(1);
    useEffect(() => {
        const fetchcoins = async () => {
          try {  const { data } = await axios.get(`${server}/coins/markets?vs_currency=${currency}&page=${page}`)
          setcoins(data);
          setloading(false);
      }
           
          catch (error) {
            seterror(true)
            setloading(false)
          }
        
        }
        fetchcoins()}
        , [currency,page]);
     if(error) return <Error message={"error while fetching coins"}/>
    return (
        <Container maxW={'container.xl'}>
            {
                loading ? <Loader /> : (<>
                <RadioGroup value={currency} onChange={setcurrency}>
<HStack spacing={'4'}>
    <Radio value={'inr'} >INR</Radio>   
    <Radio value={'eur'} >EUR</Radio>    
     <Radio value={'usd'} >USD</Radio>
</HStack>
                  

                </RadioGroup>
                    <HStack wrap={'wrap'} justifyContent={'space-evenly'}>
                        {
                            coins.map((i) =>
                            ( 
                                <Coincard  currencysymbol={ currencysymbol} symbol={i.symbol} id={i.id} price={i.current_price} name={i.name} img={i.image}  key={i.id}/>
                            ))
                        }
                    </HStack>
                </>)
            }
            <HStack w={'full'} overflowX={'auto'} p={'8'}> 
                {
            btns.map((item,index)=>
            
            (

                <Button key={'index'} bgColor={"blackAlpha.900"} w={'10'} variant={'solid'} color={'white'} onClick={()=>changepage(index+1)}>{index+1}</Button>
            ))

                }
            </HStack>
        </Container>
    )
}

export default Coin
    
