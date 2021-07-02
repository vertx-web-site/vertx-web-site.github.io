const { Octokit } = require("@octokit/rest")

const octokit = new Octokit({
    auth: "300339e59bb074948e91f0a44f5d338904ae6bd9"
    // auth: "b671411941b5c060abe2a029f3983d1e2678570a"
});

(async() => {
    // const pulls = await octokit.pulls.list({
    //     repo: "vertx-web-site",
    //     owner:"vertx-china",
    //     state: "all"
    // })
    // const users = {}
    // for (let pull of pulls.data) {
    //     if (pull.merged_at === null) {
    //         continue
    //     }
    //     users[pull.user.login] = pull.user
    // }
    //pulls.data.map(r => r.user)
    // console.log(users)

    const result = await octokit.paginate(octokit.repos.listContributors, {
      owner: "VertxChina",
      repo: "vertx-translation-chinese"
      // owner: "vertx-china",
      // repo: "vertx-web-site"
    })
    console.log(result)
})()
