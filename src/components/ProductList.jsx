import { ProductListItem } from './ProductListItem';
import { Card } from './ui/Card';
import './ProductList.css';

export const ProductList = ({ products, onSelect }) =>
  products &&
  products.length > 0 && (
    <Card className='product-list'>
      <ul>
        {products.slice(0, 10).map(product => (
          <ProductListItem
            key={product.id}
            id={product.id}
            name={product.name}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </Card>
  );
