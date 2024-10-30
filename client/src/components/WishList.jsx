import { useSelector } from "react-redux";

export default function WishList() {
  const wishlistItems = useSelector((state) => state.wishlist.wishListItems);
  return (
    <section className="wishlistCard-container">
         <h1>Wishlist</h1>
         <div className="product-card-container2">
        {wishlistItems && wishlistItems.length > 0 ? (
          wishlistItems.map((item) => {
            const { wishlistItem } = item; // Destructure for easier access

            // Check if wishlistItem is defined
            if (!wishlistItem) return null;

            return (
              <div key={wishlistItem._id} className="product-card2">
                <img
                  className="product-card__image2"
                  src={wishlistItem.filename[0]}
                  alt={wishlistItem.brand}
                />
                <p className="product-card-rating2">
                  <i id="rating-start2" className="fa-solid fa-star"></i>
                  {wishlistItem.rate}
                  <span className="rating-count2">
                    ({wishlistItem.count})
                  </span>
                </p>
                <p className="product-card__brand2">{wishlistItem.brand}</p>
                <p className="product-card__description2">
                  {wishlistItem.title}
                </p>
                <p className="product-card__price2">{wishlistItem.price}</p>
              </div>
            );
          })
        ) : (
          <p className="cart-empty">Your wishlist is empty.</p>
        )}
      </div>
    </section>
  );
}
