const NavigationBar = ({ handler }) => {

    return (
        <table>
            <tbody>
                <tr>
                    <td>
                        <button onClick={() => handler()}>Etusivu</button>
                    </td>
                    <td>
                        <button onClick={() => handler()}>Kilpailut</button>
                    </td>
                    <td>
                        <button onClick={() => handler()}>Rekisteröidy</button>
                    </td>
                    <td>
                        <button onClick={() => handler()}>Kirjaudu</button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default NavigationBar