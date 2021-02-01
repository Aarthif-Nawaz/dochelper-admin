import LoadingOverlay from 'react-loading-overlay'
import BounceLoader from 'react-spinners/BounceLoader'
 
function MyLoader({ active, children }) {
  return (
    <LoadingOverlay
      active={active}
      spinner={<BounceLoader size='220px' />}
      text={children}
    >
    </LoadingOverlay>
  )
}

export default  MyLoader;