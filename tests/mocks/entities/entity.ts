export const entity = {
  name: "BMW",
  userId: "abc123",
  country: {
    countryCode: "de",
    countryName: "Germany",
  },
  contacts: [
    {
      contactType: "email",
      contactHandle: "test@test.com",
    },
  ],
};

export const getEntities = [
  {
    contacts: [
      {
        contactType: "email",
        email: "test@test.com",
      },
    ],
    userId: "abc123",
    updatedAt: "2020-04-25T13:27:07.621Z",
    entityId: "66bfef74-a64a-4681-9328-410752338a0e",
    createdAt: "2020-04-25T13:27:07.621Z",
    country: {
      countryCode: "de",
      countryName: "Germany",
    },
    name: "BMW",
  },
];

export const getEntity = {
  contacts: [
    {
      contactType: "email",
      contactHandle: "test@test.com",
    },
  ],
  userId: "abc123",
  updatedAt: "2020-04-25T13:27:07.621Z",
  entityId: "66bfef74-a64a-4681-9328-410752338a0e",
  createdAt: "2020-04-25T13:27:07.621Z",
  country: {
    countryCode: "de",
    countryName: "Germany",
  },
  name: "BMW",
};

export const updateEntity = {
  name: "BMW_ZA",
  country: {
    countryCode: "za",
    countryName: "South Africa",
  },
  contacts: [
    {
      contactType: "email",
      contactHandle: "updated@test.com",
    },
  ],
};
