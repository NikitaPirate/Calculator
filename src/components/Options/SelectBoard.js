import { convertDate, getMarketsNames } from "../../utils";

const SelectBoard = ({
  markets,
  market,
  setMarket,
  boards,
  setBoards,
  board,
  setBoard,
  lyra,
}) => {
  const handleBaseChange = async (event) => {
    let currentBase = event.target.value;

    let market = await lyra.market(currentBase);
    let liveBoards = await market.liveBoards();

    setMarket(market);
    setBoards(liveBoards);
    setBoard(liveBoards[0]);
    window.board = board;
  };

  const handleExpiryChange = async (event) => {
    let currentBoard = boards.find(
      (board) => board.expiryTimestamp === Number(event.target.value)
    );
    setBoard(currentBoard);
    window.board = board;
  };

  return (
    <div>
      <form>
        <select value={market.name} onChange={handleBaseChange}>
          {getMarketsNames(markets).map((marketName) => {
            return (
              <option key={marketName} value={marketName}>
                {marketName}
              </option>
            );
          })}
        </select>

        <select value={board.expiryTimestamp} onChange={handleExpiryChange}>
          {/* {console.log(1, convertDate(currentExpiry))} */}
          {/* {console.log(board)} */}

          {boards.map((board) => {
            let expiry = board.expiryTimestamp;

            return (
              <option key={expiry} value={expiry}>
                {convertDate(expiry)}
              </option>
            );
          })}
        </select>
      </form>
    </div>
  );
};

export default SelectBoard;
