<div>
    <select
            onChange={(e) => {handleSelect(e)}}
    >
        <option>Select Genre</option>
        {genres?.map((e) => {
              return (
                  <option key={e.id} value={e.name}>
                      {e.name}
                  </option>
                );
            })}
    </select>
          {input.genres?.map((e) => {
            return (
              <div key={e}>
                <p>{e}</p>
                <button
                    onClick={() => {handleDelete(e)}}
                >
                  X
                </button>
              </div>
            );
          })}
        
        <div>
          <select
              onChange={(e) => {handleSelect1(e)}}
           >
            <option>Select Platform</option>
            {platforms?.map((e) => {
              return (
                <option key={e.id} value={e.name}>
                  {e.name}
                </option>
              );
            })}
          </select>
          {input.platforms?.map((e) => {
            return (
              <div key={e}>
                <p>{e}</p>
                <button
                    onClick={() => {handleDelete(e)}}
                >
                  X
                </button>
             </div>
            )}