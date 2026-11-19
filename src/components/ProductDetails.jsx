import { Card } from './ui/Card';
import './ProductDetails.css';

export const ProductDetails = ({ product }) => (
  <Card as='article' className='product-details'>
    <Card.Header>
      <Card.Title as='h2'>{product.name}</Card.Title>
    </Card.Header>

    <Card.Content>
      <p>{product.description}</p>
      <p>Brand: {product.brand}</p>
      <p>Price: {product.price}</p>
      <p>Rating: {product.rating}</p>
    </Card.Content>
  </Card>
);
