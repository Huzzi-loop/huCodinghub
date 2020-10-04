import React from 'react';
import './newsDetail.css';

const NewsDetail = (props) => {
    const {match}=props

    //match.params.id is the id of the news
    //FIrst use useEffect hook to fetch data realted to that id 
    return (
        <div>
            {match.params.id}
            <div className="news-details-img">
                <img scr={require('../resources/newsletter/relame.webp')} alt="" />
            </div>
        </div>
    );
};

export default NewsDetail;