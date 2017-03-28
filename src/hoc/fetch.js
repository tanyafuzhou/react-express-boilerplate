import { Component, PropTypes } from 'react'
import { fetch as refetch } from 'refetch'
import Loading from '_/components/Loading'

const PENDING = 0
const SUCCESS = 1
const FAILURE = 2

export default function (Origin) {
  class Fetch extends Component {
    constructor (props) {
      super(props)
      this.state = {
        data: null,
        status: PENDING
      }

      this.fetchData = this.fetchData.bind(this)
    }

    componentWillMount () {
      this.fetchData()
      this._isMount = true
    }

    componentWillUnmount () {
      this._isMount = false
    }

    fetchData () {
      let { fetch } = this.props
      if (typeof fetch === 'string') fetch = { url: fetch }

      this.setState({ data: null, status: PENDING })
      refetch.get(fetch.url, fetch.data).then(data => {
        if (!this._isMount) return
        let d = fetch.key ? data[fetch.key] : data
        d = fetch.map ? fetch.map(d) : d
        this.setState({ status: SUCCESS, data: d })
      }).catch(e => {
        if (!this._isMount) return
        this.setState({ status: FAILURE, message: e.message })
      })
    }

    render () {
      const { status, data } = this.state

      if (status === SUCCESS) {
        return <Origin {...this.props} data={data} fetchData={this.fetchData} />
      }

      if (status === PENDING && this.props.loading) {
        return <Loading active />
      }

      if (status === FAILURE) {
        return <span />
      }
      return null
    }
  }

  Fetch.propTypes = {
    fetch: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    loading: PropTypes.bool
  }
  Fetch.defaultProps = {
    loading: true
  }

  return Fetch
}
