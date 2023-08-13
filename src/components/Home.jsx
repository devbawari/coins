import { Box,Image ,Text} from '@chakra-ui/react'
import React from 'react'
import btnsrc from "../assets/btc.png"
import Footer from './Footer'
import {motion} from "framer-motion"
const Home = () => {
  return (
   <Box bgColor={'blackAlpha.900'} w={'full'} h={'85vh'}>
    <motion.div style={{
      height:"80vh"
    }}
      animate={{
        translateY:"25px",
      }} 
      transition={{
duration:2,
repeat:Infinity,
repeatType:"reverse",
      }}>
    <Image w={'full'} h={'full'} objectFit={'contain'} src={btnsrc} filter={"grayscale(1)"}/>
    </motion.div>
    <Text fontSize={'6xl'} textAlign={'center'} fontWeight={'thin'} color={'whiteAlpha.700'} mt={'-20'}>Xcrypto</Text>
   </Box>
  )
}

export default Home