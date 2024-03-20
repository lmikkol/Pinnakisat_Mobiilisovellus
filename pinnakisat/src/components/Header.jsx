import pilyLogo from '../pilyLogo.png'

const Header = ({ header, subheader }) =>
{
  return (
    <div className="header-container">
      <div className="logo-container">
        <img src={pilyLogo} alt="pilylogo" className="logo" />
      </div>
      <div className="text-container">
        <h1>{header}</h1>
        <i>{subheader}</i>
      </div>
    </div>
  )
}

export default Header