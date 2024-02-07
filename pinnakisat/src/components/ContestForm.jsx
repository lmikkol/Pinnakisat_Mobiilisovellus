const ContestForm = ({addContest, newContest, handleContestChange}) => {
    return(
      <form onSubmit={addContest}>
        <div>
            contest:<input value={newContest}
            onChange={handleContestChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

  export default ContestForm