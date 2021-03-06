export type Profile = {
  username: string;
  mail: string;
  phone: number;
  adress: string;
  contacts: string[];
  ownedItems: Object[];
  token: string;
};

export type Exchange = {
  _id: any;
  uuid: string;
  item: Object;
  loaner: string;
  borrower: string;
  creation_date: string;
  return_date: string;
  status: string;
};

export type Object = {
  name: string;
  description: string;
  category: string;
};

export type Users = {
  _id: any;
  profile: Profile;
  exchange: Exchange[];
};
