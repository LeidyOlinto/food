"use client"
import Image from "next/image";
import DiscountBadge from "./discount-badge";
import { Prisma, Restaurant } from '@prisma/client';
import { calculateProductTotalPrice, formatCurrency } from '../_helpers/price';
import { Button } from "./ui/button";
import { BikeIcon, ChevronLeftIcon, ChevronRightIcon, Currency, TimerIcon } from "lucide-react";
import { useState } from "react";
import { Card } from "./ui/card";
import ResolvingViewport from 'next/dist/lib/metadata/types/metadata-interface.js';
import { format } from "path";
import ProductList from "./product-list";

interface ProductDetailsProps {
  product: Prisma.ProductGetPayload<{
    include: {
      restaurant: true,
    };
  }>;
  complentaryProducts: Prisma.ProductGetPayload<{
    include: {
      restaurant: true;
    }
  }>[];
}
const ProductDetails = ({ product, complentaryProducts }: ProductDetailsProps) => {
  const [quanty, setQuanty] = useState(1);

  const handleIcreaseQuantityClick = () =>
    setQuanty((CurrentState) => CurrentState + 1);
  const handleDecreaseQuantityClick = () =>
    setQuanty((currentState) => {
      if (currentState === 1) return 1;
      return currentState - 1;
    })
  return (
    <div className="py-5">
      {/* RESTAURANTE */}
      <div className="flex items-center gap-[0.375rem] px-5">
        <div className="relative h-6 w-6">
          <Image
            src={product.restaurant.imageUrl}
            alt={product.restaurant.name}
            fill
            className="rounded-full object-cover"
          />
        </div>
        <span className="text-xs text-muted-foreground">
          {product.restaurant.name}
        </span>
      </div>
      {/* NOME DO PRODUTO */}
      <h1 className="mb-2 mt-1 text-xl font-semibold px-5">{product.name}</h1>
      {/* PRECO DO PRODUTO E QUANTIDADE */}
      <div className="flex justify-between px-5">
        {/* PREÇO DESCONTO*/}
        <div >
          <div className="flex items-center gap-2">
            <h2 className="test-xl font-semibold">
              {formatCurrency(calculateProductTotalPrice(product))}
            </h2>
            {product.discountPercentage > 0 && (
              <DiscountBadge product={product}
              />
            )}
          </div>
          {/* PREÇO ORIGINAL */}
          {product.discountPercentage > 0 && (
            <p className="text-sm text-muted-foreground">
              De: {formatCurrency(Number(product.price))}
            </p>
          )}
        </div>

        {/*QUANTIDADE */}
        <div className="flex items-center gap-3 text-center ">
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleDecreaseQuantityClick}
          >
            <ChevronLeftIcon />
          </Button>
          <span className="w-4">{quanty}</span>
          <Button
            size="icon"
            variant="ghost"
            className="border border-solid border-muted-foreground"
            onClick={handleIcreaseQuantityClick}
          >
            <ChevronRightIcon />
          </Button>

        </div>
      </div>
      {/* DADOS DA ENTREGA */}
      <div className="px-5">
        <Card className="flex justify-around py-3 mt-6 ">

          <div className="flex flex-col items-center">
            {/* CUSTO */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega
              </span>
              <BikeIcon size={14} />
            </div>
            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="test-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="test-sm font-semibold">Grátis</p>
            )}
          </div>

          {/* TEMPO */}
          <div className="flex flex-col items-center">
            {/* CUSTO */}
            <div className="flex items-center gap-1 text-muted-foreground">
              <span className="text-xs">Entrega
              </span>
              <TimerIcon size={14} />
            </div>
            {Number(product.restaurant.deliveryFee) > 0 ? (
              <p className="test-xs font-semibold">
                {formatCurrency(Number(product.restaurant.deliveryFee))}
              </p>
            ) : (
              <p className="test-sm font-semibold">Grátis</p>
            )}
          </div>
        </Card>
      </div>
      <div className="mt-6 space-y-3 px-5 ">
        <h3 className="font-semibold">Sobre </h3>
        <p className="test-sm text-muted-foreground">
          {product.description}
        </p>
      </div>
      <div className="mt-6 space-y-3 px-5">
        <h3 className="font-semibold">Sucos </h3>
        <ProductList products={complentaryProducts} />
      </div>
    </div>
  );
}

export default ProductDetails;