import React from "react"
import { Container, HStack, VStack,Image, Heading,Text  } from '@chakra-ui/react';
import { Link } from "react-router-dom"

const Coincard=({id,name, img,symbol, price,currencysymbol='₹'})=>
(
    <Link to={`/coins/${id}`} target='blank'>
    <VStack w={"52"} shadow={'lg'} p={'8'} borderRadius={'lg'} transform={'all 0.5s linear'} m={'4'} css={{
        "&:hover":{
            transform:"scale(1.1)"
        }
    }}>
        <Image src={img} w={'10'} h={'10'} objectFit={'contain'} />
        <Heading size={'md'} noOfLines={1}>{symbol }</Heading>
        <Text noOfLines={1}>{name}</Text>
        <Text noOfLines={1}>{price?`${currencysymbol}${price}`:"NA"}</Text>
    </VStack>
    
</Link>
)
export default Coincard