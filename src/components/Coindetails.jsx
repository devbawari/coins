import { Box, Container,HStack,RadioGroup,Radio, VStack,Text,Image, Stat, StatLabel, StatNumber, StatHelpText, StatArrow, Badge, Progress, Button} from '@chakra-ui/react'
import React,{useState,useEffect} from 'react'
import Loader from './Loader';
import Chart from './Chart';
import axios from 'axios';
import { server } from '../index.js';
import { useParams } from 'react-router-dom';
import Error from './Error';
import { progress } from 'framer-motion';
const Coindetails = () => {
    const [coins, setcoins] = useState([]);
    const [loading, setloading] = useState(true);
    const [error, seterror] = useState(false);
    const [days, setdays] = useState("24h");
    const [chartarray, setchartarray] = useState([]);
    const[currency,setcurrency]=useState("inr");
    const currencysymbol=currency==="inr"?"₹":currency==="eur"?"€":"$";
    const btns=["24h","7d","14d","30d","60d","200d","365d","max"]
const params=useParams();
const switchChartStats=(key)=>
{
switch (key) {
    case "24h":
        setdays("24h");
        setloading(true);
        break;
        case "7d":
            setdays("7d");
            setloading(true);
            break;
            case "14d":
                setdays("14d");
                setloading(true);
                break;
                case "30d":
                    setdays("30d");
                    setloading(true);
                    break;
                    case "60d":
                        setdays("60d");
                        setloading(true);
                        break;
                        case "200d":
                            setdays("200d");
                            setloading(true);
                            break;
                            case "365d":
                                setdays("365d");
                                setloading(true);
                                break;
                                case "max":
                                    setdays("max");
                                    setloading(true);
                                    break;
    default:
        case "24d":
            setdays("24d");
            setloading(true);
            break;
        break;
}
}
    useEffect(() => {
        const fetchcoin = async () => {
          try {  const { data } = await axios.get(`${server}/coins/${params.id}`)
          const {data:chartdata} = await axios.get(`${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`)
          setcoins(data);  
          setchartarray(chartdata.prices);
          console.log(data); 
          setloading(false);
      }
           
          catch (error) {
            seterror(true)
            setloading(false)
          }
        
        }
        fetchcoin()}
        , [params.id,currency,days]);
        if(error) return <Error message={"error while fetching coin details"}/>
  return (
<Container maxW={'container.xl'}>
{
loading?(<Loader/>):(
<>
<Box borderWidth={1} w={'full'}><Chart arr={chartarray} currency={currency} days={days}/></Box>

<HStack spacing={'4'} overflowX={'auto'}>
   {
    btns.map((i)=>
    (  
<Button key={i} onClick={()=>
switchChartStats(i) }>{i}</Button>

    ))
   }
</HStack>
<RadioGroup value={currency} onChange={setcurrency}>
    <Radio value={'inr'} >INR</Radio>   
    <Radio value={'eur'} >EUR</Radio>    
     <Radio value={'usd'} >USD</Radio>
                </RadioGroup>
                <VStack spacing={'4'} p='16' alignItems={'flex-start'}>
                    <Text fontSize={'small'} alignSelf={'center'} opacity={'0.7'}>Last Update on {Date(coins.market_data.last_updated).split("G")[0]}</Text>
                    <Image src={coins.image.large} w={'16'} h={'16'} objectFit={'contain'}/>
                    <Stat>
                   <StatLabel>{coins.name}</StatLabel>
                   <StatNumber>{currencysymbol}{coins.market_data.current_price[currency]}</StatNumber>
                   <StatHelpText>
                    <StatArrow type={coins.market_data.price_change_percentage_24h<0?"decrease":"increase"}/>{coins.market_data.price_change_percentage_24h}%
                   </StatHelpText>

                    </Stat>
                    <Badge fontSize={'2xl'} bg={'blackAlpha.800'} color={'white'}>
                        {`#${coins.market_cap_rank}`}
                    </Badge>
                    <CustomBar high={`${currencysymbol}${coins.market_data.high_24h[currency]}`} low={`${currencysymbol}${coins.market_data.low_24h[currency]}`}/>
                <Box w={'full'} p={'4'}>
                    <Item title={"Max supply"} value={coins.market_data.max_supply}/> 
                     <Item title={"Circulating supply"} value={coins.market_data.circulating_supply}/>
                     <Item title={"Market Cap"} value={`${currencysymbol}${coins.market_data.market_cap[currency]}`}/>
                     <Item title={"All Time High "} value={`${currencysymbol}${coins.market_data.ath[currency]}`}/>
                     <Item title={"All Time Low"} value={`${currencysymbol}${coins.market_data.atl[currency]}`}/>
                </Box>
                </VStack>
</>
)
}
</Container>
  )
}

const CustomBar=({high,low})=>
(
    <VStack w={'full'}>
    <Progress value={50} colorScheme={'teal'} w={'full'} />
    <HStack justifyContent={'space-between'} w={'full'}>
        <Badge children={low} colorScheme={'red'}/>
        <Text  fontSize={'small'}>24H RANGE</Text>
        <Badge children={high} colorScheme={'green'}/>
    </HStack>
    </VStack >
)
const Item=({title,value})=>
(
<HStack justifyContent={"space-between"} w={'full'} my={"4"}> 
<Text fontFamily={'Bebas Neue'} letterSpacing={'widest'}>{title}</Text>
<Text>{value}</Text>
</HStack>
)



export default Coindetails

