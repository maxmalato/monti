export interface Product {
  id: number;
  thumbnail: string;
  title: string;
  description: string;
  category: string;
  price: number;
  stock: number;
reviews?: Array<{
    id: number
    rating: number,
    comment: string,
    date: string,
    reviewerName: string,
    reviewerEmail: string
}>;
}
