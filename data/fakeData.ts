import { Users } from "./types/users";

export const fakeUser: Users[] = [
  {
    _id: 1,
    profile: {
      username: "John",
      mail: "john@mail.com",
      phone: 1000000000,
      adress: "Place saint hubert",
      contacts: ["jane@mail.com"],
      ownedItems: [
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
      token: "",
    },
    exchange: [
      {
        _id: 1,
        uuid: "",
        item: {
          name: "Fondation",
          description: "By I. Asimov",
          picture: "url",
        },
        loaner: "john@mail.coml",
        borrower: "jane@mail.com",
        creation_date: "Tue Jun 01 2021",
        return_date: "Wed Jun 02 2021",
        status: "Waiting",
      },
      {
        _id: 2,
        uuid: "",
        item: {
          name: "Pen",
          description: "My favorite pen",
          picture: "url2",
        },
        loaner: "jane@mail.coml",
        borrower: "john@mail.com",
        creation_date: "Tue Jun 01 2021",
        return_date: "Wed Jun 02 2021",
        status: "Pending",
      },
      {
        _id: 3,
        uuid: "",
        item: {
          name: "T-shirt",
          description: "A blue t-shirt",
          picture: "url",
        },
        loaner: "john@mail.coml",
        borrower: "jane@mail.com",
        creation_date: "Tue Jun 01 2021",
        return_date: "Wed Jun 02 2021",
        status: "Returned",
      },
      {
        _id: 4,
        uuid: "",
        item: {
          name: "Mouse",
          description: "Wireless computer mouse",
          picture: "url",
        },
        loaner: "john@mail.coml",
        borrower: "jane@mail.com",
        creation_date: "Tue Jun 01 2021",
        return_date: "Wed Jun 02 2021",
        status: "Not Returned",
      },
      {
        _id: 5,
        uuid: "",
        item: {
          name: "Car",
          description: "My suppa car",
          picture: "url",
        },
        loaner: "john@mail.coml",
        borrower: "jane@mail.com",
        creation_date: "Tue Jun 01 2021",
        return_date: "Wed Jun 02 2021",
        status: "Abort",
      },
    ],
  },
];
