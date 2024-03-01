import { dialog } from "electron";

const showLoginDialog = async () => {
  const { response } = dialog.showMessageBox({
    message: "Placeholder Login Function",
    detail: "This should really be handled by the IPS service...",
    buttons: ["Fake Success", "Fake Cancel"],
  });

  return response;
};

export default showLoginDialog;
