export class Observer {
  constructor() {
    this.listeners = {}
  }

  // Уведомляем слушателей если они есть
  // eventName - любое название (строка), например: 'formula:done'
  emit(eventName, ...args) {
    if (!Array.isArray(this.listeners[eventName])) {
      return false
    }
    this.listeners[eventName].forEach(listener => {
      listener(...args)
    })
    return true
  }

  // подписываемся на уведомления
  // добавляем нового слушателя
  subscribe(eventName, fn) {
    this.listeners[eventName] = this.listeners[eventName] || []
    this.listeners[eventName].push(fn)
    return () => {
      this.listeners[eventName] = this.listeners[eventName]
          .filter(listener => listener !== fn)
    }
  }
}

