import React, { useState, useEffect } from "react";
import data from "../../db.json";
import { Link, useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import PaymentForm from "./PaymentForm";

function StarRating({ rating }) {
  const starRating = rating ? `${rating}/5` : "4/5";

  const starRatingStyle = {
    fontSize: "1.3rem", // Adjust the font size as needed
    color: "yellow", // Set the color to yellow
  };

  return (
    <span style={starRatingStyle}>&#9733; {starRating}</span>
  );
}


export default function SingleProduct() {
  const [singleProduct, setSingleProduct] = useState({});
  const { name } = useParams();
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState("");
  const [userRating, setUserRating] = useState(0); // Initialize user rating to 0

  useEffect(() => {
    const findProduct = () => {
      const newProduct = data.products.find((product) => product.name === name);
      setSingleProduct(newProduct);
    };

    findProduct();
  }, [name]);

  const addComment = (commentText, rating) => {
    setComments([...comments, { text: commentText, rating }]);
    setComment(""); // Clear the comment input
    setUserRating(0); // Reset the user rating
  };

  const deleteComment = (index) => {
    const updatedComments = [...comments];
    updatedComments.splice(index, 1);
    setComments(updatedComments);
  };

  const displayRating = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<i key={i} className="fas fa-star text-yellow-500"></i>);
      } else {
        stars.push(<i key={i} className="far fa-star text-yellow-500"></i>);
      }
    }
    return stars;
  };

  return (
    <>
      <section className="xl:max-w-6xl xl:mx-auto py-10 lg:py-20 p-5">
        <img src={singleProduct.large} alt={name} className="w-full h-auto pt-4" />
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl text-white font-bold mb-4 lg:mb-8">
              {name}
            </h1>
            <p className="text-slate-100 text-white font">
                <strong>Food Name:</strong> {singleProduct.foodname}
              </p>
            <p className="text-slate-100 mb-2">
              <strong>Menu:</strong>
            </p>
            {singleProduct.desc &&
              singleProduct.desc.split("\n").map((line, index) => (
                <p key={index} className="text-slate-300 mb-2">
                  {line}
                </p>
              ))
            }
              
            <div className="mt-3">
              <p className="text-slate-100 text-white font">
                <strong>Location:</strong> {singleProduct.location}
              </p>
              <p className="text-slate-100 text-white font">
                <strong>Pricing:</strong> {singleProduct.Pricing}
              </p>
              <p className="text-slate-100 text-white font">
                <strong>Rating:</strong> <StarRating rating={singleProduct.rating} />
              </p>
            </div>
          </div>
          <div>
            <div className="mb-3">
              <h2 className="text-lg lg:text-xl text-white">Add a Comment</h2>
              <div className="mb-2">
                <div className="mb-2">{displayRating(userRating)}</div>
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    addComment(comment, userRating);
                  }}
                >
                  <textarea
                    rows="3"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    placeholder="Write your comment here"
                    className="w-full rounded-lg p-2 bg-slate-200 text-slate-800"
                  ></textarea>
                  <div className="mb-2">
                    <label htmlFor="rating" className="text-white">
                      Rate this:{" "}
                    </label>
                    <input
                      type="number"
                      id="rating"
                      min="1"
                      max="5"
                      value={userRating}
                      onChange={(e) => setUserRating(e.target.value)}
                      className="w-12 h-8 text-slate-800"
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg"
                  >
                    Add Comment
                  </button>
                </form>
              </div>
              <h2 className="text-lg lg:text-xl text-white mt-4">Comments</h2>
              <ul>
                {comments.map((comment, index) => (
                  <li key={index} className="text-slate-300 mb-2">
                    <div className="flex items-center justify-between">
                      <div>
                        {comment.text}{" "}
                        <span>
                          Rating: {displayRating(comment.rating)}
                        </span>
                      </div>
                      <button
                        onClick={() => deleteComment(index)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &#10006;
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="text-center my-5">
          <button
            className="bg-white text-slate-800 py-2 px-4"
            onClick={() => navigate("/payment-form")}
          >
            Payment
          </button>
        </div>
        <ul className="flex items-center justify-end mt-5">
          <li>
            <Link to="/fetch-products" className="text-slate-200 hover:text-white">
              &larr; Back
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}