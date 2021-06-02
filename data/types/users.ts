export type Profile = {
  username: string;
  mail: string;
  contacts: string[];
  objects: Object[];
  token: string;
};

export type Exchange = {
  _id: any;
  object: Object;
  lender: string;
  borrower: string;
  creation_date: Date;
  return_date: Date;
  status: string;
};

export type Object = {
  name: string;
  description: string;
  picture: any;
};

export type Users = {
  _id: any;
  profile: Profile;
  exchange: Exchange[];
};
