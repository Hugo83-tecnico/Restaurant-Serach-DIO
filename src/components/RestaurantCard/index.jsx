import React, { useState } from "react";
import { Restaurant, RestaurantInfo, Title, Address, RestaurantPhoto } from "./style";
import ReactStars from "react-rating-stars-component";

import restauranteFoto from '../../assets/logo.svg';
import Skeleton from "../Skeleton";

const RestaurantCard =({ restaurant,onClick })=> {

    const [imageLoaded, setImageLoaded] = useState(false);


    return(
        <Restaurant onClick={onClick}>
            <RestaurantInfo>
                <Title>{restaurant.name}</Title>
                <ReactStars
                    count={5}
                    isHalf
                    size={24}
                    edit={false}
                    value={restaurant.rating}
                    activeColor="#e7711c"
                />
                <Address>{restaurant.vicinity || restaurant.formatted_address}</Address>
            </RestaurantInfo>
            <RestaurantPhoto 
                imageLoaded={imageLoaded}
                src={restaurant.photos ? restaurant.photos[0].getUrl() : restauranteFoto} 
                alt="Foto do resturante"
                onLoad={()=> setImageLoaded(true)}

            />
            {!imageLoaded && <Skeleton width="100px" height="100px"/>}
                
        </Restaurant>
    )
    
}


export default RestaurantCard;