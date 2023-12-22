const styles = {
  cardImgOverlay: (displayBool) => ({
    display: displayBool ? 'flex' : 'none',
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  cardImgOverlayDiv: {
    width: '80%',
    backgroundColor: '#f7f9fb',
    padding: '5px',
  },
  zone: {
    width: 'fit-content',
    backgroundColor: '#f7f9fb',
  },
  fieldsetParagraph: {
    zIndex: 10,
    position: 'relative',
  },
  listItem: {
    display: 'flex',
    justifyContent: 'space-between',
    borderWidth: '1.5px',
  },
  listItemDiv: {
    width: '65px',
    marginLeft: '10px',
  },
  listItemSpan: {
    display: 'flex',
    justifyContent: 'space-evenly',
    fontSize: 'calc(var(--bs-body-font-size) * 1.2)',
  },
};

export default styles;
