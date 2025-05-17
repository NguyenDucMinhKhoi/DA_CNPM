import { useEffect, useState } from "react";
import { categories } from "../data";
import "../styles/Listings.scss";
import ListingCard from "./ListingCard";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { setListings } from "../redux/state";

const Listings = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const [selectedCategory, setSelectedCategory] = useState("All");

  const listings = useSelector((state) => state.listings);

  const getFeedListings = async () => {
    try {
      const response = await fetch(
        selectedCategory !== "All"
          ? `http://localhost:5001/posts?category=${selectedCategory}` // Fixed template literal
          : "http://localhost:5001/posts",
        { method: "GET" }
      );

      const data = await response.json();
      dispatch(setListings({ listings: data }));
      setLoading(false);
    } catch (err) {
      console.log("Fetch Listings Failed", err.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    getFeedListings();
  }, [selectedCategory]);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="listings">
          {listings.map(
            ({
              id_user,  // Uncommented important prop
              creator,
              listingPhotoPaths,
              city,
              district,
              country,
              category,
              type,
              price,
              booking = false,
            }) => (
              <ListingCard
                key={id_user}  // Added key prop
                listingId={id_user}  // Uncommented important prop
                creator={creator}
                listingPhotoPaths={listingPhotoPaths}
                city={city}
                district={district}
                country={country}
                category={category}
                type={type}
                price={price}
                booking={booking}
              />
            )
          )}  
        </div>
      )
      }
      
      <div className="category-list">
        <div className="category-left">
          <h1>Our Best Facilities Provide You.</h1>
          <p>Our accommodations are thoughtfully designed to provide maximum comfort and relaxation, ensuring a truly memorable stay for every guest.</p>
        </div>

        <div className="category-right">
          {categories?.map((category, index) => (
            <div
              className={`category ${
                category.label === selectedCategory ? "selected" : ""
              }`}
              key={index}
              onClick={() => setSelectedCategory(category.label)}
            >
              <div className="category_icon">{category.icon}</div>
              <p>{category.label}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Listings;