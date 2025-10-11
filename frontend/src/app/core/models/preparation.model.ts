export type Preparation = {
  _id: string;
  tableNumber: number;
  shouldBeReadyAt: string;
  completedAt: string;
  takenForServiceAt: string;
  preparedItems: [
    {
      _id: string;
      shortName: string;
      shouldStartAt: string;
      startedAt: string;
      finishedAt: string;
    },
  ];
};

export type PreparationCreation = {
  tableNumber: number;
  itemsToBeCooked: [
    {
      menuItemShortName: string;
      howMany: number;
    },
  ];
};
