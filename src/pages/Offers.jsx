import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore"
import { db } from "../firebase.config"
import { toast } from "react-toastify"
import Spinner from "../components/Spinner"
import ListingItem from "../components/ListingItem"
import { async } from "@firebase/util"


function Offers() {

    const [listings, setListings] = useState(null)

    const [loading, setLoading] = useState(false)

    //allows you to access the parameters of the current URL. 
    const params = useParams()

    //synchronize a component with an external system.
    useEffect(() => {
        const fetchListings = async () => {

            try {
                //get reference to collection 
                const listingsRef = collection(db, 'listings')

                //query firebase 9 way
                const makeQuery = query(
                    listingsRef,
                    where("offer", '==', true),
                    orderBy("timestamp", "desc"),
                    limit(10)
                )
                //Execute query
                const querySnap = await getDocs(makeQuery)

                const listings = []

                querySnap.forEach((doc) => {
                    console.log(doc.data)
                    return listings.push({
                        id: doc.id,
                        data: doc.data()
                    })
                })

                setListings(listings)
                setLoading(false)

            } catch (error) {
                toast.error("Could not fetch listings")
            }
        }
        fetchListings()
    }, [])

    return (
        <div className="category">
            <header>
                <p className="pageHeader">
                    Offers
                </p>
            </header>
            {loading ? (<Spinner />
            ) : listings && listings.length > 0 ? (
                <>
                    <main>
                        <ul className="categoryListings">
                            {listings.map((listing) => (
                                <ListingItem listing={listing.data} id={listing.id} key={listing.id} />
                            ))}
                        </ul>
                    </main>

                </>) : (<p>There are no current offers</p>)}
        </div>
    )
}

export default Offers