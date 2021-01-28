import {ExcelComponent} from '@core/ExcelComponent';

export class Header extends ExcelComponent {
  static className = 'excel__header'

  constructor($root) {
    super($root, {
      name: 'Header',
      listeners: ['click', 'input']
    })
  }

  onClick(event) {
    console.log('Header onClick', event)
  }

  onInput(event) {
    console.log('this', this, 'onInput this_root', this.$root)
    // console.log('Header onInput', event.target.value)
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
