import React, { Fragment, useState } from "react";
import { useSelector } from "react-redux";
import TextField from "@material-ui/core/TextField";
import SearchIcon from '@material-ui/icons/Search';
import { InputAdornment } from "@material-ui/core";
import Slider from "react-slick";

import { Container,Search, Wrapper, CarouselTitle, Carousel} from "./style";
import logo from '../../assets/logo.svg';
import { Card, RestaurantCard, Map, Modal, Loader, Skeleton, Text} from "../../components";


const Home = ()=> {
    const [inputValue, setInputValue] = useState(' ');
    const [query, setQuery] = useState(null);
    const [placeId, setPlaceId] = useState(null);
    const [open, setOpen] = useState(false);
    const { restaurants, restaurantSelected } = useSelector((state)=> state.restaurants);
    const hasRestaurants = restaurants.length > 0;



    const settings = {
        dots: false,
        infinite: true,
        autoplay: true,
        speed: 300,
        slidesToShow: 4,
        slidesToScroll: 4,
        adaptiveHeight: true
      };

      const renderCarousel = () => {
        if (hasRestaurants) {
          return (
            <Fragment>
                <CarouselTitle> Na sua Área </CarouselTitle>  
                <Slider {...settings}>
                    <Carousel>
                        {restaurants.map((restaurant)=>  
                            <Card 
                                key={restaurant.place_id}
                                photo={restaurant.photos ? restaurant.photos[0].getUrl() : logo} 
                                title={restaurant.name}
                            />)}  
                    </Carousel>
                </Slider> 
            </Fragment>
          );
        }
        return <Loader />;
      };

      const renderRestaurants = () => {
        if (hasRestaurants) {
          return restaurants.map((restaurant) => (
            <RestaurantCard
              key={restaurant.place_id}
              restaurant={restaurant}
              onClick={() => {
                setPlaceId(restaurant.place_id);
                setOpen(true);
              }}
            />
          ));
        }
        return null;
      };

    function handleKeyPress(e){
        if(e.key === 'Enter'){
            setQuery(inputValue);
        }
    }

    return(

        <Wrapper>
             <Container>
                <Search>
                    <div className="card mb-2" style={{width: '18rem'}}>
                        <img src={logo} className="card-img-top" alt="Logo do site de busca"/>
                    </div>
                    <TextField
                            value={inputValue}
                            onKeyDown={handleKeyPress}
                            label="Pesquisar Restaurantes"
                            onChange={(e) => {
                            setInputValue(e.target.value);
                            }}
                            InputProps={{startAdornment:(
                                <InputAdornment position="start">
                                    <SearchIcon/>
                                </InputAdornment>
                            )}}
                        
                    />
                </Search>
                {renderCarousel()}
                {renderRestaurants()}
            </Container>
            <Map query={query} placeId={placeId}/>
            <Modal open={open} onClose={()=> setOpen(false)}>
                {restaurantSelected ? (
                
                <>
                <Text size="large">{restaurantSelected?.name}</Text>
                <Text size="medium">{restaurantSelected?.formatted_phone_number}</Text>
                <Text size="medium">{restaurantSelected?.formatted_address}</Text>
                <Text size="medium">
                  {restaurantSelected?.opening_hours?.open_now
                    ? 'Aberto agora :)'
                    : 'Fechado neste momento :('}
                </Text>
              </>
                   
                ): (
                    <Fragment>
                        <Skeleton width="10px" height="10px"/>
                        <Skeleton width="10px" height="10px"/>
                        <Skeleton width="10px" height="10px"/>
                        <Skeleton width="10px" height="10px"/>
                    </Fragment>
                )}
            
           </Modal> 
        </Wrapper>
      
    );
   
};
export default Home;