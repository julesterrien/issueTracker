// in prod, i would unit test this + valide taht the passed in values are timestamps

export const sortIssuesByDate = ({ issues, key, order }) => {
  let sortedIssues = [...issues];
  sortedIssues = sortedIssues.sort((a, b) => {
    const aDate = new Date(a[key]);
    const bDate = new Date(b[key]);
    if (order) {
      return aDate - bDate;
    }
    return bDate - aDate;
  });
  return sortedIssues;
}
