import { formatCurrency } from '../lib/utils';
import { Badge } from './ui/Badge';
import { Card } from './ui/Card';
import { Rating } from './ui/Rating';
import './ProductDetails.css';

export const ProductDetails = ({ product }) => (
  <Card as='article' className='product-details'>
    <Card.Header>
      {product.brand && <Badge>{product.brand}</Badge>}
      <Card.Title as='h2'>{product.name}</Card.Title>
      {product.rating != null && <Rating value={product.rating} />}
    </Card.Header>

    <Card.Content>
      <p>{product.description}</p>

      <div className='product-details-summary'>
        <p className='text-2xl font-semibold'>
          <span className='sr-only'>Price: </span>
          {formatCurrency(product.price)}
        </p>

        <div className='product-details-features'>
          {product.connectivity && <Badge>{product.connectivity}</Badge>}
          {product.color && <Badge>Color: {product.color}</Badge>}
          {product.wireless && <Badge>Wireless</Badge>}
        </div>
      </div>
    </Card.Content>
  </Card>
);
