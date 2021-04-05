import {$} from '@core/dom';

export function resizeHandler($root, event) {
  return new Promise( resolve => {
    const $resizer = $(event.target)
    const $parent = $resizer.closest('[data-type="resizable"]')
    const coords = $parent.getCoords()
    const type = $resizer.data.resize
    const sideProp = type === 'row' ? 'right' : 'bottom'
    let value

    document.onmousemove = e => {
      $resizer.css({
        opacity: 1,
        [sideProp]: '-2000px'
      })
      if (type === 'col') {
        const delta = e.pageX - coords.right
        value = Math.floor(coords.width + delta)
        $resizer.css({right: -delta + 'px'})
      } else {
        const delta = e.clientY - coords.bottom
        value = Math.floor(coords.height + delta)
        $resizer.css({bottom: -delta + 'px'})
      }
    }

    document.onmouseup = () => {
      document.onmousemove = null
      document.onmouseup = null

      if (type === 'col') {
        $parent.css({width: value + 'px'})
        $root.findAll(`[data-col = "${$parent.data.col}"]`)
            .forEach(cell => cell.style.width = value + 'px')
      } else {
        $parent.css({height: value + 'px'})
      }

      resolve({
        value,
        type,
        id: $parent.data[type]
      })

      $resizer.css({
        opacity: 0,
        bottom: 0,
        right: 0
      })
    }
  })
}
