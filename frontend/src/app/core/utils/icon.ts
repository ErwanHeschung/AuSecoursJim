import { IconDefinition, library } from '@fortawesome/fontawesome-svg-core';
import { faBagShopping, faUtensils } from '@fortawesome/free-solid-svg-icons';

export const ICONS: { [key: string]: IconDefinition } = {
    dineIn: faUtensils,
    takeaway: faBagShopping,
};

library.add(...Object.values(ICONS));