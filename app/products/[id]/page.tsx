
import { db } from "@/app/_lib/prisma";
import { notFound } from "next/navigation";
import ProductImage from "./_components/product-image";
import ProductDetails from "@/app/_components/product-details";


interface ProductPageProps {
  params: {
    id: string;
  },
}
const ProductPage = async ({ params: { id } }: ProductPageProps) => {
  const product = await db.product.findUnique({
    where: {
      id,
    },
    include: {
      restaurant: true,
    }
  });
const juices = await db.product.findMany({
  where:{
    category:{
      name: 'Sucos'
    },
  },
  include:{
    restaurant:true,
  },
});
  if (!product) {
    return notFound();
  }

  return (
    <div>
      <ProductImage product={product} />
      {/* TITULO E PRECO */}
      <ProductDetails product={product} complentaryProducts={juices} />
    </div>

  );
}

export default ProductPage;