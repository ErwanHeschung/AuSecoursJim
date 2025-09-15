import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { faBagShopping, faCreditCard, faMoneyBill, faMoneyBillWave, faUtensils } from '@fortawesome/free-solid-svg-icons';

export const ICONS: { [key: string]: IconDefinition } = {
    dineIn: faUtensils,
    takeaway: faBagShopping,
    card: faCreditCard,
    money: faMoneyBillWave
};

library.add(...Object.values(ICONS));