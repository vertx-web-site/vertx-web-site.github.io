import Router from "next/router";
import "./SearchResults.scss";

export default ({ results }) => {
  let resultsList = [];
  if (results) {
    results.forEach(r => {
      resultsList.push(
        <li key={r.id} onClick={() => Router.push(`${window.location.pathname}#${r.id}`)}>
          <h5>{r.title}</h5>{r.result}
        </li>
      );
    });
  }

  if (!results) {
    return <></>;
  } else {
    return results.length > 0 ? (
      <ul className="search-results">
        {resultsList}
      </ul>
    ) : (
      <div className="search-results-none">No results.</div>
    );
  }
};
