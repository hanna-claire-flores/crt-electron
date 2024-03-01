import { Menu, BrowserWindow } from "electron";

const handleRightClick = (event) => {
  const menu = Menu.buildFromTemplate([
    {
      label: "Menu Item 1",
      click: () => {
        event.sender.send("context-menu-command", "menu-item-1");
      },
    },
    { type: "separator" },
    { label: "Menu Item 2", type: "checkbox", checked: true },
  ]);
  menu.popup({ window: BrowserWindow.fromWebContents(event.sender) });
};

export default handleRightClick;
