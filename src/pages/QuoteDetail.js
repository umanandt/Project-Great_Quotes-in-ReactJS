import "../index.css";
import { Fragment, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Route } from "react-router-dom";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import { useRouteMatch } from "react-router-dom";
import useHttp from "../hooks/hooks/use-http";
import { getSingleQuote } from "../lib/lib/api";
import  LoadingSpinner  from '../components/UI/LoadingSpinner';

// use routematch is simliar  like location bit it offers
// addtional information that we can use
// resolve the  long path problems
// for instance {`/quotes/${params.quoteId}/comments`}

const QuoteDetail = () => {
  const params = useParams();
  
  const match = useRouteMatch();

  // I can simple console match to see what information does
  // useRouteMatch offers.

  const { quoteId } = params;

  const {
    sendRequest,
    status,
    data: loadedQuotes,
    error,
  } = useHttp(getSingleQuote, true);

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  //const quote = DUMMY_QUOTES.find((quote) => quote.id === params.quoteId);

  if(status === 'pending'){
    return <div className='centered'>
      <LoadingSpinner />
    </div>
  }
 
  if(error){
    return <div className='centered'>
           {error}
    </div>
  }


  if (!loadedQuotes.text) {
    return <p> No quote found</p>;
  }

  return (
    <Fragment>
     {/*  <h1>Quote Details</h1>
      <p>{params.quoteId}</p> */}

      <HighlightedQuote text={loadedQuotes.text} author={loadedQuotes.author} />
      <Route path={match.path} exact>
        <div className="çentered">
          <Link className="btn--flat" to={`/quotes/${params.quoteId}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>

      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};
// (Match.path) match is the object of useRoute hook and path
// is - /quotes/${params.quoteId}
export default QuoteDetail;
