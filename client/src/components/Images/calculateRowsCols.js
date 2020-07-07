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
    case 10:
      dims.rows = 4;
      dims.cols = 3;
      break;
    case 11:
      dims.rows = 4;
      dims.cols = 3;
      break;
    case 12:
      dims.rows = 4;
      dims.cols = 3;
      break;
    case 13:
      dims.rows = 4;
      dims.cols = 4;
      break;
    case 14:
      dims.rows = 4;
      dims.cols = 4;
      break;
    case 15:
      dims.rows = 4;
      dims.cols = 4;
      break;
    case 16:
      dims.rows = 4;
      dims.cols = 4;
      break;
    case 17:
      dims.rows = 5;
      dims.cols = 4;
      break;
    case 18:
      dims.rows = 5;
      dims.cols = 4;
      break;
    case 19:
      dims.rows = 5;
      dims.cols = 4;
      break;
    case 20:
      dims.rows = 5;
      dims.cols = 4;
      break;
    case 21:
      dims.rows = 5;
      dims.cols = 5;
      break;
    case 22:
      dims.rows = 5;
      dims.cols = 5;
      break;
    case 23:
      dims.rows = 5;
      dims.cols = 5;
      break;
    case 24:
      dims.rows = 5;
      dims.cols = 5;
      break;
    case 25:
      dims.rows = 5;
      dims.cols = 5;
      break;
    case 26:
      dims.rows = 6;
      dims.cols = 5;
      break;
    case 27:
      dims.rows = 6;
      dims.cols = 5;
      break;
    case 28:
      dims.rows = 6;
      dims.cols = 5;
      break;
    case 29:
      dims.rows = 6;
      dims.cols = 5;
      break;
    case 30:
      dims.rows = 6;
      dims.cols = 5;
      break;
    case 31:
      dims.rows = 7;
      dims.cols = 5;
      break;
    case 32:
      dims.rows = 7;
      dims.cols = 5;
      break;
    case 33:
      dims.rows = 7;
      dims.cols = 5;
      break;
    case 34:
      dims.rows = 7;
      dims.cols = 5;
      break;
    case 35:
      dims.rows = 7;
      dims.cols = 5;
      break;
    case 36:
      dims.rows = 6;
      dims.cols = 6;
      break;
    case 37:
      dims.rows = 7;
      dims.cols = 6;
      break;
    case 38:
      dims.rows = 7;
      dims.cols = 6;
      break;
    case 39:
      dims.rows = 7;
      dims.cols = 6;
      break;
    case 40:
      dims.rows = 7;
      dims.cols = 6;
      break;
    case 41:
      dims.rows = 7;
      dims.cols = 6;
      break;
    case 42:
      dims.rows = 7;
      dims.cols = 6;
      break;
    case 43:
      dims.rows = 7;
      dims.cols = 7;
      break;
    case 44:
      dims.rows = 7;
      dims.cols = 7;
      break;
    case 45:
      dims.rows = 7;
      dims.cols = 7;
      break;
    case 46:
      dims.rows = 7;
      dims.cols = 7;
      break;
    case 47:
      dims.rows = 7;
      dims.cols = 7;
      break;
    case 48:
      dims.rows = 7;
      dims.cols = 7;
      break;
    case 49:
      dims.rows = 7;
      dims.cols = 7;
      break;
    case 50:
      dims.rows = 8;
      dims.cols = 7;
    case 51:
      dims.rows = 8;
      dims.cols = 7;
    case 52:
      dims.rows = 8;
      dims.cols = 7;
    case 53:
      dims.rows = 8;
      dims.cols = 7;
    case 54:
      dims.rows = 8;
      dims.cols = 7;
    case 55:
      dims.rows = 8;
      dims.cols = 7;
    case 56:
      dims.rows = 8;
      dims.cols = 7;
      break;
    default:
  }

  return dims;
};
