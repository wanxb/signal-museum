(() => {
  const canvas = document.getElementById('screen');
  const sceneController = window.SignalMuseumScene.createScene(canvas, window.SignalMuseumData.exhibits);
  const ui = window.SignalMuseumUI.createUI(sceneController);
  sceneController.runtime = sceneController.start(() => ui.getCurrentIndex(), () => ui.autoAdvance());
})();
