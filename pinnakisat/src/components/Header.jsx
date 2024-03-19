import pilyLogo from '../pilyLogo.jpeg'

const Header = ({header}) => {
    return (
      <div style={{ textAlign: 'center' }}>
        <img src={pilyLogo} alt="pilylogo"/>
        <h1>{header}</h1>
      </div>
    )
  }

  export default Header