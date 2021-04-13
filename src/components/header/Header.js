import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom';
import {changeTitle} from '@/redux/actions';
import {defaultTitle} from '@/constants';
import {debounce} from '@core/utils';
import {ActiveRoute} from '@core/routes/ActiveRoute';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['input', 'click'],
      ...options
    })
  }

  prepare() {
    this.onInput = debounce(this.onInput, 300)
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.data.button === 'exit') {
      ActiveRoute.navigate('')
    } else if ($target.data.button === 'remove') {
      const decision = confirm('Are you shure?')
      if (decision) {
        localStorage.removeItem('excel:' + ActiveRoute.param)
        ActiveRoute.navigate('')
      }
    }
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
                <div class="button" data-button="remove">
                    <span class="material-icons" data-button="remove">
                        delete_outline
                    </span>
                </div>
                <div class="button" data-button="exit">
                    <span class="material-icons" data-button="exit">
                        exit_to_app
                    </span>
                </div>
            </div>
    `
  }
}
