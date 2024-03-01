const handleFileSelected = async () => {
  const { canceled, filePaths } = await dialog.showOpenDialog({});
  if (!canceled) return filePaths[0];
};

module.exports = {
  handleFileSelected: handleFileSelected,
};
