import React from "react";
import Tabulator from "tabulator-tables";

const CrtTable = React.forwardRef(({ className, options }, ref) => {
  const divRef = React.useRef(null);

  React.useEffect(() => {
    ref.current = new Tabulator(divRef.current, options);

    return () => {
      ref.current.clearData();
    };
  }, []);

  return <div className={className} ref={divRef} />;
});

export default CrtTable;
