import { getDatabase } from "../util/mongodb";
import { Users } from "../data/types/users";

export const checkingConnection = async (userToken: string) => {
  if (userToken === undefined) {
    ////should log "undefined"
    // console.log("#### \n No token ", userToken);
    return {
      redirect: {
        destination: "/api/login/",
        permanent: false,
      },
    };
  }

  const mongodb = await getDatabase();
  const findingDB: Users = await mongodb
    .db()
    .collection("users")
    .findOne({ "profile.token": `${userToken}` });

  if (findingDB.profile.token != "") {
    return { props: { userData: JSON.parse(JSON.stringify(findingDB)) } };
  } else {
    // console.log("Token is not in DB : need to finish the login process first");
    return {
      redirect: {
        destination: "/api/login/",
        permanent: false,
      },
    };
  }
};
