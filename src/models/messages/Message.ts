interface Message {
  id?: string;
  image: string;
  location: string;
  message: string;
  name: string;
  receiver: string;
  relatedObjectId?: string;
  relatedOfferId?: string;
  rent?: number;
  price?: number;
  sender: string;
  status: string;
  date: string;
  type: 'rent' | 'estate';
}

export default Message;
