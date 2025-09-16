import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { faBagShopping, faCheckCircle, faCreditCard, faMoneyBill, faMoneyBillWave, faUtensils } from '@fortawesome/free-solid-svg-icons';

export const ICONS: { [key: string]: IconDefinition } = {
    dineIn: faUtensils,
    takeaway: faBagShopping,
    card: faCreditCard,
    money: faMoneyBillWave,
    complete: faCheckCircle
};

library.add(...Object.values(ICONS));