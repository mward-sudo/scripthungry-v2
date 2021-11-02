const HeroVideo = () => (
  <video
    autoPlay
    controls={false}
    className="w-full"
    loop={true}
    playsInline={true}
    style={{
      maxHeight: '50em',
      minHeight: '30em',
      objectFit: 'cover',
      background:
        'url(https://res.cloudinary.com/mward82/video/upload/du_0,eo_0.1,so_0/v1635809757/vids/pexels-rostislav-uzunov-7670835_vovcb2.webp) center center',
    }}
  >
    <source
      src="https://res.cloudinary.com/mward82/video/upload/c_scale,vc_auto,f_auto,q_auto:eco,w_375/v1635809757/vids/pexels-rostislav-uzunov-7670835_vovcb2.mp4"
      media="(max-width:375px)"
    />
    <source
      src="https://res.cloudinary.com/mward82/video/upload/c_scale,vc_auto,f_auto,q_auto:eco,w_700/v1635809757/vids/pexels-rostislav-uzunov-7670835_vovcb2.mp4"
      media="(max-width:700px)"
    />
    <source
      src="https://res.cloudinary.com/mward82/video/upload/c_scale,vc_auto,f_auto,q_auto:eco,w_1200/v1635809757/vids/pexels-rostislav-uzunov-7670835_vovcb2.mp4"
      media="(max-width:1200px)"
    />
    <source src="https://res.cloudinary.com/mward82/video/upload/c_scale,vc_auto,f_auto,q_auto:eco,w_1900/v1635809757/vids/pexels-rostislav-uzunov-7670835_vovcb2.mp4" />
  </video>
)

export default HeroVideo
