import { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";

import QuoteItem from "./QuoteItem";
import classes from "./QuoteList.module.css";

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 10 : -10;
    } else {
      return quoteA.id < quoteB.id ? 10 : -10;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const Location = useLocation();
  console.log(Location, "here");
  const queryParams = new URLSearchParams(Location.search);

  // urlSearchparams is JS default class where we pass the querydata
  // sort=asc   - now the variable queryParams has the valuesort = asc
  // urlSearchParams is not react object

  const isSortingAscending = queryParams.get("sort") === "asc";

  const sortedQuotes = sortQuotes(props.quotes, isSortingAscending);

  const changeSortingHandler = () => {
/*
// another way of writing history.push for more complex URLs
history.push({
  pathname : location.pathname,
  search: `?sort=${(isSortingAsecending ? 'desc' : 'asc')}`
})

// this way is more redable
*/

    history.push(
      `${Location.pathname}?sort=${isSortingAscending ? "desc" : "asc"}`
    );
    //history.push("/quotes?sort=asc");

    // console.log(Location);
    // here we have hard coded the sort-asc but we can make it dynamic
    // history can help us change/navigate the url or page
    // it is an important hook
    // change and manage url using usehistory
    // useLocation returns location object
    // that is currently loaded
  };
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={changeSortingHandler}>
          Sort {isSortingAscending ? "Descending" : "Ascending"}{" "}
        </button>
      </div>
      <ul className={classes.list}>
        {sortedQuotes.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;
