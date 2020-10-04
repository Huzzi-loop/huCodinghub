import React from 'react';
import './newsCard.css';
import { useHistory } from 'react-router-dom'

const NewsCard = ({data,width}) => {

    const history=useHistory();

    const uuid=data['id'];
    return (
        <div className="news-card" style={{width}}>
            <a onClick={() => {
                history.push(`/Newsletter/${uuid}`)
                }} className="news-card-card">
                <div className="news-card-image">
                    <img src={data['img']} alt="" />
                </div>
                <div className="news-card-details">
                    <p>{data['category']}</p>
                    <p>{data['timestamp']}</p>
                </div>
                <div className="news-card-topic">
                    <p>{data['topic']}</p>
                </div>
            </a>
            <div className="news-card-card-2">
                <p>Read Now -></p>
            </div>
        </div>
    );
};

export default NewsCard;