const Contests = ({contest, handleAddUser, handler}) => {
    console.log(contest.name)
    return (
        <div>
            <h3>{contest.name}</h3>
            <p className="p">{contest.description}</p>
        <button onClick={() => handleAddUser(contest.id)}>Osallistu</button>
        <button onClick={() => handler()}>Lisätietoja</button>
        <hr />
        </div>
    )
  }

  export default Contests