const fetchData = fakeResponse => () => new Promise((resolve) => setTimeout(() => { resolve(fakeResponse) }, 1000))

export default fetchData