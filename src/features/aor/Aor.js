import { Button } from "@material-ui/core";
import CrtTable from "components/crtTable/CrtTable.js";
import React from "react";
import useColumns from "src/features/aor/hooks/useColumns.js";
import useRows from "src/features/aor/hooks/useRows.js";

const Aor = () => {
  const sendMessage = () => {
    window.crtApi.rendererToMain("Sent From AOR");
  };

  const tabulatorRef = React.useRef(null);

  const { data: colQueryData } = useColumns();
  const { data: rowQueryData } = useRows();

  React.useEffect(() => {
    if (colQueryData?.columnDefinitions) tabulatorRef.current.setColumns(colQueryData.columnDefinitions);
  }, [colQueryData]);

  React.useEffect(() => {
    if (rowQueryData?.results) tabulatorRef.current.replaceData(rowQueryData.results);
  }, [rowQueryData]);

  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <Button onClick={sendMessage}>Send</Button>
      <div style={{ flexGrow: 1, minHeight: 0 }}>
        <CrtTable
          ref={tabulatorRef}
          options={{
            columns: [],
            data: [],
            layout: "fitColumns",
            height: "100%",
            selectable: 1,
            layoutColumnsOnNewData: true,
          }}
        />
      </div>
    </div>
  );
};

export default Aor;
