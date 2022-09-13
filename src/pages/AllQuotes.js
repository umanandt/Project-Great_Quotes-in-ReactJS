import { useEffect } from "react";
import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp from "../hooks/hooks/use-http";
import { getAllQuotes } from "../lib/lib/api";
import NoQuotesFound from "../components/quotes/NoQuotesFound";

/*const stored_QUOTES = [
  //   {id: 'q1', author: 'Max', text: 'Learning react is great'},
  //   {id: 'q2', author: 'Williams', text: 'Learning JS is great'},
  //  {id: 'q3', author: 'umanand', text: 'PPC is great too'},
];*/

const AllQuotes = () => {
  const {
    sendRequest,
    status,
    data: loadedQuote,
    error,
  } = useHttp(getAllQuotes, true);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  if (status === "pending") {
    return (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return <p className="centered focused">{error}</p>;
  }

  if (status === "completed" && (!loadedQuote || loadedQuote.length === 0)) {
    return <NoQuotesFound />;
  }

  return <QuoteList quotes={loadedQuote} />;
};

export default AllQuotes;
