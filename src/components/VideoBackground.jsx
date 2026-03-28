export default function VideoBackground({ src, opacity = 0.2 }) {
  if (!src) return null;
  
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      overflow: 'hidden',
      zIndex: 0,
      pointerEvents: 'none',
      opacity: opacity
    }}>
      <video 
        autoPlay 
        muted 
        loop 
        playsInline 
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover'
        }}
      >
        <source src={src} type="video/mp4" />
      </video>
    </div>
  );
}
