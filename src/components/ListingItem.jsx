
import { Link } from "react-router-dom"
import { ReactComponent as DeleteIcon } from "../assets/svg/deleteIcon.svg"
import bedIcon from "../assets/svg/bedIcon.svg"
import bathtubeIcon from "../assets/svg/bathtubIcon.svg"


function ListingItem({ listing, id, onDelete }) {
    return (
        <li className="categoryListing">
            <Link to={`/ category/${listing.type}/${id}`}
                className="categoryListingLink">
                <img src={listing.imageUrls[0]} alt={listing.name}
                    className="categoryListingImg" />
                <div className="categoryListingDetails">
                    <p className="categoryListingLocation">
                        {listing.location}
                    </p>
                    <p className="categoryListingName">
                        {listing.name}
                    </p>
                    <p className="categoryListingPrice">
                        EUR {listing.offer ?
                            listing.discountedPrice :
                            listing.regularPrice}
                        {listing.type === 'rent' && ' / Month'}


                    </p>
                    <div className="categoryListingInfoDiv">
                        <img src={bedIcon} alt="bedIcon" />
                        <p className="categoryListingInfoText">
                            {listing.bedrooms > 1 ? `${listing.bedrooms} Bedrooms ` : `1 Bedroom`}

                        </p>
                        <img src={bathtubeIcon} alt="bathtubeIcon" />
                        <p className="categoryListingInfoText">
                            {listing.badrooms > 1 ? `${listing.badrooms} Badrooms ` : `1 Badroom`}

                        </p>
                    </div>

                </div>

            </Link>
            {onDelete && (
                <DeleteIcon
                    className="removeIcon"
                    fill="rgb (231, 76, 60)"
                    onClick={() => onDelete(listing.id, listing.name)}
                />
            )}
        </li>
    )
}

export default ListingItem