const ajax = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve('3秒后的Jack'), 3000)
  })
}

export { ajax }