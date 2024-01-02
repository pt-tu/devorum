import recombee from 'recombee-js-api-client'
import configs from './configs'

const client = new recombee.ApiClient('devorum-dev', configs.RECOMBEE_PUBLIC_TOKEN, { region: 'ap-se' })

export default client
