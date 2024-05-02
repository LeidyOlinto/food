import { Prisma } from "@prisma/client";
import Image from "next/image";
import { calculateProductTotalPrice, formatCurrency } from "../_helpers/price";
import { ArrowDownIcon } from "lucide-react";

interface ProductItemProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: {
        select: {
          name: true,
        },
      },
    },
  }>
};

const ProductItem = ({ product }: ProductItemProps) => {

  return (
    <div className=" w-[150px] min-w-[150px] space-y2">
      <div className="relative h-[150px] w-full ">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="rounded-lg object-cover shandow-md"
        />
        {product.discountPercentage && (
          <div className="absolute gap-[2px] left-2 top-2 bg-primary px-2 py-[2px] rounded-full text-white flex items-center">
            <ArrowDownIcon size={12} />
            <span className="text-xs font-semibold">{product.discountPercentage}%</span>
          </div>
        )}
      </div>
      <div>
        <h2 className="truncate text-sm">{product.name}</h2>
        <div className="font-semibold flex items-center gap-1">
          <h3>{formatCurrency(calculateProductTotalPrice(product))}
          </h3>
          {product.discountPercentage > 0 && (
            <span className="text-xs text-[#7E8392] line-through ">
              {formatCurrency(Number(product.price))}
            </span>
          )};
        </div>
        <span className="text-muted-foreground text-xs block">{product.restaurant.name}</span>
      </div>
    </div>
  );
}

export default ProductItem;