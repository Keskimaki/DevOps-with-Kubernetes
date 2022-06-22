import Axios from 'axios'

const getUrl = async () => {
  const result = await Axios.get('https://en.wikipedia.org/wiki/Special:Random')
  const url = result.request.res.responseUrl

  await Axios.post('http://kube-project-api-svc:2346/api/todos', { todo: `Read ${url}` })
}

await getUrl()
