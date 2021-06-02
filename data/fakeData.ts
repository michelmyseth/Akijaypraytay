import { Users } from "./types/users";

export const fakeUser: Users[] = [
  {
    _id: 1,
    profile: {
      username: "John",
      mail: "john@mail.com",
      contacts: ["jane@mail.com"],
      objects: [
        {
          name: "Fondation",
          description: "By I. Asimov",
          picture: "url",
        },
        {
          name: "Pen",
          description: "My favorite pen",
          picture: "url2",
        },
        {
          name: "T-shirt",
          description: "A blue t-shirt",
          picture: "url",
        },
        {
          name: "Mouse",
          description: "Wireless computer mouse",
          picture: "url",
        },
        {
          name: "Car",
          description: "My suppa car",
          picture: "url",
        },
      ],
    },
    exchange: [
      {
        _id: 1,
        object: {
          name: "Fondation",
          description: "By I. Asimov",
          picture: "url",
        },
        lender: "john@mail.coml",
        borrower: "jane@mail.com",
        creation_date: new Date("June 01, 2021"),
        return_date: new Date("July 01, 2021"),
        status: "Wainting",
      },
      {
        _id: 2,
        object: {
          name: "Pen",
          description: "My favorite pen",
          picture: "url2",
        },
        lender: "jane@mail.coml",
        borrower: "john@mail.com",
        creation_date: new Date("June 01, 2021"),
        return_date: new Date("July 01, 2021"),
        status: "Pending",
      },
      {
        _id: 3,
        object: {
          name: "T-shirt",
          description: "A blue t-shirt",
          picture: "url",
        },
        lender: "john@mail.coml",
        borrower: "jane@mail.com",
        creation_date: new Date("May 01, 2021"),
        return_date: new Date("May 31, 2021"),
        status: "Returned",
      },
      {
        _id: 4,
        object: {
          name: "Mouse",
          description: "Wireless computer mouse",
          picture: "url",
        },
        lender: "john@mail.coml",
        borrower: "jane@mail.com",
        creation_date: new Date("March 01, 2021"),
        return_date: new Date("May 10, 2021"),
        status: "Not Returned",
      },
      {
        _id: 5,
        object: {
          name: "Car",
          description: "My suppa car",
          picture: "url",
        },
        lender: "john@mail.coml",
        borrower: "jane@mail.com",
        creation_date: new Date("March 01, 2021"),
        return_date: new Date("May 10, 2021"),
        status: "Abort",
      },
    ],
  },
];
