import {$} from '@core/dom';
import {ExcelComponent} from '@core/ExcelComponent';
import {createTable} from '@/components/table/table.template';
import {resizeHandler} from '@/components/table/table.resizer';
import {isCell, matrix, nextSelector, shouldResize} from './table.functions';
import {TableSelection} from '@/components/table/TableSelection';
import * as actions from '@/redux/actions';
import {defaultStyles} from '@/constants';
import {parse} from '@core/parse';

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: Table,
      listeners: ['mousedown', 'keydown', 'input'],
      ...options
    });
  }

  onInput(event) {
    // this.$emit('table:input', $(event.target))
    this.updateTextInStore($(event.target).text())
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.current.id(),
      value
    }))
  }

  async resizeTable(event) {
    try {
      const data = await resizeHandler(this.$root, event)
      // console.log('resizeTable data', data)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    } else if (isCell(event)) {
      const $target = $(event.target)
      if (event.shiftKey) {
        const $cells = matrix($target, this.selection.current)
            .map(id => this.$root.find(`[data-id="${id}"]`))
        this.selection.selectGroup($cells)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab',
      'ArrowUp',
      'ArrowDown',
      'ArrowLeft',
      'ArrowRight'
    ]

    const {key} = event

    if (keys.includes(event.key) && !event.shiftKey) {
      event.preventDefault()
      const id = this.selection.current.id(true)
      const $next = this.$root.find(nextSelector(key, id))
      this.selectCell($next)
    }
  }

  selectCell($cell) {
    this.selection.select($cell)
    this.$emit('table:select', $cell)
    const styles = $cell.getStyles(Object.keys(defaultStyles))

    console.log('Styles to dispatch', styles)
    this.$dispatch(actions.changeStyles(styles))
  }

  toHTML() {
    return createTable(20, this.store.getState())
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.find('[data-id="0:0"]')
    this.selectCell($cell)

    this.$on('formula:input', (value) => {
      this.selection.current
          .attr('data-value', value)
          .text(parse(value))
      this.updateTextInStore(value)
    })

    this.$on('formula:done', () => {
      this.selection.current.focus()
    })

    this.$on('toolbar:applyStyle', style => {
      this.selection.applyStyle(style)
      this.$dispatch(actions.applyStyle({
        value: style,
        ids: this.selection.selectedIds
      }))
    })
  }
}
