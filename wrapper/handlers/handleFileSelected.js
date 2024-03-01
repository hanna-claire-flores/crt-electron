import { dialog } from "electron";

const handleFileSelected = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) return filePaths[0];
};

export default handleFileSelected;
