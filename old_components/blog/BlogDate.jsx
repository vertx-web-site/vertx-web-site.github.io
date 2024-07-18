const BlogDate = ({ date }) => {
  let format = new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "numeric"
  })

  let dateParts = format.formatToParts(new Date(date))
  let result = dateParts.find(p => p.type === "day").value + " " +
    dateParts.find(p => p.type === "month").value + " " +
    dateParts.find(p => p.type === "year").value

  return <>{result}</>
}

export default BlogDate
