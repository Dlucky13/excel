import {DomListener} from '@core/DomListener';

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners);
    this.name = options.name
    this.subscribe = options.subscribe || []

    this.observer = options.observer
    this.store = options.store
    this.unsubscribers = []
    this.prepare()
  }

  // Настраиваем компонент до init
  prepare() {

  }

  // Возвращает шаблон компонента
  toHTML() {
    return ''
  }

  // Уведомляем слушателей про событие eventName
  $emit(eventName, ...args) {
    this.observer.emit(eventName, ...args)
  }

  // Подписываемся на событие eventName
  $on(eventName, fn) {
    const unsub = this.observer.subscribe(eventName, fn)
    this.unsubscribers.push(unsub)
  }

  $dispatch(action) {
    this.store.dispatch(action)
  }

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  // Сюда приходят изменения по тем полям, на которые мы подписались
  storeChanged() {}

  // Инициализируем компонент
  // Добавляем слушаетелей
  init() {
    this.initDOMListeners()
  }

  // Удаляем компонент
  // Чистим слушатели
  destroy() {
    this.removeDOMListeners()
    this.unsubscribers.forEach(unsub => unsub())
  }
}
