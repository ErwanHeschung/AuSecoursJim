import { OnApplicationBootstrap } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Group } from 'src/groups/schemas/group.schema';

export class StartupLogicService implements OnApplicationBootstrap {
  constructor(@InjectConnection() private connection: Connection) {}

  createGroup(groupId: number, members: number, menuItemfullNames: string[]): Group {
    const group: Group = new Group();
    group.groupId = groupId;
    group.members = members;
    group.menuItemFullNames = menuItemfullNames;
    return group;
  }

  async addGroup(groupId: number, members: number, menuItemfullNames: string[]) {
    const groupModel = this.connection.models['Group'];

    const alreadyExists = await groupModel.find({ groupId });
    if (alreadyExists.length > 0) {
      throw new Error('Group already exists.');
    }

    return groupModel.create(this.createGroup(groupId, members, menuItemfullNames));
  }

  async onApplicationBootstrap() {
  try {
    // === 0. Menu Gourmet ===
    await this.addGroup(0, 2, [
      // STARTERS
      "Homemade foie gras terrine",
      "Soft-boiled egg breaded with breadcrumbs and nuts",
      // MAINS
      "Beef chuck cooked 48 hours at low temperature",
      "Homemade beef burger",
      // DESSERTS
      "Brownie (home made)",
      "Valrhona chocolate declination with salted chocolate ice cream",
      // BEVERAGES
      "Bottled coke (33cl)",
      "Café",
    ]);

    // === 1. Menu Méditerranéen ===
    await this.addGroup(1, 25, [
      // STARTERS
      "Homemade dill salmon gravlax",
      "Crab maki with fresh mango",
      "Burrata Mozzarella",
      // MAINS
      "Half cooked tuna and octopus grilled on the plancha",
      "Delicious Pizza Regina",
      // DESSERTS
      "Fresh raspberries and peaches",
      "Dessert of fresh strawberries and vanilla mascarpone mousse",
      // BEVERAGES
      "Mojito",
      "Sparkling water",
    ]);

    // === 2. Menu Italien ===
    await this.addGroup(2, 36, [
      // STARTERS
      "Goat cheese foom from \"Valbonne goat farm\"",
      "Burrata Mozzarella",
      // MAINS
      "Lasagna al forno",
      "Delicious Pizza Regina",
      // DESSERTS
      "Speculoos tiramisu",
      "Marmalade of Menton's lemon - Lemon cream - Limoncello jelly and sorbet - Homemade meringue",
      // BEVERAGES
      "Martini",
      "Spritz",
    ]);

    // === 3. Menu Classique ===
    await this.addGroup(3, 10, [
      // STARTERS
      "Homemade foie gras terrine",
      "Goat cheese foom from \"Valbonne goat farm\"",
      // MAINS
      "Homemade beef burger",
      "Lasagna al forno",
      // DESSERTS
      "Brownie (home made)",
      "Speculoos tiramisu",
      // BEVERAGES
      "Ice Tea (33cl)",
      "Bottled water",
      "Café",
    ]);

    // === 4. Menu Fraîcheur ===
    await this.addGroup(4, 16, [
      // STARTERS
      "Crab maki with fresh mango",
      "Burrata Mozzarella",
      "Homemade dill salmon gravlax",
      // MAINS
      "Half cooked tuna and octopus grilled on the plancha",
      "Beef chuck cooked 48 hours at low temperature",
      // DESSERTS
      "Fresh seasonal fruit",
      "Fresh raspberries and peaches",
      "Dessert of fresh strawberries and vanilla mascarpone mousse",
      // BEVERAGES
      "Lemonade",
      "Apple juice",
      "Sparkling water",
    ]);
  } 
  catch (exception) {}
}

}
