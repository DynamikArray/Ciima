export const calculateRowsCols = numbIssues => {
  let dims = { rows: 3, cols: 4 };

  switch (numbIssues) {
    case 1:
      dims.rows = 1;
      dims.cols = 1;
      break;
    case 2:
      dims.rows = 1;
      dims.cols = 2;
      break;
    case 3:
      dims.rows = 1;
      dims.cols = 3;
      break;
    case 4:
      dims.rows = 2;
      dims.cols = 2;
      break;
    case 5:
      dims.rows = 2;
      dims.cols = 3;
      break;
    case 6:
      dims.rows = 2;
      dims.cols = 3;
      break;
    case 7:
      dims.rows = 3;
      dims.cols = 3;
      break;
    case 8:
      dims.rows = 3;
      dims.cols = 3;
      break;
    case 9:
      dims.rows = 3;
      dims.cols = 3;
      break;
    default:
  }

  return dims;
};
