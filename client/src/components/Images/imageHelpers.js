const addDisclaimer = (canvas, gridCols, gridRows) => {
  let fontHeight = gridCols * 10;
  let disclaimerHeight = gridCols * 35;

  if (gridCols == 1) {
    fontHeight = 20;
    disclaimerHeight = 40;
  }

  if (gridCols == 2) {
    fontHeight = 20;
    disclaimerHeight = 120;
  }

  if (gridCols == 3) {
    fontHeight = 35;
    disclaimerHeight = 120;
  }

  canvas.height = canvas.height + disclaimerHeight;

  const ctx = canvas.getContext("2d");
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.globalCompositeOperation = "source-over";

  ctx.font = `normal bold ${fontHeight}px Verdana`;
  ctx.textAlign = "center";
  ctx.fillStyle = "#EEE";
  ctx.fillText(
    "Stock covers shown, not actual product photos.",
    canvas.width / 2,
    canvas.height - gridCols * (gridCols < 4 ? 30 : 20)
  );

  ctx.font = `normal bold ${fontHeight / 1.3}px Verdana`;
  ctx.fillText(
    "We do not distinguish betweeen newsstand & direct editions.",
    canvas.width / 2,
    canvas.height - gridRows * 5
  );
};

module.exports = { addDisclaimer };
