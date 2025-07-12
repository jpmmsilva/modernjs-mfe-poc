import React from 'react';
interface Data {
  data: string[];
}

const List = (props: {
  mfData?: Data;
}): JSX.Element => {
  return (
    <div>
     {props.mfData?.data && props.mfData?.data.map((item,index)=><p key={index}>{item}</p>)}
    </div>
  );
};

export default List;