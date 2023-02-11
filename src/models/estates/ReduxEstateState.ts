import Estate from './Estate';

interface ReduxEstateState {
  isOpenedEstateModal: boolean;
  isOpenedApplyForEstateModal: boolean;
  currentEstate?: Estate;
  currentEstateApplication: any;
  triggeredUpdate: boolean;
}

export default ReduxEstateState;
