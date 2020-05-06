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
    {
      contactType: "telephone",
      contactHandle: "+27 123 456 789"
    },
  ],
  location: {
    lat: 48.198921,
    lng: 11.601885,
  }
};

export const getEntities = [
  {
    contacts: [
      {
        contactType: "email",
        contactHandle: "test@test.com",
      }
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
    location: {
      lat: 48.198921,
      lng: 11.601885,
    },
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
  location: {
    lat: 48.198921,
    lng: 11.601885,
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
