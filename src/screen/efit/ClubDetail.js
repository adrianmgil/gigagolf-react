import React, { useState } from 'react';
import Button from '../../component/Button/Button';
import GGRating from '../../component/rating/GGRating';
import ReleatedClubs from '../../component/RelatedClubs/RelatedClubs';
import ClubSelection from './ClubSelection';
import ShoppingButtons from './ShoppingButtons';
import { useProducts } from '../../hooks/products.hook';

const ClubDetail = ({ data }) => {
    const [selection, setSelection] = useState({});
    const { fetchProducts } = useProducts({ groupNum: data.groupnum });
    
    const onClubSelected = (selectedValue) => {
        setSelection({ ...selection, ...selectedValue });
    };

    const ConvertSelection = () => {

    }

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
                <Button className="gg-round-button gg-black">Customize with eFit</Button>
            </div>
            <ClubSelection onClubSelected={onClubSelected} />
            <ReleatedClubs clubs={ data.relatedClubs } />
            <ShoppingButtons selection={ConvertSelection} />
        </div>
    );
}

export default ClubDetail;