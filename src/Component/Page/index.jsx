import React from "react";
import { useState } from "react";
import { useLazyQuery, gql } from "@apollo/client";
import "./styles.scss";
import { useFilter } from "../../shared/hooks/useFilter";

// GraphQl query

const GET_ALL_TRANSACTIONS = gql`
  query allTransactions($page: Int!) {
    allTransactions(page: $page) {
      issuer
      status
      date
      price
      image
    }
  }
`;

// const filterHandler = () => {};
export const Page = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, { loading, error, data }] = useLazyQuery(
    GET_ALL_TRANSACTIONS,
    { variables: { page: 0 } }
  );
  //custom hook to filter element
  const { operations, models } = useFilter();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error </p>;
  return (
    <div className="page">
      <div style={{ width: "80%", margin: "auto" }}>
        <input
          type="string"
          placeholder="Search ..."
          onChange={(e) => operations.updateFilter("status", e.target.value)}
        />
        {console.log(models)}
        <button onClick={() => filter({ filter: models })}>Search</button>
      </div>
      <form action="" className="filter">
        <select name="" id="">
          <option value="Date" selected disabled>
            Date
          </option>
          <option value=""> 02/07/2022 - 03/07/2022</option>
          <option value=""> 03/07/2022 - 04/07/2022</option>
          <option value=""> 04/07/2022 - 05/07/2022</option>
          <option value=""> 05/07/2022 - 06/07/2022</option>
          <option value=""> 06/07/2022 - 07/07/2022</option>
        </select>
        <select name="" id="">
          <option value="Status" selected disabled>
            Status
          </option>
          <option value="Status">Success</option>
          <option value="Status">Failed</option>
        </select>
        <input type="text" placeholder="Issuer" />
        <select name="" id="">
          <option value="Price" selected disabled>
            Price
          </option>
          <option value="Price">Above $100-$200</option>
          <option value="Price">Below $500-$200</option>
          <option value="Price">Above $500</option>
        </select>
        <button type="submit" onClick={() => filter({ variables: { id: 3 } })}>
          Filter
        </button>
      </form>
      <h3>List Of Transactions in ABC Company & Co</h3>
      <button
        className="ukd"
        onClick={() => filter({ variables: { page: 0 } })}
      >
        View all Transactions
      </button>
      <div className="container">
        {data?.allTransactions
          .filter((val) => {
            if (searchTerm === "") {
              return val;
            } else if (
              val.date.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.issuer.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.price.toLowerCase().includes(searchTerm.toLowerCase()) ||
              val.status.toLowerCase().includes(searchTerm.toLowerCase())
            ) {
              return val;
            }
          })
          .map((val, key) => {
            return (
              <div className="card" key={key}>
                <div className="card-img">
                  <img src={val.image} alt="" />
                </div>
                <div className="card-body">
                  <div className="flex">
                    <div className="issuer">Price: {val.price}</div>
                    <div className="status">Status: {val.status}</div>
                  </div>
                  <div className="flex">
                    <div className="issuer">Issuer: {val.issuer}</div>
                    <div className="date">Date: {val.date}</div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

// combo

// #
// ##
// ###
// ####
// #####
// ######
// #####
// ####
// ###
// ##
// #
