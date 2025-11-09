import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import {
  faBagShopping,
  faCartShopping,
  faCheckCircle,
  faCreditCard,
  faMoneyBill,
  faMoneyBillWave,
  faPen,
  faTimes,
  faTrash,
  faUtensils,
  faArrowRight,
  faUserGroup,
} from '@fortawesome/free-solid-svg-icons';

export const ICONS: { [key: string]: IconDefinition } = {
  dineIn: faUtensils,
  takeaway: faBagShopping,
  card: faCreditCard,
  money: faMoneyBillWave,
  complete: faCheckCircle,
  cart: faCartShopping,
  cross: faTimes,
  trash: faTrash,
  edit: faPen,
  arrowRight: faArrowRight,
  group: faUserGroup,
};

library.add(...Object.values(ICONS));
