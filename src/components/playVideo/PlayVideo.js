import React, { useEffect, useState } from 'react';
import './PlayVideo.css';
import { API_KEY, value_convertor } from '../../data';
// import video1 from '../../assets/video.mp4'
import like from '../../assets/like.png'
import dislike from '../../assets/dislike.png'
import share from '../../assets/share.png'
import save from '../../assets/save.png'
// import jack from '../../assets/jack.png'
// import profile from '../../assets/user_profile.jpg'
import moment from 'moment';
import { useParams } from 'react-router-dom';
const PlayVideo = () => {
  const { videoId } = useParams();
  const [apiData, setApiData] = useState(null);
  const [channelData, setChannelData] = useState(null);
  const [comment, setComment] = useState([]);
  const fetchVideoData = async () => {
    //Fetching Videos Data
    const videoDetailsUrl = `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${API_KEY}`;
    await fetch(videoDetailsUrl).then(res => res.json()).then(data => setApiData(data.items[0]));

  }
  const fetchOtherData = async () => {
    if (apiData) {
      const channelDataUrl = `https://www.googleapis.com/youtube/v3/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${apiData.snippet.channelId}&key=${API_KEY}`;
      await fetch(channelDataUrl).then(res => res.json()).then(chan => setChannelData(chan.items[0]));
      const commentUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet%2Creplies&maxResults=50&videoId=${videoId}&key=${API_KEY}`;
      await fetch(commentUrl).then(res => res.json()).then(comm => setComment(comm.items));

    } else {
      // Handle the case where apiData is null (e.g., display a loading message)
      console.log('laoding...')
    }
  };
  useEffect(() => {
    fetchVideoData();
  }, [videoId])
  useEffect(() => {
    fetchOtherData();
  }, [apiData])
  return (
    <div className='play-video'>
      {/* <video src={video1} controls autoPlay muted></video> */}
      <iframe src={`https://www.youtube.com/embed/${videoId}?autoplay=1`} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
      <h3>{apiData ? apiData.snippet.title : 'Title Here'}</h3>
      <div className="play-video-info">
        <p>{apiData ? value_convertor(apiData.statistics.viewCount) : "16K"} Views &bull; {apiData ? moment(apiData.snippet.publishedAt).fromNow() : ""}</p>
        <div>
          <span><img src={like} alt="" />{apiData ? value_convertor(apiData.statistics.likeCount) : 155}</span>
          <span><img src={dislike} alt="" /></span>
          <span><img src={share} alt="" />Share</span>
          <span><img src={save} alt="" />Save</span>
        </div>
      </div>
      <hr />
      <div className="publisher">
        <img src={channelData ? channelData.snippet.thumbnails.default.url : ''} alt="" />
        <div>
          <p>{apiData ? apiData.snippet.channelTitle : ''}</p>
          <span>{channelData ? value_convertor(channelData.statistics.subscriberCount) : '1M'} Subscribers</span>
        </div>
        <button>Subscribe</button>

      </div>
      <div className="vid-description">
        <p>{apiData ? apiData.snippet.description.slice(0, 250) : "Descriptions"}</p>
        <hr />
        <h4>{apiData ? value_convertor(apiData.statistics.commentCount) : 108} Comments</h4>

        {comment.map((item, index) => {
          return (
            <div key={index} className="comment">
              <img src={item.snippet.topLevelComment.snippet.authorProfileImageUrl} alt="" />
              <div>
                <h3>{item.snippet.topLevelComment.snippet.authorDisplayName}  <span>1 day ago</span></h3>
                <p>{item.snippet.topLevelComment.snippet.textDisplay}</p>
                <div className="comment-action">
                  <img src={like} alt="" />
                  <span>{value_convertor(item.snippet.topLevelComment.snippet.likeCount)}</span>
                  <img src={dislike} alt="" />

                </div>

              </div>
            </div>
          )
        })}


      </div>
    </div >
  )
}

export default PlayVideo;
