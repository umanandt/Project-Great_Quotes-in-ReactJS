import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import classes from "./Comments.module.css";
import NewCommentForm from "./NewCommentForm";
import useHttp from "../../hooks/hooks/use-http";
import { getAllComments } from "../../lib/lib/api";
import LoadingSpinner from "../UI/LoadingSpinner";
import CommentsList from "../comments/CommentsList";

const Comments = () => {
  const [isAddingComment, setIsAddingComment] = useState(false);
  const params = useParams();
  console.log(params, "this is ID");
  const { quoteId } = params;
  const { sendRequest, status, data: loadedComments } = useHttp(getAllComments);

  const startAddCommentHandler = () => {
    setIsAddingComment(true);
  };

  useEffect(() => {
    sendRequest(quoteId);
  }, [sendRequest, quoteId]);

  const adddedCommentHandler = useCallback(() => {
    sendRequest(quoteId);
  }, [quoteId, sendRequest]);

  let comments;
  if (status === "pending") {
    comments = (
      <div className="centered">
        <LoadingSpinner />
      </div>
    );
  }

    if (status === "completed" && (loadedComments && loadedComments.length > 0)) {
      comments = <CommentsList comments={loadedComments} />;
    }

    if (status === "completed" && (!loadedComments || loadedComments === 0)) {
      comments = <p className="centered"> No comments were added yet!</p>;
    }
  
  return (
    <section className={classes.comments}>
      <h2>User Comments</h2>
     
      {!isAddingComment && (
        <button className="btn" onClick={startAddCommentHandler}>
          Add a Comment
        </button>
      )}
      {isAddingComment && (
        <NewCommentForm
          quoteId={quoteId}
          onAddedComment={adddedCommentHandler}
        />
      )}
      {comments}
    </section>
  );
};

export default Comments;
