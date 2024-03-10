
const ContestItem = ({contest, handleAddUser, handler}) => {
  return (
<div>
<h3>{contest.name}</h3>
<p className="p">{contest.description}</p>
<button onClick={() => handleAddUser(contest.id)}>Osallistu</button>
<button onClick={() => handler()}>Lisätietoja</button>
<hr/>
</div>
  )
}


const Contests = ({contests, handleAddUser, handler }) => {
  return (
    <div>
        <h2>Kilpailut</h2>
      {contests.map(contest =>
        <ContestItem key={contest.id} contest={contest} handleAddUser={handleAddUser} handler={handler}/>
      )}
    </div>
  )
}

export default Contests


