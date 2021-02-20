const CODES = {
  A: 65,
  Z: 90
}

function toCell(row) {
  return function(_, col) {
    return `
    <div
      class="cell"
      data-col="${col}"
      data-type="cell"
      data-id="${row}:${col}"
      contenteditable
    ></div>
    `
  }
}

function toColumn(letter, idx) {
  return `
    <div class="column" data-type="resizable" data-col=${idx}>
      ${letter}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(content, rowIndex) {
  const resize = rowIndex
    ? `<div class="row-resize" data-resize="row"></div>`
    : ''

  return `
      <div class="row" data-type="resizable">
          <div class="row-info">
            ${rowIndex ? rowIndex : ''}
            ${resize}
          </div>
          <div class="row-data">${content}</div>
      </div>
  `
}

function toChar(_, idx) {
  return String.fromCharCode(CODES.A + idx)
}


export function createTable(rowsCount = 20) {
  const colsCount = CODES.Z - CODES.A + 1
  const rows = []
  const cols = new Array(colsCount)
      .fill('')
      .map(toChar)
      .map(toColumn)
      .join('')

  rows.push(createRow(cols))

  for (let row=0; row < rowsCount; row++) {
    const cells = new Array(colsCount)
        .fill('')
        .map(toCell(row))
        .join('')

    rows.push(createRow(cells, row+1))
  }

  return rows.join('')
}
