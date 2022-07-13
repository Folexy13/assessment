import { useState } from "react";
import { useQuery, gql } from "@apollo/client";

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

export const useFilter = () => {
  const [filters, _updateFilter] = useState({
    issuer: undefined,
    status: undefined,
    date: undefined,
    price: undefined,
  });

  const updateFilter = (filterType, value) => {
    _updateFilter({
      [filterType]: value,
    });
  };

  return {
    models: { filters },
    operations: { updateFilter },
  };
};
