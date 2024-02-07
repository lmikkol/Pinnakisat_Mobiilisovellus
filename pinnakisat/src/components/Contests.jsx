const Contests = ({contest}) => {
    console.log(contest.name)
    return (
        <div>
            <h3>{contest.name}</h3>
            <p>{contest.description}</p>
        <hr />
        </div>
    )
  }

  export default Contests