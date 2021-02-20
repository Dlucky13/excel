import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root, options) {
    super($root, {
      name: 'Header',
      listeners: ['click', 'input'],
      ...options
    })
  }

  onClick(event) {
    console.log('Header onClick', event)
  }

  onInput() {
    console.log('this', this, 'onInput this_root', this.$root)
    this.destroy()
  }

  toHTML() {
    return `
    <input class="input" value="New table">

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
