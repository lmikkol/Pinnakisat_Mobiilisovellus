import pilyLogo from '../pilyLogo.jpeg'

const Header = ({header}) => {
    return (
      <div>
        <h1>{header}</h1>
        <img src={pilyLogo} alt="pilylogo"/>
      </div>
    )
  }

  export default Header