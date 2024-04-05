import Cell from "./Cell";

interface Props{
  row: number,
  bool: boolean[],
  value: number[],
}


function Row(props:Props) {
  const {row,bool,value} = props;

  return (
    <div className="row-board">
      {
        value.map( (col:number,ix:number) => (
          <Cell
            key={'Cell'+ix+col}
            bool={bool[ix]}
            value={value[ix]}
            col={+ix}
            row={+row}
          />
        ))
      }
    </div>
  );
}

export default Row;