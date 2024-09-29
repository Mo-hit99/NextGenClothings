import axios from "axios";
import { useEffect, useState } from "react";

export default function CommentSection({ id }) {
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [commentData, setCommentData] = useState("");
  const [error, setError] = useState("");
  const [editError, setEditError] = useState("");
  const [upDatedComment, setUpDatedComment] = useState("");
  const [model, setModel] = useState(null);
  const [commentOptionModel, SetCommentOptionModel] = useState(null);

  useEffect(() => {
    getCommentSection();
  }, []);
  async function commenthandler(e) {
    e.preventDefault();
    try {
      const response = await axios.post(
        import.meta.env.VITE_SERVER_LINK + `/productData/${id}/review`,
        {
          comment,
          rating,
        }
      );
      if (response) {
        setComment("");
        setRating("");
        getCommentSection();
      }
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
    }
  }

  async function getCommentSection() {
    try {
      const response = await axios.get(
        import.meta.env.VITE_SERVER_LINK + "/productData"
      );
      const result = response.data.queryData;
      setCommentData(result);
    } catch (error) {
      console.log(error);
    }
  }

  async function deleteComment(reviewsId) {
    try {
      const productId = id;
      const reviewId = reviewsId;
      const response = await axios.delete(
        import.meta.env.VITE_SERVER_LINK +
          `/productData/${productId}/review/${reviewId}`
      );
      if (response.status === 200) {
        getCommentSection();
        console.log("comment delete");
      }
    } catch (error) {
      console.log(error);
    }
  }
  function openModel(openModelId) {
    setModel(model === openModelId ? null : openModelId);
  }
  async function UpdateComment(reviewsId) {
    try {
      const productId = id;
      const reviewId = reviewsId;
      const response = await axios.patch(
        import.meta.env.VITE_SERVER_LINK +
          `/productData/${productId}/review/${reviewId}`,
        { upDatedComment }
      );
      if (response.status === 200) {
        getCommentSection();
        console.log("comment Updated");
      }
    } catch (error) {
      setEditError(error.response.data.message);
    }
  }
  function commentOptionToggle(commentId) {
   SetCommentOptionModel(commentOptionModel === commentId ? null : commentId);
  }
  return (
    <div className="comment-card">
      <span className="title">Comments</span>
      <div className="text-box">
        <form onSubmit={commenthandler} className="box-container">
          {error && <p className="error">{error}</p>}
          <input
            placeholder="Rating"
            value={rating}
            onChange={(e) => setRating(e.target.value)}
            className="comment-input-field"
            type="text"
          />
          <textarea
            placeholder="Reply"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />
          <div>
            <div className="formatting">
              <button className="send" title="Send">
                <svg
                  fill="none"
                  viewBox="0 0 24 24"
                  height={18}
                  width={18}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2.5}
                    stroke="#ffffff"
                    d="M12 5L12 20"
                  />
                  <path
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    strokeWidth={2.5}
                    stroke="#ffffff"
                    d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
                  />
                </svg>
              </button>
            </div>
          </div>
        </form>
      </div>
      <div className="comments">
        {commentData &&
          commentData
            .filter((product) => product._id === id)
            .map((data) =>
              data.reviews.map((dataComment) => (
                <>
                  <div className="comment-react"></div>
                  <div key={dataComment._id} className="comment-container">
                    <div className="user">
                      <div className="user-pic">
                        <svg
                          fill="none"
                          viewBox="0 0 24 24"
                          height={20}
                          width={20}
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinejoin="round"
                            fill="#707277"
                            strokeLinecap="round"
                            strokeWidth={2}
                            stroke="#707277"
                            d="M6.57757 15.4816C5.1628 16.324 1.45336 18.0441 3.71266 20.1966C4.81631 21.248 6.04549 22 7.59087 22H16.4091C17.9545 22 19.1837 21.248 20.2873 20.1966C22.5466 18.0441 18.8372 16.324 17.4224 15.4816C14.1048 13.5061 9.89519 13.5061 6.57757 15.4816Z"
                          />
                          <path
                            strokeWidth={2}
                            fill="#707277"
                            stroke="#707277"
                            d="M16.5 6.5C16.5 8.98528 14.4853 11 12 11C9.51472 11 7.5 8.98528 7.5 6.5C7.5 4.01472 9.51472 2 12 2C14.4853 2 16.5 4.01472 16.5 6.5Z"
                          />
                        </svg>
                      </div>
                      <div className="user-info">
                        <span>Anonymous</span>
                        <p>{dataComment.createdAt}</p>
                      </div>
                    </div>
                    <p className="comment-content">{dataComment.comment}</p>
                    <div className="more-option-wrapper">
                      <button
                        onClick={() => commentOptionToggle(dataComment._id)}
                        className="more-option-btn-comment"
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                    </div>
                    {commentOptionModel === dataComment._id && (
                      <div className="comment-btn-container-wrapper">
                        <button
                          className="btn-comment-delete comment-btn"
                          onClick={() => deleteComment(dataComment._id)}
                        >
                          delete
                        </button>
                        <button
                          className="btn-comment-edit comment-btn"
                          onClick={() => openModel(dataComment._id)}
                        >
                          Edit
                        </button>
                      </div>
                    )}
                    {model === dataComment._id && (
                      <>
                        <div className="comment-edit-container-wrapper">
                          <textarea
                            className="edit-comment-textarea"
                            placeholder="Edit"
                            value={upDatedComment || dataComment.comment || ""}
                            onChange={(e) => setUpDatedComment(e.target.value)}
                            />
                          <div className="edit-btn-wrapper">
                            <button
                              className="edit-comment-btn"
                              title="edit"
                              onClick={() => UpdateComment(dataComment._id)}
                              >
                              <i className="fa-solid fa-pencil"></i>
                            </button>
                          </div>
                        </div>
                        {editError && <p className="error">{editError}</p>}
                      </>
                    )}
                  </div>
                </>
              ))
            )}
      </div>
    </div>
  );
}
