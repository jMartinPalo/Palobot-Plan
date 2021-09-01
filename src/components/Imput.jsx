function Input({ inputRef, HandleClick }) {
  return (
    <>
      <input type="text" ref={inputRef} defaultValue={"Piece 1"} />
      <button type="submit" onClick={HandleClick}>
        Envoyer
      </button>
    </>
  );
}
export default Input;
