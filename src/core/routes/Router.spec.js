import {Router} from './Router';
import {Page} from '../Page';

class DashboardPage extends Page {
  getRoot() {
    const $content = document.createElement('div')
    $content.innerHTML = 'dashboard'
    return $content
  }
}

describe('Router:', () => {
  let router
  let $root

  beforeEach(() => {
    $root = document.createElement('div')
    router = new Router($root, {
      dashboard: DashboardPage
    })
  })

  test('should be defined', () => {
    expect(router).toBeDefined()
  })

  test('should be dashboard content', () => {
    router.changePageHandler()
    expect($root.innerHTML).toBe('<div>dashboard</div>')
  })
})
