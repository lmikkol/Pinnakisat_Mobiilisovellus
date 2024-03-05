const Contests = ({contest, handleAddUser}) => {
    console.log(contest.name)
    return (
        <div>
            <h3>{contest.name}</h3>
            <p className="p">{contest.description}</p>
        <button onClick={() => handleAddUser(contest.id)}>Osallistu</button>
        <hr />
        </div>
    )
  }

  export default Contests