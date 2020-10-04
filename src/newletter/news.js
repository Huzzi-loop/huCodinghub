import React, { useState } from 'react';
import NewsCard from './newsCard'
import './news.css';

//Testing data for categories
const categories=[
    'AI','Data Science','Astronomy','Socail Media','Programming','Entrepreneurship','Socail Media','Programming','Entrepreneurship'
];

//Test news to be displayed
const news=[
    {
        id:312,
        img:require('../resources/newsletter/relame.webp'),
        topic:'Realme 7i specifications including 90Hz screen, 5000mAh battery teased ahead of October 7 launch',
        category:'Phones',
        timestamp:'',
        bookmarked:0
    },{
        id:32,
        img:require('../resources/newsletter/relame.webp'),
        topic:'Realme 7i specifications including 90Hz screen, 5000mAh battery teased ahead of October 7 launch',
        category:'Phones',
        timestamp:'',
        bookmarked:0
    },{
        id:12,
        img:require('../resources/newsletter/relame.webp'),
        topic:'Realme 7i specifications including 90Hz screen, 5000mAh battery teased ahead of October 7 launch',
        category:'Phones',
        timestamp:'',
        bookmarked:0
    },{
        id:31,
        img:require('../resources/newsletter/relame.webp'),
        topic:'Realme 7i specifications including 90Hz screen, 5000mAh battery teased ahead of October 7 launch',
        category:'Phones',
        timestamp:'',
        bookmarked:0
    },{
        id:412,
        img:require('../resources/newsletter/relame.webp'),
        topic:'Realme 7i specifications including 90Hz screen, 5000mAh battery teased ahead of October 7 launch',
        category:'Phones',
        timestamp:'',
        bookmarked:0
    },{
        id:423,
        img:require('../resources/newsletter/relame.webp'),
        topic:'Realme 7i specifications including 90Hz screen, 5000mAh battery teased ahead of October 7 launch',
        category:'Phones',
        timestamp:'',
        bookmarked:0
    },{
        id:326,
        img:require('../resources/newsletter/relame.webp'),
        topic:'Realme 7i specifications including 90Hz screen, 5000mAh battery teased ahead of October 7 launch',
        category:'Phones',
        timestamp:'',
        bookmarked:0
    },{
        id:65,
        img:require('../resources/newsletter/relame.webp'),
        topic:'Realme 7i specifications including 90Hz screen, 5000mAh battery teased ahead of October 7 launch',
        category:'Phones',
        timestamp:'',
        bookmarked:0
    }
]

//Test top stories data
const topStories=[
    {
        id:312,
        img:require('../resources/newsletter/relame.webp'),
        topic:'Realme 7i specifications including 90Hz screen, 5000mAh battery teased ahead of October 7 launch',
        category:'Phones',
        timestamp:'',
        bookmarked:0
    },{
        id:32,
        img:require('../resources/newsletter/relame.webp'),
        topic:'Realme 7i specifications including 90Hz screen, 5000mAh battery teased ahead of October 7 launch',
        category:'Phones',
        timestamp:'',
        bookmarked:0
    },{
        id:12,
        img:require('../resources/newsletter/relame.webp'),
        topic:'Realme 7i specifications including 90Hz screen, 5000mAh battery teased ahead of October 7 launch',
        category:'Phones',
        timestamp:'',
        bookmarked:0
    }
]


const NewsLetter = () => {

    const [searchTerm,setSearchTerm] =useState('');
    const [selectedCategory,setSelectedCategory]=useState(-1);
    // const [news,setNews]=useState([]);
    // const [topStories,setTopStories]=useState([]);

    //function to render the news or top stories based on the data above
    //function parameter to choose whether to display news in a row or in a column
    const newsDisplay=(st)=>{
        const fields = []
        if(st==='row'){
            const len= news.length
            for(let i=0;i<(Math.ceil(len /3));i++){
                fields.push(
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <div style={{display:'flex',flexDirection:st}}>
                            <NewsCard data={news[i*3]} width='32%' />
                            {len>(i*3)+1?<NewsCard data={news[(i*3)+1]} width='32%' />:null}
                            {len>(i*3)+2?<NewsCard data={news[(i*3)+2]} width='32%' />:null}
                        </div>
                    </div>
                )
            }
        }else{
            const len= topStories.length
            for(let i=0;i<(Math.ceil(len /3));i++){
                fields.push(
                    <div style={{display:'flex',flexDirection:'column'}}>
                        <div style={{display:'flex',flexDirection:st}}>
                            <NewsCard data={topStories[i*3]} width='96%' />
                            {len>(i*3)+1?<NewsCard data={topStories[(i*3)+1]} width='96%' />:null}
                            {len>(i*3)+2?<NewsCard data={topStories[(i*3)+2]} width='96%' />:null}
                        </div>
                    </div>
                )
            }
        }
        return fields
    }

    return (
        <>
        <div className="news-head">
            <img src={require('../resources/newsletter/undraw_lost_online_wqob.svg')} alt="" className="news-img"/>
            <span className="new-heading">STAY UPDATED ...</span>
        </div>
        <div className="news-main">
            <div className="news-to-read">
                <div className="news-categories">
                    <div style={{display:'inline-block'}}>
                        <i className="fas fa-search" aria-hidden="true" style={{padding:'0 0 0 6px'}}>
                        <input type="text" value={searchTerm} placeholder="Search" onChange={(e)=>setSearchTerm(e.target.value)} className="news-header"/>
                        </i>
                    </div>
                    <div className={selectedCategory===-1?"news-category-active":"news-category-inactive"}  onClick={()=>selectedCategory!==-1?setSelectedCategory(-1):null}>
                        <p>Feeds</p>
                    </div>
                    {
                        categories.map((txt,index)=>(
                            <div key={index} className={selectedCategory===index?"news-category-active":"news-category-inactive"} onClick={()=>selectedCategory!==index?setSelectedCategory(index):null}>
                                <p>{txt}</p>
                            </div>
                        ))
                    }
                </div>
                <div>
                    {newsDisplay('row')}
                </div>

            </div>
            <div  className="news-top">
                Top stories
                <div className="news-top-stories">
                    {newsDisplay('column')}
                </div>
            </div>
        </div>
        </>
    );
};

export default NewsLetter;