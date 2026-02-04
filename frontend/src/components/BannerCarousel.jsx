const BannerCarousel = () => {
  return (
    <div style={styles.container}>
      <img
        src="https://placehold.co/1200x300/png?text=BookMyShow+Banner"
        alt="banner"
        style={styles.image}
      />
    </div>
  );
};

const styles = {
  container: {
    width: "100%",
    marginBottom: "30px"
  },
  image: {
    width: "100%",
    borderRadius: "8px",
    display: "block"
  }
};

export default BannerCarousel;
