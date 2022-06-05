import React from "react";
import { BASE_URL } from '../../constants';
import Carousel from "../Carousel/Carousel";
import './RelatedClubs.less';

const ReleatedClubs = (
{
    clubs,
    baseUrl = BASE_URL,
    suffix = 'jpg',
}) => {
    const createClub = (c) => {
        return (
            <div key={c.clubs}>
                <img src={`${baseUrl}/images/studio330/${c.groupNum.replace('-SET','')}/${1}.${suffix}`} width={48} />
                <div className="gg-related-clubs-clubs" >{c.clubs}</div>
                <div className="gg-related-clubs-price" >${c.price}</div>
                <div className="gg-related-clubs-description" >{c.description}</div>
                {c.isStock
                    ? <div className="gg-related-clubs-in-stock" >In Stock </div>
                    : <div className="gg-related-clubs-out-stock" >Out of Stock</div>
                }
            </div>
        );
    };

    return (
        <Carousel>
            <div className="gg-related-clubs-wrapper">
                {(clubs ?? []).map((c) =>
                    createClub(c)
                )}
            </div>
        </Carousel>
    );
};

export default ReleatedClubs;