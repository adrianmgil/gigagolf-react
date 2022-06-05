import React from 'react';
import GGRating from '../../component/rating/GGRating';
import ReleatedClubs from '../../component/RelatedClubs/RelatedClubs';
import ClubSelection from './ClubSelection';
import ShoppingButtons from './ShoppingButtons';

const ClubDetail = ({ data }) => {
    return (
        <div className="efit-club-detail">
            <div className="club-detail-title">{data.name}</div>
            <GGRating
                className="club-detail-rating"
                rating={data.rating}
                message={`(${(data.numOfReviews ?? 0)} custoomer reviews)`}
                link='Write a review'
            />
            <div className="club-detail-price"><div>Price</div>${data.price}<div>({data.numOfClubs}) Clubs</div></div>
            <div className="club-detail-description">{data.description}</div>
            <div className="club-detail-customize">
                <div>Play better golf with custom clubs fit for you and your game.</div>
                <button>Customize with eFit</button>
            </div>
            <ClubSelection />
            <ReleatedClubs clubs={ data.relatedClubs } />
            <ShoppingButtons />
        </div>
    );
}

export default ClubDetail;