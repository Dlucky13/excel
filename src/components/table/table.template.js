const CODES = {
  A: 65,
  Z: 90
}

function toCell(data) {
  return `
    <div class="cell" contenteditable>${data}</div>
  `
}

function toColumn(letter) {
  return `
  <div class="column">
    ${letter}
  </div>
  `
}

function createRow(content, rowIndex = '') {
  return `
      <div class="row">
          <div class="row-info">${rowIndex}</div>
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

  const cells = new Array(colsCount)
      .fill('')
      .map(toCell)
      .join('')

  for (let i=0; i < rowsCount; i++) {
    rows.push(createRow(cells, i+1))
  }

  return rows.join('')
}
