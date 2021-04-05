import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {debounce} from '@core/utils';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onInput(event) {
    console.log('onInput')
    const $target = $(event.target) || defaultTitle
    this.$dispatch(changeTitle($target.text()))
  }

  toHTML() {
    const title = this.store.getState().title
    return `
    <input class="input" value="${title}">

            <div>
                <div class="button">
                    <span class="material-icons">
                        exit_to_app
                    </span>
                </div>
                <div class="button">
                    <span class="material-icons">
                        delete_outline
                    </span>
                </div>
            </div>
    `
  }
}
