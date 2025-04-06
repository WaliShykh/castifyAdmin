type AspectRatioVideoProps = {
  videoUrl: string;
  aspectRatio?: string;
  title?: string;
};

const AspectRatioVideo: React.FC<AspectRatioVideoProps> = ({
  videoUrl,
  aspectRatio = "video",
  title = "Embedded Video",
}) => {
  return (
    <div className={`aspect-${aspectRatio} overflow-hidden rounded-lg`}>
      <iframe
        src={videoUrl}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="w-full h-full"
      ></iframe>
    </div>
  );
};

export default AspectRatioVideo;
