import { useEffect, useState } from "react";
import data from "./initialValues/data.json";
import headers from "./initialValues/headers.json";
import urlAccounts from "./initialValues/urlAccounts.json";
import urlAccountTypes from "./initialValues/urlAccountTypes.json";
import useFetch from "./customHooks/useFetch";
import "./App.css";
import Table from "./components/Tables";

function App() {
  const [finallArray, setFinallArray] = useState([]);
  const {
    response: accountsResponse,
    isPending: accountsLoading,
    error: accountsError,
  } = useFetch({
    url: urlAccounts,
    method: "GET",
    headers: headers,
    data: null,
  });
  const {
    response: accountTypesResponse,
    isPending: accountTypesLoading,
    error: accountTypesError,
  } = useFetch({
    url: urlAccountTypes,
    method: "GET",
    headers: headers,
    data: null,
  });

  useEffect(() => {
    if (accountsResponse.length && accountTypesResponse.length) {
      const filteredAccounts = accountsResponse.filter(
        (account) => account.name
      );
      const accountTypesMap = new Map();
      accountTypesResponse.forEach((acctype) =>
        accountTypesMap.set(acctype.id, acctype.title)
      );
      const resultAccounts = filteredAccounts.map((account) => {
        return {
          id: account._id,
          name: account.name,
          profitLoss: account.profitLoss,
          currency: account.currency,
          accountType: accountTypesMap.get(account.accountType),
        };
      });
      resultAccounts.sort((a, b) => (a.name > b.name ? 1 : -1));
      setFinallArray(resultAccounts);
    }
  }, [accountsResponse, accountTypesResponse]);

  return (
    <div>
      <Table
        error={accountsError || accountTypesError}
        isLoading={accountsLoading || accountTypesLoading}
        finallArray={finallArray.length ? finallArray : data}
      />
    </div>
  );
}

export default App;
