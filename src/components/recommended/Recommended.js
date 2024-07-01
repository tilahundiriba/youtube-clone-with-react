import React, { useEffect, useState } from 'react';
import './Recommended.css';
import { API_KEY, value_convertor } from '../../data';
import { Link } from 'react-router-dom';
const Recommended = ({ categoryId }) => {
    const [apiData, setApiData] = useState([]);
    const fetchRecommendedData = async () => {
        const recomVideoUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=45&regionCode=US&videoCategoryId=${categoryId}&key=${API_KEY}`;
        await fetch(recomVideoUrl).then(res => res.json()).then(recom => setApiData(recom.items));

    }
    useEffect(() => {
        fetchRecommendedData();
    }, [])
    return (
        <div className='recommended'>
            {apiData.map((item, index) => {
                return (
                    <Link to={`/video/${item.snippet.categoryId}/${item.id}`} key={index} className="side-video-list">
                        < img src={item.snippet.thumbnails.medium.url} alt="" />
                        <div className="vid-info">
                            <h4>{item.snippet.title}</h4>
                            <p>{item.snippet.channelTitle}</p>
                            <p>{value_convertor(item.statistics.viewCount)} Views</p>
                        </div>
                    </Link >
                );
            })}

        </div >
    )
}

export default Recommended;
