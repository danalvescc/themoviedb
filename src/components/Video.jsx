import styles from '../styles/components/Video.module.css'

function Video({videoID}){
    return (
        <div className={styles.container}>
            {videoID &&
                <iframe
                width="100%"
                height="480"
                src={`https://www.youtube.com/embed/${videoID}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="Embedded youtube"
              />
            }
        </div>
    )
}

export default Video