import { db } from "../_lib/prisma";
import RestaurantItem from "./restaurant-item";

const RestaurantList =async () => {
  //PEgar todos os restarantes com o maior numeros de pedidos
  const restaurants = await db.restaurant.findMany({take:10})
  return (
    <div className="flex gap-4 px-5 overflow-x-scroll [&::-webkit-scrollbar]:hidden">
      {restaurants.map((restaurant) => (
        <RestaurantItem
          key={restaurant.id}
          restaurant={restaurant}
        />
      ))}
      
    </div>
    
  );
}
 
export default RestaurantList;