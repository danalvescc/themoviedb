import Youtube from 'react-youtube';
import styles from '../styles/components/Video.module.css'

function Video({videoID}){
    return (
        <div className={styles.container}>
            {videoID != ''&&
                <Youtube videoId={videoID} opts={{
                    width: '100%'
                }}/>
            }
        </div>
    )
}

export default Video