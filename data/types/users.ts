export type Profile = {
  username: string;
  password: string;
  mail: string;
  contacts: [{ mail: string }];
};

export type Exchange = {
  id: any;
  lender: string;
  borrower: string;
  creation_date: number;
  return_date: number;
  status: string;
};

export type Object = {
  name: string;
  descritpion: string;
  picture: any;
};

export type Users = {
  _id: any;
  profile: Profile;
  exchange: Exchange[];
};
