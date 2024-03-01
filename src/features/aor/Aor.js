import { Button } from "@material-ui/core";
import CrtTable from "components/crtTable/CrtTable.js";
import React from "react";
import useColumns from "src/features/aor/hooks/useColumns.js";
import useRows from "src/features/aor/hooks/useRows.js";
import useRegions from "src/hooks/useRegions";

const Aor = () => {
  const sendMessage = () => {
    window.crtApi.rendererToMain("Sent From AOR");
  };

  const tabulatorRef = React.useRef(null);
  const {data: regionsData} = useRegions();


  React.useEffect(() => {
    if (regionsData?.results) tabulatorRef.current.replaceData(regionsData.results);
  }, [regionsData]);

  return (
    <div style={{ flexGrow: 1, minHeight: 0, display: "flex", flexDirection: "column" }}>
      <Button onClick={sendMessage}>Send</Button>
      <div style={{ flexGrow: 1, minHeight: 0 }}>
        <CrtTable
          ref={tabulatorRef}
          options={{
            columns: [{title: "Name", field:"name"}],
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
