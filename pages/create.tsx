import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { Props } from "../data/types/props";
import { checkingConnection } from "../util/checkingConnection";
import { isValid, isAfter } from "date-fns";
import { categories } from "../data/categories";
import { Paper } from "@material-ui/core";
const Create: React.FC<Props> = ({ userData }) => {
  const today: string = new Date().toISOString().split("T")[0];
  const [returnDate, setReturnDate] = React.useState<string>(undefined);
  const [isDateValid, setIsDateValid] = React.useState<boolean>(false);
  const [isLoaner, setIsLoaner] = React.useState<boolean>(true);
  const [mailEntry, setMailEntry] = React.useState<string>(undefined);
  const [isMailValid, setIsMailValid] = React.useState<boolean>(undefined);
  const [selectCategory, setSelectCategory] = React.useState<string>();
  useEffect(() => {
    if (typeof returnDate !== "undefined") {
      if (isAfter(new Date(returnDate), new Date(today))) {
        setIsDateValid(isValid(new Date(returnDate)));
      } else {
        setIsDateValid(false);
      }
    }
  }, [returnDate]);
  useEffect(() => {
    if (typeof mailEntry !== "undefined") {
      if (mailEntry !== userData.profile.mail) {
        setIsMailValid(true);
      } else {
        setIsMailValid(false);
      }
    }
  }, [mailEntry]);
  return (
    <div>
      <div id="createform" className="container">
        <Paper id="paperClue" elevation={3}>
          <h3 id="createFormTitle" className="pt-3">
            Fill the form
          </h3>
          <form
            className="container-fluid mb-2"
            method="POST"
            action={`/api/exchange/create/`}
          >
            <div>
              {/* <input
          className="fst-italic rounded m-1 text-dark"
          type="checkbox"
          onChange={(): void => {
            isLoaner ? setIsLoaner(false) : setIsLoaner(true);
          }}
        />
        <label>Loaner</label> */}
              <br />
              <label className="fst-italic">Name of your object</label>
              <input
                className="form-control"
                type="text"
                name="name"
                required
              />
            </div>
            <br />
            <div>
              <label className="fst-italic">Description</label>
              <input
                className="form-control"
                type="text"
                name="description"
                required
              />
            </div>
            <br />
            <div>
              <label className="fst-italic">Please choose a category</label>
              <br />
              <select
                name="category"
                onChange={(event): void =>
                  setSelectCategory(event.target.value)
                }
              >
                {categories.map((category, index) => {
                  return (
                    <React.Fragment key={index}>
                      <option value={category.string} className="form-control">
                        {category.string} {category.emoji}
                      </option>
                    </React.Fragment>
                  );
                })}
              </select>
            </div>
            <div>
              <br />
              <label className="fst-italic">Borrower mail</label>
              <input
                className="form-control"
                type="email"
                name={isLoaner ? "borrower" : "loaner"}
                // placeholder={isLoaner ? "Borrower mail" : "Loaner mail"}

                onChange={(event): void => setMailEntry(event.target.value)}
                required
              />
            </div>
            <div>
              <br />
              <label className="fst-italic">Select a exchange date</label>
              <input
                className="form-control"
                type="date"
                min={today}
                max="2099-01-01"
                name="returnDate"
                onChange={(event): void => setReturnDate(event.target.value)}
                required
              />
            </div>
            <p className="pb-3">
              <input
                type="hidden"
                name="_id"
                value={`${userData.exchange.length + 1}`}
              />
              <input
                type="hidden"
                name={isLoaner ? "loaner" : "borrower"}
                value={`${userData.profile.mail}`}
              />
              <input
                type="hidden"
                name="valideDate"
                value={isDateValid.toString()}
              />
              <input
                type="hidden"
                name={selectCategory}
                value={selectCategory}
              />
              <br />
              {isMailValid ? (
                <button id="Allbutton" className="btn border" type="submit">
                  Submit
                </button>
              ) : (
                <button
                  className="btn btn-outline-dark border m-1 disabled"
                  type="submit"
                  disabled
                >
                  Submit
                </button>
              )}
            </p>
          </form>
        </Paper>
      </div>
    </div>
  );
};
export default Create;
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userToken = context.req.cookies.token;
  const checkConnectionValidity = await checkingConnection(userToken);
  // console.log("DB", checkConnectionValidity);
  return checkConnectionValidity;
};
