import { motion } from "framer-motion";
import { Card } from "../../../../components/ui/card";
import type { ProfileLikedProductsGridProps } from "./likedProducts.types";
import { getProductAlt } from "./likedProducts.utils";

export function ProfileLikedProductsGrid({ products }: ProfileLikedProductsGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map((product, index) => (
        <motion.div
          key={product.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: index * 0.05 }}
        >
          <Card className="group cursor-pointer overflow-hidden border-2 transition-all duration-300 hover:shadow-2xl bg-card border-border">
            <div className="relative overflow-hidden aspect-square">
              <motion.img
                src={product.image}
                alt={getProductAlt(product.name)}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
            <div className="p-4">
              <h3 className="text-sm mb-1 transition-colors duration-300 text-primary">
                {product.name}
              </h3>
              <p className="transition-colors duration-300 text-muted-foreground">
                {product.price}
              </p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}