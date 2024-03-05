const NavigationBar = ({ handler, handleLogOut }) => {

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <button onClick={() => handler(1)}>Etusivu</button>
                    </td>
                    <td>
                        <button onClick={() => handler(1)}>Kilpailut</button>
                    </td>
                    <td>
                        <button onClick={() => handler(1)}>Rekisteröidy</button>
                    </td>
                    <td>
                        <button onClick={() => handler(1)}>Kirjaudu</button>
                    </td>
                    <td>
                    <button onClick={() => handleLogOut()}>Kirjaudu ulos</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default NavigationBar