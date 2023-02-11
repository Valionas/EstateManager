import Rent from './Rent';
import RentReview from './RentReview';

interface ReduxRentState {
  isOpenedRentModal: boolean;
  isOpenedRequestRentModal: boolean;
  isOpenedReviewRentModal: boolean;
  currentRent?: Rent;
  currentRentReview?: RentReview;
  currentRentRequest?: any;
  triggeredUpdate: boolean;
}
export default ReduxRentState;
