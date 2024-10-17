import { useSelector } from "react-redux";

export default function WishList() {
  const wishlistItems = useSelector((state) => state.wishlist.wishListItems);
  console.log(wishlistItems);
  return (
    <section>
         <h1>Wishlist</h1>
         {wishlistItems && wishlistItems.length > 0 ? (
        wishlistItems.map((item) => {
          const { wishlistItem } = item; // Destructure for easier access

          // Check if wishlistItem is defined
          if (!wishlistItem) return null;

          return (
            <div key={wishlistItem._id} className="product-card">
                <img
                  className="product-card__image"
                  src={wishlistItem.filename[0]}
                  alt={wishlistItem.brand}
                />
              <p className="product-card-rating">
                <i id="rating-start" className="fa-solid fa-star"></i>
                {wishlistItem.rate}
                <span className="rating-count">
                  ({wishlistItem.count})
                </span>
              </p>
              <p className="product-card__brand">{wishlistItem.brand}</p>
              <p className="product-card__description">
                {wishlistItem.title}
              </p>
              <p className="product-card__price">{wishlistItem.price}</p>
            </div>
          );
        })
      ) : (
        <p className="cart-empty">Your wishlist is empty.</p>
      )}
    </section>
  );
}
