import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import { GetServerSideProps } from "next";
import { Props } from "../data/types/props";
import { checkingConnection } from "../util/checkingConnection";
import { isValid, isAfter } from "date-fns";
import { categories } from "../data/categories";

const Create: React.FC<Props> = ({ userData }) => {
  const today: string = new Date().toISOString().split("T")[0];
  const [returnDate, setReturnDate] = React.useState<string>(undefined);
  const [isDateValid, setIsDateValid] = React.useState<boolean>(false);
  const [isLoaner, setIsLoaner] = React.useState<boolean>(false);
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
      <form
        className="container-fluid"
        method="POST"
        action={`/api/exchange/create/`}
      >
        <div>
          <input
            className="fst-italic rounded m-1 text-dark"
            type="checkbox"
            onChange={(): void => {
              isLoaner ? setIsLoaner(false) : setIsLoaner(true);
            }}
          />
          <label>Loaner</label>
          <br />
          <input
            className="form-control"
            type="text"
            name="name"
            placeholder="Name of your object"
            required
          />
        </div>
        <div>
          <input
            className="form-control"
            type="text"
            name="description"
            placeholder="Description"
            required
          />
        </div>
        <div>
          <label>Select a category</label>
          <br />
          <select
            name="category"
            onChange={(event): void => setSelectCategory(event.target.value)}
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
          <input
            className="form-control"
            type="email"
            name={isLoaner ? "borrower" : "loaner"}
            placeholder={isLoaner ? "Borrower mail" : "Loaner mail"}
            onChange={(event): void => setMailEntry(event.target.value)}
            required
          />
        </div>
        <div>
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
        <p>
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
          <input type="hidden" name={selectCategory} value={selectCategory} />
          <br />
          {isMailValid ? (
            <button className="btn btn-outline-dark border m-1" type="submit">
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
